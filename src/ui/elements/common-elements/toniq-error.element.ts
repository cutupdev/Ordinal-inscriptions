import {defineToniqElementNoInputs, toniqFontStyles} from '@toniq-labs/design-system';
import {css, html} from 'element-vir';

export const ToniqError = defineToniqElementNoInputs({
    tagName: 'toniq-error',
    styles: css`
        :host {
            ${toniqFontStyles.boldParagraphFont};
            color: red;
        }
    `,
    renderCallback() {
        return html`
            <slot></slot>
        `;
    },
});
