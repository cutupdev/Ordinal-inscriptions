import {
    copyThroughJson,
    ensureError,
    extractErrorMessage,
    filterOutIndexes,
    isLengthAtLeast,
    makeWritable,
    mergeDeep,
    wrapInTry,
} from '@augment-vir/common';
import {ToniqLoading, ToniqLoadingSizeEnum, defineToniqElement} from '@toniq-labs/design-system';
import {asyncProp, css, html, isError, isResolved, listen, nothing} from 'element-vir';
import {assertValidShape, isValidShape} from 'object-shape-tester';
import {
    BitgenCollection,
    bitgenCollectionStorageShape,
    createEmptyBitgenCollection,
} from '../../data/bitgen-collection';
import {generateDefaultBitgenCollections} from '../../data/default-bitgen-collections';
import {WebClientInterface} from '../../services/web-client-interface/web-client-interface';
import {BitgenCollectionChangeEvent} from '../events/bitgen-collection-change.event';
import {scrollbarStyles} from '../styles/scrollbars';
import {ToniqBitgenCollectionDisplay} from './collection-display/toniq-bitgen-collection-display.element';
import {ToniqBitgenCollectionEdit} from './collection-editing/toniq-bitgen-collection-edit.element';
import {ToniqBitgenCollectionNav} from './collection-editing/toniq-bitgen-collection-nav.element';
import {ToniqRawEdit} from './collection-editing/toniq-raw-edit.element';
import {ToniqError} from './common-elements/toniq-error.element';

export const ToniqBitgenCollections = defineToniqElement<{
    webClientInterface: Readonly<WebClientInterface>;
}>()({
    tagName: 'toniq-bitgen-collections',
    styles: css`
        ${scrollbarStyles}

        :host {
            display: flex;
            overflow: hidden;
        }

        main {
            display: flex;
            overflow: hidden;
            align-items: stretch;
        }

        section {
            flex-shrink: 0;
            overflow-x: hidden;
        }

        .edit-section,
        .display-section {
            overflow-y: auto;
        }

        .display-section {
            flex-grow: 1;
            flex-shrink: 1;
        }

        ${ToniqBitgenCollectionDisplay}, ${ToniqBitgenCollectionNav} {
            height: 100%;
        }

        .failure-edit {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 16px;
        }

        .failure-edit ${ToniqRawEdit} {
            flex-grow: 1;
        }
    `,
    stateInitStatic: {
        currentBitgenCollections: asyncProp<ReadonlyArray<unknown>>(),
        selectedBitgenCollectionIndex: 0,
        editRaw: false,
    },
    initCallback({inputs, state}) {
        state.currentBitgenCollections.setNewPromise(
            inputs.webClientInterface.collectionStorage.loadStoredBitgenCollections(),
        );
    },
    renderCallback({state, inputs, updateState}) {
        async function saveNewBitgenCollections(
            newBitgenCollections: ReadonlyArray<Readonly<BitgenCollection>>,
        ) {
            await inputs.webClientInterface.collectionStorage.storeBitgenCollections(
                newBitgenCollections,
            );
            state.currentBitgenCollections.setResolvedValue(newBitgenCollections);
        }

        if (!isResolved(state.currentBitgenCollections.value)) {
            return html`
                <${ToniqLoading.assign({
                    size: ToniqLoadingSizeEnum.WholePage,
                })}></${ToniqLoading}>
            `;
        } else if (
            isError(state.currentBitgenCollections.value) ||
            state.editRaw ||
            !isValidShape(state.currentBitgenCollections.value, bitgenCollectionStorageShape)
        ) {
            const errorTemplate = isError(state.currentBitgenCollections.value)
                ? html`
                      <${ToniqError}>
                          ${extractErrorMessage(state.currentBitgenCollections.value)}
                      </${ToniqError}>
                  `
                : nothing;

            return html`
                <div class="failure-edit">
                    ${errorTemplate}
                    <${ToniqRawEdit.assign({
                        showErrorPrompt: !state.editRaw,
                        code: JSON.stringify(state.currentBitgenCollections.value, null, 4),
                        verifyCode(newCode) {
                            return wrapInTry({
                                callback() {
                                    assertValidShape(
                                        JSON.parse(newCode),
                                        bitgenCollectionStorageShape,
                                    );
                                    return undefined;
                                },
                                catchCallback(caught) {
                                    return ensureError(caught);
                                },
                            });
                        },
                    })}
                        ${listen(ToniqRawEdit.events.codeChange, async (event) => {
                            await saveNewBitgenCollections(JSON.parse(event.detail));
                            updateState({editRaw: false});
                        })}
                        ${listen(ToniqRawEdit.events.resetAllData, async () => {
                            await saveNewBitgenCollections(generateDefaultBitgenCollections());
                            updateState({editRaw: false});
                        })}
                    ></${ToniqRawEdit}>
                </div>
            `;
        }
        const bitgenCollections = state.currentBitgenCollections.value;

        if (!isLengthAtLeast(bitgenCollections, 1)) {
            return html`
                <${ToniqError}>No collections to edit.</${ToniqError}>
            `;
        }

        const selectedBitgenCollection =
            bitgenCollections[state.selectedBitgenCollectionIndex] || bitgenCollections[0];

        async function mutateCollections(
            mutateCallback: (newCollections: BitgenCollection[]) => void | BitgenCollection[],
        ) {
            const newCollections: BitgenCollection[] = makeWritable(
                copyThroughJson(bitgenCollections),
            );
            const mutatedBitgenCollections = mutateCallback(newCollections) || newCollections;

            await saveNewBitgenCollections(mutatedBitgenCollections);
        }

        return html`
            <main
                ${listen(BitgenCollectionChangeEvent, async (event) => {
                    await mutateCollections((newCollections) => {
                        const newCollection = mergeDeep<BitgenCollection>(
                            selectedBitgenCollection,
                            event.detail,
                        );

                        newCollections[state.selectedBitgenCollectionIndex] = newCollection;
                    });
                })}
            >
                <section>
                    <${ToniqBitgenCollectionNav.assign({
                        bitgenCollections,
                        selectedBitgenCollectionIndex: state.selectedBitgenCollectionIndex,
                    })}
                        ${listen(ToniqBitgenCollectionNav.events.selectionChange, (event) => {
                            updateState({selectedBitgenCollectionIndex: event.detail});
                        })}
                        ${listen(ToniqBitgenCollectionNav.events.collectionCreate, async () => {
                            await mutateCollections((newCollections) => {
                                newCollections.splice(0, 0, createEmptyBitgenCollection());
                            });
                            updateState({
                                selectedBitgenCollectionIndex: 0,
                            });
                        })}
                        ${listen(ToniqBitgenCollectionNav.events.editRawTrigger, () => {
                            updateState({editRaw: true});
                        })}
                        ${listen(
                            ToniqBitgenCollectionNav.events.collectionDelete,
                            async (event) => {
                                await mutateCollections((newCollections) => {
                                    return filterOutIndexes(newCollections, [event.detail]);
                                });
                            },
                        )}
                    ></${ToniqBitgenCollectionNav}>
                </section>
                <section class="edit-section">
                    <${ToniqBitgenCollectionEdit.assign({
                        bitgenCollection: selectedBitgenCollection,
                    })}></${ToniqBitgenCollectionEdit}>
                </section>
                <section class="display-section">
                    <${ToniqBitgenCollectionDisplay.assign({
                        bitgenCollection: selectedBitgenCollection,
                    })}></${ToniqBitgenCollectionDisplay}>
                </section>
            </main>
        `;
    },
});
