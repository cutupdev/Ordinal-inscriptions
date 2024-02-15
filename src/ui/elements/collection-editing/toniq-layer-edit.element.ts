import {
    copyThroughJson,
    filterOutIndexes,
    getObjectTypedEntries,
    makeWritable,
} from '@augment-vir/common';
import {
    CirclePlus24Icon,
    ToniqButton,
    ToniqButtonVariantEnum,
    ToniqHeading,
    ToniqHeadingLevel,
    Trash24Icon,
    defineToniqElement,
} from '@toniq-labs/design-system';
import {css, defineElementEvent, html, listen} from 'element-vir';
import {assertDefined} from 'run-time-assertions';
import {BitgenLayer, BitgenTrait, bitgenTraitShape} from '../../../data/bitgen-collection';
import {ToniqLabelledInput} from '../common-elements/toniq-labelled-input.element';

export const ToniqLayerEdit = defineToniqElement<{bitgenLayer: Readonly<BitgenLayer>}>()({
    tagName: 'toniq-layer-edit',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            padding: 16px;
            border-radius: 16px;
            gap: 8px;
            position: relative;
        }

        .traits-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
        }

        ${ToniqButton} {
            height: 32px;
            width: 32px;
        }

        .trait-edit {
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            padding: 16px;
            border-radius: 8px;
            gap: 8px;
            position: relative;
        }

        :host(:hover) .delete-layer,
        .trait-edit:hover .delete-trait {
            visibility: visible;
        }

        .delete-layer,
        .delete-trait {
            visibility: hidden;
            position: absolute;
            top: 4px;
            right: 4px;
        }
    `,
    events: {
        layerChange: defineElementEvent<BitgenLayer>(),
        layerDelete: defineElementEvent<void>(),
    },
    renderCallback({inputs, dispatch, events}) {
        function mutateLayer(mutateCallback: (newBitgenLayer: BitgenLayer) => void | BitgenLayer) {
            const newBitgenLayer: BitgenLayer = makeWritable(copyThroughJson(inputs.bitgenLayer));
            const mutatedBitgenLayer = mutateCallback(newBitgenLayer) || newBitgenLayer;

            dispatch(new events.layerChange(mutatedBitgenLayer));
        }

        const traitTemplates = inputs.bitgenLayer.traits.map((bitgenTrait, bitgenTraitIndex) => {
            const traitPropertyTemplates = getObjectTypedEntries(bitgenTrait).map(
                ([
                    traitPropertyName,
                    traitPropertyValue,
                ]) => {
                    return html`
                        <${ToniqLabelledInput.assign({
                            label: traitPropertyLabels[traitPropertyName],
                            value: traitPropertyValue,
                        })}
                            ${listen(ToniqLabelledInput.events.valueChange, (event) => {
                                mutateLayer((newBitgenLayer) => {
                                    const traitToEdit = newBitgenLayer.traits[bitgenTraitIndex];
                                    assertDefined(traitToEdit);
                                    traitToEdit[traitPropertyName] = event.detail;
                                });
                            })}
                        ></${ToniqLabelledInput}>
                    `;
                },
            );

            return html`
                <div class="trait-edit">
                    <${ToniqButton.assign({
                        icon: Trash24Icon,
                        variant: ToniqButtonVariantEnum.Secondary,
                    })}
                        class="delete-trait"
                        ${listen('click', () => {
                            mutateLayer((newBitgenLayer) => {
                                newBitgenLayer.traits = filterOutIndexes(newBitgenLayer.traits, [
                                    bitgenTraitIndex,
                                ]);
                            });
                        })}
                    ></${ToniqButton}>
                    ${traitPropertyTemplates}
                </div>
            `;
        });

        return html`
            <${ToniqButton.assign({
                icon: Trash24Icon,
                variant: ToniqButtonVariantEnum.Secondary,
            })}
                class="delete-layer"
                ${listen('click', () => {
                    dispatch(new events.layerDelete());
                })}
            ></${ToniqButton}>
            <${ToniqLabelledInput.assign({
                label: 'Layer Name (type)',
                value: inputs.bitgenLayer.type,
            })}
                ${listen(ToniqLabelledInput.events.valueChange, (event) => {
                    mutateLayer((newBitgenLayer) => {
                        newBitgenLayer.type = event.detail;
                    });
                })}
            ></${ToniqLabelledInput}>
            <div class="traits-header">
                <${ToniqHeading.assign({level: ToniqHeadingLevel.H4})}>Traits</${ToniqHeading}>
                <${ToniqButton.assign({
                    icon: CirclePlus24Icon,
                    variant: ToniqButtonVariantEnum.Secondary,
                })}
                    ${listen('click', () => {
                        mutateLayer((newBitgenLayer) => {
                            newBitgenLayer.traits = [
                                bitgenTraitShape.defaultValue,
                                ...newBitgenLayer.traits,
                            ];
                        });
                    })}
                ></${ToniqButton}>
            </div>
            ${traitTemplates}
        `;
    },
});

const traitPropertyLabels: Readonly<Record<keyof BitgenTrait, string>> = {
    inscriptionId: 'Inscription Id',
    name: 'Name',
};
