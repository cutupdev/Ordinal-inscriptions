import {
    Copy24Icon,
    ToniqButton,
    ToniqButtonVariantEnum,
    ToniqHeading,
    ToniqHeadingLevel,
    defineToniqElement,
    toniqColors,
} from '@toniq-labs/design-system';
import {css, html, listen, nothing} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {BitgenCollection} from '../../../data/bitgen-collection';
import {generateBitgenCollectionCode} from '../../../data/bitgen-collection-code';
import {scrollbarStyles} from '../../styles/scrollbars';

export const ToniqBitgenCollectionCode = defineToniqElement<{
    bitgenCollection: Readonly<BitgenCollection>;
}>()({
    tagName: 'toniq-bitgen-collection-code',
    styles: css`
        ${scrollbarStyles}

        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        pre {
            border-radius: 8px;
            padding: 8px 16px;
            overflow-x: auto;
            background-color: #eee;
        }

        .code-wrapper {
            position: relative;
        }

        ${ToniqButton} {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 32px;
            height: 32px;
        }

        p {
            ${noNativeSpacing};
        }

        .subtitle {
            color: ${toniqColors.pageSecondary.foregroundColor};
        }
    `,
    renderCallback({inputs}) {
        const codeBlocks = generateBitgenCollectionCode(inputs.bitgenCollection);

        const codeTemplates = codeBlocks.map((codeBlock) => {
            const subtitleTemplate = codeBlock.subtitle
                ? html`
                      <p class="subtitle">${codeBlock.subtitle}</p>
                  `
                : nothing;
            return html`
                <div class="code-block">
                    <${ToniqHeading.assign({level: ToniqHeadingLevel.H4})}>
                        ${codeBlock.title}
                    </${ToniqHeading}>
                    ${subtitleTemplate}
                    <div class="code-wrapper">
                        <${ToniqButton.assign({
                            icon: Copy24Icon,
                            variant: ToniqButtonVariantEnum.Secondary,
                        })}
                            ${listen('click', async () => {
                                await navigator.clipboard.writeText(codeBlock.code);
                            })}
                        ></${ToniqButton}>
                        <pre>${codeBlock.code}</pre>
                    </div>
                </div>
            `;
        });

        return html`
            <${ToniqHeading.assign({
                level: ToniqHeadingLevel.H3,
            })}>
                Code
            </${ToniqHeading}>
            ${codeTemplates}
        `;
    },
});
