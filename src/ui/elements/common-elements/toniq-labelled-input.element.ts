import {ToniqInput, defineToniqElement} from '@toniq-labs/design-system';
import {css, defineElementEvent, html, listen} from 'element-vir';
import {noNativeSpacing} from 'vira';

export const ToniqLabelledInput = defineToniqElement<
    {label: string} & typeof ToniqInput.inputsType
>()({
    tagName: 'toniq-labelled-input',
    events: {
        valueChange: defineElementEvent<string>(),
    },
    styles: css`
        label {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        ${ToniqInput} {
            width: 100%;
        }

        p {
            ${noNativeSpacing};
        }
    `,
    renderCallback({inputs, dispatch, events}) {
        return html`
            <label>
                <p class="label-label">${inputs.label}</p>
                <${ToniqInput.assign({...inputs})}
                    ${listen(ToniqInput.events.valueChange, (event) => {
                        dispatch(new events.valueChange(event.detail));
                    })}
                ></${ToniqInput}>
            </label>
        `;
    },
});
