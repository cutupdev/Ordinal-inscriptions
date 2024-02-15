import {defineToniqElement} from '@toniq-labs/design-system';
import {convertTemplateToString, css, html} from 'element-vir';
import {BitgenCollection} from '../../../data/bitgen-collection';
import {
    createCollectionJavascriptCode,
    createCollectionJson,
    createInscriptionHtmlCode,
} from '../../../data/bitgen-collection-code';
import {createRendererJavascriptCode} from '../../../data/bitgen-renderer-code';
import {bioniqContentUrl} from '../../../services/external-urls';

export const ToniqBitgenFrame = defineToniqElement<{
    bitgenCollection: Readonly<BitgenCollection>;
    size: {
        height: number;
        width: number;
    };
}>()({
    tagName: 'toniq-bitgen-frame',
    styles: css`
        :host {
            display: flex;
        }

        iframe {
            border: none;
        }
    `,
    renderCallback({inputs}) {
        const frameCode = createFrameSrc(inputs.bitgenCollection);
        const frameStyle = css`
            width: ${inputs.size.width}px;
            height: ${inputs.size.height}px;
        `;

        return html`
            <iframe style=${frameStyle} srcdoc=${frameCode}></iframe>
        `;
    },
});

function createFrameSrc(bitgenCollection: Readonly<BitgenCollection>): string {
    const inscriptionHtml = createInscriptionHtmlCode(bitgenCollection)
        .replaceAll('<', '\\<')
        .replaceAll('>', '\\>');

    const bitgenCollectionJson = JSON.stringify(createCollectionJson(bitgenCollection));
    const collectionJavascript = createCollectionJavascriptCode(bitgenCollection)
        .replace(
            /rendererScript\.src = [^;]+;/,
            `rendererScript.innerHTML = '${createRendererJavascriptCode(bitgenCollection.selectedRenderer).replaceAll("'", "\\'")}';`,
        )
        .replace(
            'return await renderPromise;',
            "setTimeout(() => rendererScript.dispatchEvent(new Event('load'))); return await renderPromise;",
        );

    const template = html`
        <script>
            const originalFetch = window.fetch;
            window.fetch = (url) => {
                if (url.includes('COLLECTION-JSON')) {
                    return {
                        then(callback) {
                            return JSON.parse('${bitgenCollectionJson}');
                        },
                    };
                }
                const fixedUrl = url.replace('/content', '${bioniqContentUrl}');
                return originalFetch(fixedUrl);
            };
            const inscriptionScriptElement = document.createElement('script');
            document.head.appendChild(inscriptionScriptElement);
            inscriptionScriptElement.outerHTML = '${inscriptionHtml}';

            /* prettier-ignore */
            ${collectionJavascript}
        </script>
    `;
    return convertTemplateToString(template);
}
