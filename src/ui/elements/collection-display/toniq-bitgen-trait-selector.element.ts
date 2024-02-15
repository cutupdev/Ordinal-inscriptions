import {ToniqDropdown, ToniqDropdownOption, defineToniqElement} from '@toniq-labs/design-system';
import {css, defineElementEvent, html, listen} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {BitgenLayer} from '../../../data/bitgen-collection';

export const ToniqBitgenTraitSelector = defineToniqElement<{
    selectedTraitIndex: number;
    layer: Readonly<BitgenLayer>;
}>()({
    tagName: 'toniq-bitgen-trait-selector',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            min-width: 200px;
        }

        p {
            ${noNativeSpacing};
        }
    `,
    events: {
        valueChange: defineElementEvent<number>(),
    },
    stateInitStatic: {
        error: undefined as undefined | Error,
    },
    renderCallback({inputs, state, updateState, dispatch, events}) {
        const traitOptions: ReadonlyArray<Readonly<ToniqDropdownOption>> = [
            {
                label: 'Omit',
                value: -1,
            },
        ].concat(
            inputs.layer.traits.map((trait, traitIndex) => {
                return {
                    label: [
                        traitIndex,
                        trait.name,
                    ].join(': '),
                    value: traitIndex,
                };
            }),
        );
        const selectedOption = traitOptions.find(
            (traitOption) => traitOption.value === inputs.selectedTraitIndex,
        );

        return html`
            <label>
                <p>${inputs.layer.type}</p>
                <${ToniqDropdown.assign({
                    options: traitOptions,
                    value: selectedOption,
                })}
                    ${listen(ToniqDropdown.events.selectChange, (event) => {
                        dispatch(new events.valueChange(event.detail.value as number));
                    })}
                ></${ToniqDropdown}>
            </label>
        `;
    },
});
