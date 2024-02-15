import {PickDeep, joinUrlParts} from '@augment-vir/common';
import {ToniqHeading, ToniqHeadingLevel, defineToniqElement} from '@toniq-labs/design-system';
import {ToniqNftFrame} from '@toniq-labs/toniq-nft-frame';
import {css, html, nothing} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {BitgenCollection} from '../../../data/bitgen-collection';
import {bioniqContentUrl, bioniqIframeUrl} from '../../../services/external-urls';

export const ToniqBitgenCollectionInfoDisplay = defineToniqElement<{
    bitgenCollection: Readonly<
        PickDeep<
            BitgenCollection,
            [
                'collection' | 'ids',
                'collectionImageInscriptionId' | 'name' | 'creator' | 'description',
            ]
        >
    >;
}>()({
    tagName: 'toniq-bitgen-collection-info-display',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        ${ToniqNftFrame} {
            border: 1px solid #eee;
            border-radius: 16px;
        }

        p {
            ${noNativeSpacing};
        }
    `,
    renderCallback({inputs}) {
        const creatorTemplate = inputs.bitgenCollection.collection.creator
            ? html`
                  <p>${inputs.bitgenCollection.collection.creator}</p>
              `
            : nothing;
        const descriptionTemplate = inputs.bitgenCollection.collection.description
            ? html`
                  <p>${inputs.bitgenCollection.collection.description}</p>
              `
            : nothing;

        return html`
            <${ToniqHeading.assign({level: ToniqHeadingLevel.H2})}>
                ${inputs.bitgenCollection.collection.name || '(empty name)'}
            </${ToniqHeading}>
            ${creatorTemplate}
            <${ToniqNftFrame.assign({
                childFrameUrl: bioniqIframeUrl,
                nftUrl: joinUrlParts(
                    bioniqContentUrl,
                    inputs.bitgenCollection.ids.collectionImageInscriptionId,
                ),
                blockAutoPlay: true,
                eagerLoading: true,
                max: {
                    width: 350,
                    height: 350,
                },
                min: {
                    width: 300,
                    height: 300,
                },
            })}></${ToniqNftFrame}>
            ${descriptionTemplate}
        `;
    },
});
