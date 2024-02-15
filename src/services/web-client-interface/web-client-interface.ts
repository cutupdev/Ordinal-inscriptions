import {awaitAllClients, defineClientInterface} from 'generic-client-interface';

export const webClients = defineClientInterface({
    clientImports: {
        collectionStorage: () => import('./clients/collection-storage.client'),
    },
    isTestEnv: false,
});

export async function loadWebClientInterface() {
    return awaitAllClients(webClients);
}

export type WebClientInterface = Readonly<Awaited<ReturnType<typeof loadWebClientInterface>>>;
