import {Dimensions, randomInteger} from '@augment-vir/common';
import {ToniqHeading, ToniqHeadingLevel, defineToniqElement} from '@toniq-labs/design-system';
import {css, html} from 'element-vir';
import {noNativeSpacing} from 'vira';
import {BitgenCollection, sanitizeLayers} from '../../../data/bitgen-collection';
import {generateTraitsString} from '../../../data/bitgen-collection-code';
import {ToniqBitgenFrame} from './toniq-bitgen-frame.element';
import {ToniqBitgenTraitsSelection} from './toniq-bitgen-traits-selection.element';

export const ToniqBitgenCollectionExamplesDisplay = defineToniqElement<{
    bitgenCollection: Readonly<BitgenCollection>;
    randomFrameCount: number;
}>()({
    tagName: 'toniq-bitgen-collection-examples-display',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .examples {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }

        .example {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        ${ToniqBitgenFrame} {
            border: 2px solid #ccc;
        }

        p {
            ${noNativeSpacing};
        }
    `,
    stateInitStatic: {
        randomizedTraits: [] as number[][],
        cleanup: () => {},
    },
    initCallback({updateState, inputs}) {
        function setRandomizedTraits() {
            const sanitizedLayers = sanitizeLayers(inputs.bitgenCollection);
            const randomizedTraits = Array(inputs.randomFrameCount)
                .fill(0)
                .map(() =>
                    sanitizedLayers.map((layer) => {
                        return randomInteger({min: -1, max: layer.traits.length - 1});
                    }),
                );
            updateState({
                randomizedTraits,
            });
        }

        setRandomizedTraits();

        const intervalId = globalThis.setInterval(setRandomizedTraits, 1_000);

        updateState({
            cleanup: () => {
                globalThis.clearInterval(intervalId);
            },
        });
    },
    cleanupCallback({state}) {
        state.cleanup();
    },
    renderCallback({inputs, state}) {
        const examples = generateFrameExamples(inputs.bitgenCollection);

        const exampleTemplates = examples.map((example) => {
            return html`
                <div class="example">
                    <${ToniqHeading.assign({
                        level: ToniqHeadingLevel.H4,
                    })}>
                        ${example.title}
                    </${ToniqHeading}>
                    <${ToniqBitgenFrame.assign({
                        bitgenCollection: inputs.bitgenCollection,
                        size: example.size,
                    })}></${ToniqBitgenFrame}>
                </div>
            `;
        });

        const randomTraitsTemplates = state.randomizedTraits.map((randomizedTraits) => {
            const bitgenCollectionWithRandomizedTraits: Readonly<BitgenCollection> = {
                ...inputs.bitgenCollection,
                selectedTraits: randomizedTraits,
            };

            return html`
                <div class="example">
                    <p>${generateTraitsString(bitgenCollectionWithRandomizedTraits, true)}</p>
                    <${ToniqBitgenFrame.assign({
                        bitgenCollection: bitgenCollectionWithRandomizedTraits,
                        size: inputs.bitgenCollection.size,
                    })}></${ToniqBitgenFrame}>
                </div>
            `;
        });

        return html`
            <${ToniqHeading.assign({
                level: ToniqHeadingLevel.H3,
            })}>
                Examples
            </${ToniqHeading}>
            <${ToniqBitgenTraitsSelection.assign({
                bitgenCollection: inputs.bitgenCollection,
            })}></${ToniqBitgenTraitsSelection}>
            <section class="examples">${exampleTemplates}</section>
            <${ToniqHeading.assign({
                level: ToniqHeadingLevel.H4,
            })}>
                Randomized
            </${ToniqHeading}>
            <section class="examples">${randomTraitsTemplates}</section>
        `;
    },
});

function generateFrameExamples(bitgenCollection: Readonly<BitgenCollection>) {
    const frameExamples: ReadonlyArray<Readonly<{title: string; size: Readonly<Dimensions>}>> = [
        {
            title: 'Exact Size',
            size: bitgenCollection.size,
        },
        {
            title: '1:1',
            size: {
                width: 300,
                height: 300,
            },
        },
        {
            title: '2:1',
            size: {
                width: 400,
                height: 200,
            },
        },
        {
            title: '1:2',
            size: {
                width: 200,
                height: 400,
            },
        },
    ];
    return frameExamples;
}
