import {copyThroughJson, makeWritable} from '@augment-vir/common';
import {defineToniqElement} from '@toniq-labs/design-system';
import {css, html, listen} from 'element-vir';
import {BitgenCollection, sanitizeLayers} from '../../../data/bitgen-collection';
import {BitgenCollectionChangeEvent} from '../../events/bitgen-collection-change.event';
import {ToniqBitgenTraitSelector} from './toniq-bitgen-trait-selector.element';

export const ToniqBitgenTraitsSelection = defineToniqElement<{
    bitgenCollection: Readonly<Pick<BitgenCollection, 'layers' | 'selectedTraits'>>;
}>()({
    tagName: 'toniq-bitgen-traits-selection',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        .traits {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
    `,
    renderCallback({inputs, dispatch}) {
        const sanitizedLayers = sanitizeLayers(inputs.bitgenCollection);

        const traitTemplates = sanitizedLayers.map((layer, layerIndex) => {
            const selectedTraitIndex = inputs.bitgenCollection.selectedTraits[layerIndex] ?? 0;

            return html`
                <${ToniqBitgenTraitSelector.assign({
                    selectedTraitIndex,
                    layer,
                })}
                    ${listen(ToniqBitgenTraitSelector.events.valueChange, (event) => {
                        const newBitgenCollection = makeWritable(
                            copyThroughJson(inputs.bitgenCollection),
                        );
                        newBitgenCollection.selectedTraits[layerIndex] = event.detail;
                        dispatch(new BitgenCollectionChangeEvent(newBitgenCollection));
                    })}
                ></${ToniqBitgenTraitSelector}>
            `;
        });

        return html`
            <section class="traits">${traitTemplates}</section>
        `;
    },
});
