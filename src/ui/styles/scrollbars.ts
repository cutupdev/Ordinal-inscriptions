import {toniqColors} from '@toniq-labs/design-system';
import {css} from 'element-vir';

const scrollbarColorCssVar = toniqColors.pageInteraction.foregroundColor;
const scrollbarTrackColorCssVar = toniqColors.accentSecondary.backgroundColor;

export const scrollbarStyles = css`
    /* Firefox */
    * {
        scrollbar-width: auto;
        scrollbar-color: ${scrollbarColorCssVar} ${scrollbarTrackColorCssVar};
    }

    /* Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    *::-webkit-scrollbar-track {
        background: ${scrollbarTrackColorCssVar};
        border-radius: 8px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${scrollbarColorCssVar};
        border-radius: 8px;
    }
`;
