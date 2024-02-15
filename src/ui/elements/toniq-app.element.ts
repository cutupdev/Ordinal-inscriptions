import {extractErrorMessage} from '@augment-vir/common';
import {
    ToniqHeading,
    ToniqHeadingLevel,
    ToniqLoading,
    ToniqLoadingSizeEnum,
    defineToniqElementNoInputs,
    toniqFontStyles,
} from '@toniq-labs/design-system';
import {asyncProp, css, html, isError, isResolved} from 'element-vir';
import {loadWebClientInterface} from '../../services/web-client-interface/web-client-interface';
import {ToniqError} from './common-elements/toniq-error.element';
import {ToniqBitgenCollections} from './toniq-bitgen-collections.element';

export const ToniqApp = defineToniqElementNoInputs({
    tagName: 'toniq-app',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            ${toniqFontStyles.paragraphFont};
            overflow: hidden;
            max-height: 100%;
            min-height: 100%;
        }

        ${ToniqBitgenCollections} {
            flex-grow: 1;
        }

        ${ToniqHeading} {
            margin: 0 0 16px 16px;
        }
    `,
    stateInitStatic: {
        webClientInterface: asyncProp({defaultValue: loadWebClientInterface()}),
    },
    renderCallback({state}) {
        const webClientInterface = state.webClientInterface.value;
        if (!isResolved(webClientInterface)) {
            return html`
                <${ToniqLoading.assign({
                    size: ToniqLoadingSizeEnum.WholePage,
                })}></${ToniqLoading}>
            `;
        } else if (isError(webClientInterface)) {
            return html`
                <${ToniqError}>${extractErrorMessage(webClientInterface)}</${ToniqError}>
            `;
        }

        return html`
            <${ToniqHeading.assign({
                level: ToniqHeadingLevel.H1,
            })}>
                BitGen
            </${ToniqHeading}>
            <${ToniqBitgenCollections.assign({webClientInterface})}></${ToniqBitgenCollections}>
        `;
    },
});
