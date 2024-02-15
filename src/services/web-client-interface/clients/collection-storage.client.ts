import {defineClient} from 'generic-client-interface';
import localForage from 'localforage-esm';
import {assertValidShape} from 'object-shape-tester';
import {
    BitgenCollection,
    bitgenCollectionStorageShape,
    createEmptyBitgenCollection,
} from '../../../data/bitgen-collection';

const bitgenCollectionStore = localForage.createInstance({
    description: 'Bitgen collection creation storage',
    name: 'bitgen-collections',
    storeName: 'bitgen-collections',
});
const bitgenCollectionStorageKey = 'saved-collections';

async function loadStoredBitgenCollections(): Promise<ReadonlyArray<unknown>> {
    const storedCollections = await bitgenCollectionStore.getItem(bitgenCollectionStorageKey);

    if (!Array.isArray(storedCollections)) {
        return [
            createEmptyBitgenCollection(),
        ];
    }

    if (!storedCollections.length) {
        return [
            createEmptyBitgenCollection(),
        ];
    }

    return storedCollections;
}

async function storeBitgenCollections(
    newBitgenCollections: ReadonlyArray<Readonly<BitgenCollection>>,
): Promise<void> {
    assertValidShape(newBitgenCollections, bitgenCollectionStorageShape);

    await bitgenCollectionStore.setItem(bitgenCollectionStorageKey, newBitgenCollections);
}

export const collectionStorageClient = defineClient({
    loadStoredBitgenCollections,
    storeBitgenCollections,
});
