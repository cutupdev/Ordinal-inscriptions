import {getObjectTypedKeys, mapObjectValues} from '@augment-vir/common';

export function createRendererJavascriptCode(version: RendererVersion): string {
    return rendererVersions[version || latestRendererVersion].code;
}

const rendererVersions = {
    '0': {
        description: 'Starting point; was developed before a live blockchain test.',
        code: `async function render(size, ...inscriptionIds) {
    try {
        const base64Images = await Promise.all(inscriptionIds.map(async (id) => await getBase64(await (await fetch(\`/content/\${id}\`)).blob())));
        const finalImageUrl = generateCombinedImageUrl(size, base64Images, false);
        const resizeArtifactFix = \`<img class="full-size" onload="this.remove()" src="\${generateCombinedImageUrl(size, base64Images, true)}" />\`;
        return \`<style>body, html {margin: 0; padding: 0; overflow: hidden;} .full-size {position: absolute; opacity: 1; top: calc(100% - 1px); left: calc(100% - 1px);} img {display: block;}</style>\${resizeArtifactFix}<img src="\${finalImageUrl}" />\`;
    } catch (error) {
        return \`<p style="color: red;">\${error?.message || String(error)}</p>\`;
    }
}
function generateCombinedImageUrl(size, base64Images, fullSize) {
    const innerImages = base64Images.map((base64Image) => \`<foreignObject x="0" y="0" width="100%" height="100%"><svg \${fullSize ? 'class="full-size"' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}" style="image-rendering: pixelated; background: url(\${base64Image}) no-repeat \${fullSize ? '' : 'center/contain'};"></svg></foreignObject>\`);

    return URL.createObjectURL(new Blob([\`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}">\${innerImages.join('')}</svg>\`], {type: 'image/svg+xml'}));
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
`,
    },
    '1': {
        description:
            "First upgrade after blockchain testing. Fixes the rendered image so it fits its container's width.",
        code: `async function render(size, ...inscriptionIds) {
    try {
        const base64Images = await Promise.all(inscriptionIds.map(async (id) => await getBase64(await (await fetch(\`/content/\${id}\`)).blob())));
        const finalImageUrl = generateCombinedImageUrl(size, base64Images, false);
        const resizeArtifactFix = \`<img class="full-size" onload="this.remove()" src="\${generateCombinedImageUrl(size, base64Images, true)}" />\`;
        return \`<style>body, html {margin: 0; padding: 0; overflow: hidden;} .full-size {position: absolute; opacity: 1; top: calc(100% - 1px); left: calc(100% - 1px);} img {display: block; width:100%;}</style>\${resizeArtifactFix}<img src="\${finalImageUrl}" />\`;
    } catch (error) {
        return \`<p style="color: red;">\${error?.message || String(error)}</p>\`;
    }
}
function generateCombinedImageUrl(size, base64Images, fullSize) {
    const innerImages = base64Images.map((base64Image) => \`<foreignObject x="0" y="0" width="100%" height="100%"><svg \${fullSize ? 'class="full-size"' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}" style="image-rendering: pixelated; background: url(\${base64Image}) no-repeat \${fullSize ? '' : 'center/contain'};"></svg></foreignObject>\`);

    return URL.createObjectURL(new Blob([\`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}">\${innerImages.join('')}</svg>\`], {type: 'image/svg+xml'}));
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
`,
    },
    '2': {
        description:
            'Fixes the rendered image so that it fills its containers width but does not grow too tall.',
        code: `async function render(size, ...inscriptionIds) {
    try {
        const base64Images = await Promise.all(inscriptionIds.map(async (id) => await getBase64(await (await fetch(\`/content/\${id}\`)).blob())));
        const finalImageUrl = generateCombinedImageUrl(size, base64Images, false);
        const resizeArtifactFix = \`<img class="full-size" onload="this.remove()" src="\${generateCombinedImageUrl(size, base64Images, true)}" />\`;
        return \`<style>body, html {margin:0;padding:0;overflow:hidden;display:flex;flex-direction:column;height:100vh;justify-content:center;} .full-size {position: absolute; opacity: 1; top: calc(100% - 1px); left: calc(100% - 1px);} img {display: block;}</style>\${resizeArtifactFix}<img src="\${finalImageUrl}" />\`;
    } catch (error) {
        return \`<p style="color: red;">\${error?.message || String(error)}</p>\`;
    }
}
function generateCombinedImageUrl(size, base64Images, fullSize) {
    const innerImages = base64Images.map((base64Image) => \`<foreignObject x="0" y="0" width="100%" height="100%"><svg \${fullSize ? 'class="full-size"' : ''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}" style="image-rendering: pixelated; background: url(\${base64Image}) no-repeat \${fullSize ? '' : 'center/contain'};"></svg></foreignObject>\`);

    return URL.createObjectURL(new Blob([\`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${size.width} \${size.height}" width="\${size.width}" height="\${size.height}">\${innerImages.join('')}</svg>\`], {type: 'image/svg+xml'}));
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
`,
    },
} as const satisfies Readonly<Record<string, {code: string; description: string}>>;

export const RendererVersion = mapObjectValues(rendererVersions, (key) => key);
export type RendererVersion = keyof typeof rendererVersions;
export const latestRendererVersion = getObjectTypedKeys(rendererVersions).slice(-1)[0]!;
