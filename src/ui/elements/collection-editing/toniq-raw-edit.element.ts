import {extractEventTarget} from '@augment-vir/browser';
import {extractErrorMessage} from '@augment-vir/common';
import {
    ToniqButton,
    ToniqButtonVariantEnum,
    ToniqHeading,
    ToniqHeadingLevel,
    defineToniqElement,
    toniqFontStyles,
} from '@toniq-labs/design-system';
import {css, defineElementEvent, html, listen, nothing} from 'element-vir';
import {scrollbarStyles} from '../../styles/scrollbars';
import {ToniqError} from '../common-elements/toniq-error.element';

export const ToniqRawEdit = defineToniqElement<{
    code: string;
    verifyCode: (code: string) => Error | undefined;
    showErrorPrompt: boolean;
}>()({
    tagName: 'toniq-raw-edit',
    styles: css`
        ${scrollbarStyles}

        :host {
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        textarea {
            ${toniqFontStyles.monospaceFont};
            font-size: 1.5em;
            flex-grow: 1;
            resize: none;
        }

        footer {
            display: flex;
            gap: 32px;
            align-items: center;
        }
    `,
    events: {
        codeChange: defineElementEvent<string>(),
        resetAllData: defineElementEvent<void>(),
    },
    stateInitStatic: {
        currentCode: undefined as string | undefined,
        error: undefined as Error | undefined,
    },
    renderCallback({state, updateState, inputs, dispatch, events}) {
        if (state.currentCode == undefined) {
            updateState({
                currentCode: inputs.code,
                error: inputs.verifyCode(inputs.code),
            });
        }

        const errorPrompt = inputs.showErrorPrompt
            ? html`
                  <${ToniqHeading.assign({level: ToniqHeadingLevel.H4})}>
                      Saved data is invalid. Either fix it and save your fixes or reset all data to
                      the defaults.
                  </${ToniqHeading}>
              `
            : nothing;

        return html`
            ${errorPrompt}
            <textarea
                .value=${state.currentCode}
                ${listen('input', (event) => {
                    const element = extractEventTarget(event, HTMLTextAreaElement);
                    const newCode = element.value;
                    const error = inputs.verifyCode(newCode);
                    updateState({currentCode: newCode, error});
                })}
            ></textarea>
            <footer>
                <${ToniqButton.assign({
                    disabled: !!state.error,
                    text: 'Save',
                })}
                    ${listen('click', () => {
                        if (state.currentCode && !inputs.verifyCode(state.currentCode)) {
                            dispatch(new events.codeChange(state.currentCode));
                        }
                    })}
                ></${ToniqButton}>
                <${ToniqButton.assign({
                    text: 'Reset to defaults',
                    variant: ToniqButtonVariantEnum.Outline,
                })}
                    ${listen('click', () => {
                        dispatch(new events.resetAllData());
                    })}
                ></${ToniqButton}>
                <${ToniqError}>${extractErrorMessage(state.error)}</${ToniqError}>
            </footer>
        `;
    },
});
