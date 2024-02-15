import {filterMap, randomString} from '@augment-vir/common';
import {defineShape, enumShape, or} from 'object-shape-tester';
import {RendererVersion} from './bitgen-renderer-code';

export const bitgenTraitShape = defineShape({
    name: '',
    inscriptionId: '',
});
export type BitgenTrait = typeof bitgenTraitShape.runTimeType;

export const bitgenLayerShape = defineShape({
    type: '',
    traits: [bitgenTraitShape],
});
export type BitgenLayer = typeof bitgenLayerShape.runTimeType;

export const bitgenCollectionShape = defineShape({
    editId: '',
    ids: {
        collectionImageInscriptionId: '',
        collectionJsonInscriptionId: '',
        rendererJavascriptInscriptionId: '',
        bitcoinAddress: '',
    },
    selectedRenderer: enumShape(RendererVersion),
    size: {
        width: 200,
        height: 200,
    },
    selectedTraits: [or(undefined, null, 0)],
    collection: {
        name: '',
        description: '',
        creator: '',
    },
    layers: [bitgenLayerShape],
});
export type BitgenCollection = typeof bitgenCollectionShape.runTimeType;

export function createEmptyBitgenCollection(): BitgenCollection {
    return {
        ...bitgenCollectionShape.defaultValue,
        editId: randomString(16),
    };
}

export const bitgenCollectionStorageShape = defineShape([bitgenCollectionShape]);

export function generateDefaultTraitSelection(
    bitgenCollection: Readonly<Pick<BitgenCollection, 'layers'>>,
): number[] {
    return sanitizeLayers(bitgenCollection).map(() => 0);
}

export function sanitizeLayers(
    bitgenCollection: Readonly<Pick<BitgenCollection, 'layers'>>,
): BitgenLayer[] {
    return filterMap(
        bitgenCollection.layers,
        (layer) => {
            return {
                ...layer,
                traits: layer.traits.filter((trait) => !!trait.inscriptionId),
            };
        },
        (layer) => {
            return layer.traits.some((trait) => !!trait.inscriptionId);
        },
    );
}
