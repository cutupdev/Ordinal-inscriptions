import {defineToniqElement} from '@toniq-labs/design-system';
import {css, html} from 'element-vir';
import {BitgenCollection} from '../../../data/bitgen-collection';
import {ToniqBitgenCollectionCode} from './toniq-bitgen-collection-code.element';
import {ToniqBitgenCollectionExamplesDisplay} from './toniq-bitgen-collection-examples-display.element';
import {ToniqBitgenCollectionInfoDisplay} from './toniq-bitgen-collection-info-display.element';

export const ToniqBitgenCollectionDisplay = defineToniqElement<{
    bitgenCollection: Readonly<BitgenCollection>;
}>()({
    tagName: 'toniq-bitgen-collection-display',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 64px;
            box-sizing: border-box;
            padding: 0 32px 32px;
        }
    `,
    renderCallback({inputs}) {
        return html`
            <${ToniqBitgenCollectionInfoDisplay.assign({
                bitgenCollection: inputs.bitgenCollection,
            })}></${ToniqBitgenCollectionInfoDisplay}>
            <${ToniqBitgenCollectionExamplesDisplay.assign({
                bitgenCollection: inputs.bitgenCollection,
                randomFrameCount: 5,
            })}></${ToniqBitgenCollectionExamplesDisplay}>
            <${ToniqBitgenCollectionCode.assign({
                bitgenCollection: inputs.bitgenCollection,
            })}></${ToniqBitgenCollectionCode}>
        `;
    },
});
