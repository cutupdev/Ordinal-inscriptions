import {
    CirclePlus24Icon,
    ToniqButton,
    ToniqButtonVariantEnum,
    ToniqHeading,
    ToniqHeadingLevel,
    Trash24Icon,
    defineToniqElement,
    noNativeFormStyles,
    toniqColors,
    toniqDurations,
} from '@toniq-labs/design-system';
import {classMap, css, defineElementEvent, html, listen, repeat} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {BitgenCollection} from '../../../data/bitgen-collection';
import {scrollbarStyles} from '../../styles/scrollbars';

export const ToniqBitgenCollectionNav = defineToniqElement<{
    bitgenCollections: ReadonlyArray<Readonly<BitgenCollection>>;
    selectedBitgenCollectionIndex: number;
}>()({
    tagName: 'toniq-bitgen-collection-nav',
    styles: css`
        ${scrollbarStyles}

        :host {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        ${ToniqHeading} {
            padding: 0 16px;
        }

        .nav-header {
            display: flex;
            gap: 24px;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 16px;
        }

        .nav-header ${ToniqButton}, .delete-collection ${ToniqButton} {
            height: 32px;
            width: 32px;
        }

        .nav-footer {
            padding: 8px;
            background-color: ${toniqColors.pagePrimary.backgroundColor};
            display: flex;
            justify-content: center;
        }

        .nav-footer ${ToniqButton} {
            height: 32px;
            flex-grow: 1;
        }

        nav {
            overflow-y: auto;
            flex-grow: 1;
        }

        ol,
        li {
            ${noNativeSpacing};
            list-style: none;
        }

        li {
            display: flex;
            position: relative;
        }

        .collection-name button {
            ${noNativeFormStyles};
            cursor: pointer;
            min-width: 100%;
            width: 200px;
            max-width: 400px;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 8px 16px;
        }

        .collection-name {
            background-color: white;
            transition: background-color ${toniqDurations.interaction};
        }

        li + li {
            border-top: 1px solid #eee;
        }

        .collection-name:hover {
            background-color: #dbfff5;
        }

        .collection-name:hover .delete-collection {
            visibility: visible;
            pointer-events: unset;
        }

        .collection-name.selected-collection {
            background-color: #eee;
        }

        .collection-name.selected-collection button {
            pointer-events: none;
            cursor: auto;
        }

        .delete-collection {
            position: absolute;
            left: 4px;
            top: 0;
            visibility: hidden;
            pointer-events: none;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
    `,
    events: {
        selectionChange: defineElementEvent<number>(),
        collectionCreate: defineElementEvent<void>(),
        collectionDelete: defineElementEvent<number>(),
        editRawTrigger: defineElementEvent<void>(),
    },
    renderCallback({inputs, dispatch, events}) {
        const collectionSelectionTemplates = repeat(
            inputs.bitgenCollections,
            (bitgenCollection) => bitgenCollection.editId,
            (bitgenCollection, bitgenCollectionIndex) => {
                return html`
                    <li
                        class="collection-name ${classMap({
                            'selected-collection':
                                inputs.selectedBitgenCollectionIndex === bitgenCollectionIndex,
                        })}"
                    >
                        <div class="delete-collection">
                            <${ToniqButton.assign({
                                icon: Trash24Icon,
                                variant: ToniqButtonVariantEnum.Secondary,
                            })}
                                ${listen('click', () => {
                                    dispatch(new events.collectionDelete(bitgenCollectionIndex));
                                })}
                            ></${ToniqButton}>
                        </div>
                        <button
                            ${listen('click', () => {
                                dispatch(new events.selectionChange(bitgenCollectionIndex));
                            })}
                        >
                            ${bitgenCollection.collection.name || '(empty name)'}
                        </button>
                    </li>
                `;
            },
        );

        return html`
            <div class="nav-header">
                <${ToniqHeading.assign({level: ToniqHeadingLevel.H4})}>Collections</${ToniqHeading}>
                <${ToniqButton.assign({
                    icon: CirclePlus24Icon,
                    variant: ToniqButtonVariantEnum.Secondary,
                })}
                    ${listen('click', () => {
                        dispatch(new events.collectionCreate());
                    })}
                ></${ToniqButton}>
            </div>
            <nav>
                <ol>
                    ${collectionSelectionTemplates}
                </ol>
            </nav>
            <div class="nav-footer">
                <${ToniqButton.assign({
                    text: 'Edit Raw',
                    variant: ToniqButtonVariantEnum.Secondary,
                })}
                    ${listen('click', () => {
                        dispatch(new events.editRawTrigger());
                    })}
                ></${ToniqButton}>
            </div>
        `;
    },
});
