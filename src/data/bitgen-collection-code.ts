import {BitgenCollection, sanitizeLayers} from './bitgen-collection';
import {createRendererJavascriptCode} from './bitgen-renderer-code';

export type CodeBlock = {
    title: string;
    subtitle?: string;
    code: string;
};

export function createCollectionJson(bitgenCollection: Readonly<BitgenCollection>) {
    return {
        collection: {
            ...bitgenCollection.collection,
            collectionImageInscriptionId: bitgenCollection.ids.collectionImageInscriptionId,
        },
        layers: sanitizeLayers(bitgenCollection),
    };
}

export function generateBitgenCollectionCode(
    bitgenCollection: Readonly<BitgenCollection>,
): CodeBlock[] {
    const rendererVersion = bitgenCollection.selectedRenderer;

    return [
        {
            title: 'Inscription HTML',
            subtitle: 'Example inscription with current trait selection.',
            code: createInscriptionHtmlCode(bitgenCollection),
        },
        {
            title: 'Collection JSON',
            code: JSON.stringify(createCollectionJson(bitgenCollection), null, 4),
        },
        {
            title: 'Collection JS',
            code: createCollectionJavascriptCode(bitgenCollection),
        },
        {
            title: 'Provenance JSON',
            code: JSON.stringify(
                {
                    bitcoinAddress: bitgenCollection.ids.bitcoinAddress || 'BITCOIN-ADDRESS-HERE',
                    collectionJsonInscriptionId:
                        bitgenCollection.ids.collectionJsonInscriptionId ||
                        'COLLECTION-JSON-INSCRIPTION-ID-HERE',
                    excludeInscriptions: ['EXCLUDE-INSCRIPTIONS-HERE'],
                },
                null,
                4,
            ),
        },
        {
            title: `Renderer JS (v${rendererVersion})`,
            subtitle:
                'This will never change (unless you select a different renderer version). You can inscribe this once for all BitGen collections you ever make or use an already-inscribed copy (at your own risk).',
            code: createRendererJavascriptCode(rendererVersion),
        },
    ];
}

export function generateTraitsString(
    bitgenCollection: Readonly<Pick<BitgenCollection, 'layers' | 'selectedTraits'>>,
    includeSpaces: boolean,
): string {
    return bitgenCollection.layers
        .map((layer, layerIndex) => {
            const traitChoice = bitgenCollection.selectedTraits[layerIndex] ?? 0;
            if (traitChoice < 0) {
                return includeSpaces ? ' ' : '';
            } else {
                return String(traitChoice);
            }
        })
        .join(',');
}

export function createInscriptionHtmlCode(bitgenCollection: Readonly<BitgenCollection>): string {
    const traitString = generateTraitsString(bitgenCollection, false);
    const collectionJsInscriptionId =
        bitgenCollection.ids.collectionJavascriptInscriptionId ||
        'COLLECTION-JS-INSCRIPTION-ID-HERE';

    return `<script t="${traitString}" src="/content/${collectionJsInscriptionId}"></script>`;
}

export function createCollectionJavascriptCode(
    bitgenCollection: Readonly<Pick<BitgenCollection, 'ids' | 'size'>>,
) {
    const collectionJsonInscriptionId =
        bitgenCollection.ids.collectionJsonInscriptionId || 'COLLECTION-JSON-INSCRIPTION-ID-HERE';
    const rendererJavascriptInscriptionId =
        bitgenCollection.ids.rendererJavascriptInscriptionId || 'RENDERER-JS-INSCRIPTION-ID-HERE';

    return `const myValues = {
    collectionJsonInscriptionId: '${collectionJsonInscriptionId}',
    rendererJsInscriptionId: '${rendererJavascriptInscriptionId}',
    renderSize: {width: ${bitgenCollection.size.width}, height: ${bitgenCollection.size.height}},
};

async function createInscriptionHtml() {
    const collectionMetadataPromise = fetch(
        \`/content/\${myValues.collectionJsonInscriptionId}\`,
    ).then((response) => response.json());

    const inscriptionTraitsList = document.querySelector('script[t]').getAttribute('t').split(',');

    const rendererScript = document.createElement('script');
    rendererScript.setAttribute('async', '');
    rendererScript.src = \`/content/\${myValues.rendererJsInscriptionId}\`;

    const renderPromise = new Promise((resolve, reject) => {
        rendererScript.addEventListener('load', async () => {
            try {
                const collectionMetadata = await collectionMetadataPromise;
                
                const traitInscriptionIds = inscriptionTraitsList.map(
                    (traitIndex, layerIndex) =>
                        collectionMetadata.layers[layerIndex]?.traits[traitIndex]?.inscriptionId,
                );

                resolve(await render(myValues.renderSize, ...traitInscriptionIds.filter(id => id)));
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
    document.head.appendChild(rendererScript);

    return await renderPromise;
}

createInscriptionHtml().then((result) => {document.body.innerHTML = result});
`;
}
