import {
    copyThroughJson,
    filterOutIndexes,
    getObjectTypedValues,
    makeWritable,
} from '@augment-vir/common';
import {
    CirclePlus24Icon,
    ToniqButton,
    ToniqButtonVariantEnum,
    ToniqDropdown,
    ToniqDropdownOption,
    ToniqHeading,
    ToniqHeadingLevel,
    defineToniqElement,
    toniqColors,
} from '@toniq-labs/design-system';
import {css, html, listen} from 'element-vir';
import {BitgenCollection, bitgenLayerShape} from '../../../data/bitgen-collection';
import {RendererVersion} from '../../../data/bitgen-renderer-code';
import {BitgenCollectionChangeEvent} from '../../events/bitgen-collection-change.event';
import {ToniqLabelledInput} from '../common-elements/toniq-labelled-input.element';
import {ToniqLayerEdit} from './toniq-layer-edit.element';

export const ToniqBitgenCollectionEdit = defineToniqElement<{
    bitgenCollection: Readonly<BitgenCollection>;
}>()({
    tagName: 'toniq-bitgen-collection-edit',
    styles: css`
        :host {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 0 32px 32px;
            width: 500px;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            position: sticky;
            top: 0;
            background-color: ${toniqColors.pagePrimary.backgroundColor};
            z-index: 200;
        }

        ${ToniqButton} {
            height: 32px;
            width: 32px;
        }

        .collection-properties {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .layers {
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        ${ToniqDropdown} {
            position: relative;
            z-index: 1000;
        }
    `,
    renderCallback({inputs, dispatch, events}) {
        function mutateBitgenCollection(
            mutateCallback: (newBitgenCollection: BitgenCollection) => void | BitgenCollection,
        ) {
            const newBitgenCollection = makeWritable(copyThroughJson(inputs.bitgenCollection));

            const mutatedBitgenCollection =
                mutateCallback(newBitgenCollection) || newBitgenCollection;

            dispatch(new BitgenCollectionChangeEvent(mutatedBitgenCollection));
        }

        const collectionInfoTemplate = generatePropertyEditTemplate(
            'Collection Info',
            inputs.bitgenCollection.collection,
            ({key, value}) => {
                mutateBitgenCollection((newBitgenCollection) => {
                    newBitgenCollection.collection[key] = value;
                });
            },
            collectionInfoPropertyLabels,
        );

        const sizeTemplate = generatePropertyEditTemplate(
            'Size',
            inputs.bitgenCollection.size,
            ({key, value}) => {
                mutateBitgenCollection((newBitgenCollection) => {
                    const numericValue = Number(value);

                    if (!isNaN(numericValue)) {
                        newBitgenCollection.size[key] = numericValue;
                    }
                });
            },
            {
                height: 'Height',
                width: 'Width',
            },
        );

        const idTemplate = generatePropertyEditTemplate(
            'Ids',
            inputs.bitgenCollection.ids,
            ({key, value}) => {
                mutateBitgenCollection((newBitgenCollection) => {
                    newBitgenCollection.ids[key] = value;
                });
            },
            collectionIdPropertyLabels,
        );

        const layerTemplates = inputs.bitgenCollection.layers.map(
            (bitgenLayer, bitgenLayerIndex) => {
                return html`
                    <${ToniqLayerEdit.assign({
                        bitgenLayer,
                    })}
                        ${listen(ToniqLayerEdit.events.layerChange, (event) => {
                            mutateBitgenCollection((newBitgenCollection) => {
                                newBitgenCollection.layers[bitgenLayerIndex] = event.detail;
                            });
                        })}
                        ${listen(ToniqLayerEdit.events.layerDelete, () => {
                            mutateBitgenCollection((newBitgenCollection) => {
                                newBitgenCollection.layers = filterOutIndexes(
                                    newBitgenCollection.layers,
                                    [
                                        bitgenLayerIndex,
                                    ],
                                );
                            });
                        })}
                    ></${ToniqLayerEdit}>
                `;
            },
        );

        const editLayersTemplate = layerTemplates.length
            ? layerTemplates
            : html`
                  <p>No layers yet.</p>
              `;

        const rendererOptions: ReadonlyArray<Readonly<ToniqDropdownOption>> = getObjectTypedValues(
            RendererVersion,
        )
            .map((rendererVersion) => {
                return {
                    label: rendererVersion,
                    value: rendererVersion,
                };
            })
            .sort((a, b) => b.value.localeCompare(a.value));
        const selectedOption = rendererOptions.find(
            (option) => option.value === inputs.bitgenCollection.selectedRenderer,
        );

        return html`
            ${[
                collectionInfoTemplate,
                sizeTemplate,
                idTemplate,
            ]}
            <section>
                <div class="section-header">
                    <${ToniqHeading.assign({
                        level: ToniqHeadingLevel.H3,
                    })}>
                        Renderer
                    </${ToniqHeading}>
                </div>

                <${ToniqDropdown.assign({
                    options: rendererOptions,
                    value: selectedOption,
                })}
                    ${listen(ToniqDropdown.events.selectChange, (event) => {
                        mutateBitgenCollection((newBitgenCollection) => {
                            newBitgenCollection.selectedRenderer = event.detail.value;
                        });
                    })}
                ></${ToniqDropdown}>
            </section>
            <section>
                <div class="section-header">
                    <${ToniqHeading.assign({
                        level: ToniqHeadingLevel.H3,
                    })}>
                        Layers
                    </${ToniqHeading}>
                    <${ToniqButton.assign({
                        icon: CirclePlus24Icon,
                        variant: ToniqButtonVariantEnum.Secondary,
                    })}
                        ${listen('click', () => {
                            mutateBitgenCollection((newBitgenCollection) => {
                                newBitgenCollection.layers = [
                                    bitgenLayerShape.defaultValue,
                                    ...newBitgenCollection.layers,
                                ];
                            });
                        })}
                    ></${ToniqButton}>
                </div>

                <div class="layers">${editLayersTemplate}</div>
            </section>
        `;
    },
});

function generatePropertyEditTemplate<OriginalObject extends Readonly<Record<string, unknown>>>(
    title: string,
    objectToEdit: OriginalObject,
    valueUpdateCallback: (params: {key: keyof OriginalObject; value: string}) => void,
    propertyLabels?: Readonly<Record<keyof OriginalObject, string>>,
) {
    const editTemplates = Object.entries(objectToEdit).map(
        ([
            propertyName,
            propertyValue,
        ]) => {
            return html`
                <${ToniqLabelledInput.assign({
                    label: propertyLabels?.[propertyName] || propertyName,
                    value: String(propertyValue),
                })}
                    ${listen(ToniqLabelledInput.events.valueChange, (event) => {
                        valueUpdateCallback({key: propertyName, value: event.detail});
                    })}
                ></${ToniqLabelledInput}>
            `;
        },
    );

    return html`
        <section>
            <${ToniqHeading.assign({
                level: ToniqHeadingLevel.H3,
            })}
                class="section-header"
            >
                ${title}
            </${ToniqHeading}>
            <div class="collection-properties">${editTemplates}</div>
        </section>
    `;
}

const collectionInfoPropertyLabels: Readonly<Record<keyof BitgenCollection['collection'], string>> =
    {
        creator: 'Creator',
        description: 'Description',
        name: 'Name',
    };

const collectionIdPropertyLabels: Readonly<Record<keyof BitgenCollection['ids'], string>> = {
    bitcoinAddress: 'Bitcoin Receiving Address',
    collectionImageInscriptionId: 'Image Inscription Id',
    collectionJsonInscriptionId: 'Collection JSON Inscription Id',
    rendererJavascriptInscriptionId: 'Renderer JS Inscription Id',
};
