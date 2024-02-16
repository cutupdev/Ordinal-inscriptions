import {randomString} from '@augment-vir/common';
import {BitgenCollection, createEmptyBitgenCollection} from './bitgen-collection';
import {latestRendererVersion} from './bitgen-renderer-code';

export function generateDefaultBitgenCollections(): ReadonlyArray<Readonly<BitgenCollection>> {
    const defaultBitgenCollections: ReadonlyArray<Readonly<BitgenCollection>> = [
        /**
         * Example taken from inscription
         * 2488a03973e1d780bbc22f938e3c1f49a987a83aee9f89fa747245b60e53eed2i0.
         */
        {
            editId: randomString(16),
            ids: {
                collectionJsonInscriptionId:
                    '4224aa2c2d1b2996b5fdd7b59607eb502059ecf2a5ef68f84ade795c4fb53ef5i0',
                rendererJavascriptInscriptionId:
                    '0e10e346ae3f39b5184b833489feb7d1ffc305f676eeb132c2510d033d636350i0',
                collectionImageInscriptionId:
                    '143ee69b6e790e06c666c7d0104d46ee014197395662e70c55039a7b150075a1i0',
                collectionJavascriptInscriptionId:
                    'dd3716ea72d4ea97f7c7439a9acf81441fd4714936afdc9cb7d81a1e6675ce2ai0',
                bitcoinAddress: '',
            },
            selectedRenderer: latestRendererVersion,
            selectedTraits: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                -1,
            ],
            size: {
                width: 150,
                height: 150,
            },
            collection: {
                name: 'Goated Gamer',
                description:
                    'Goated Gamer is a gaming community with plenty of opportunities to participate in leagues and tournaments. The collection also doubles as art that can forever be inscribed to Bitcoin. First collection to use the BitGen standard, and the first big collection size of Goats on Ordinals.',
                creator: 'Goated Gamer',
            },
            // cspell:disable
            layers: [
                {
                    type: 'Background',
                    traits: [
                        {
                            name: 'Yellow',
                            inscriptionId:
                                'a939213b63893b6896e32d1825b257358a449daf4fb56d2e5575823cea905995i0',
                        },
                        {
                            name: 'Red',
                            inscriptionId:
                                '3c8b0fcf6d827e41a55cd273e818e897d72747d4970f14ff9c6c1f6bc0abb694i0',
                        },
                        {
                            name: 'Rainbow Dark',
                            inscriptionId:
                                'b801217e1fc743e2b1089a4ab5e7b857a871543c71f2f4916d691493b7cc9778i0',
                        },
                        {
                            name: 'Purple',
                            inscriptionId:
                                '7df2847192844004c900dcf24e06138f0063bb38c1740b2eaef4b12275b6a2b9i0',
                        },
                        {
                            name: 'Orange',
                            inscriptionId:
                                'a9b13b78aae2e662f3a73aa1a3492019c6c95ddf882df5859b411e92502140afi0',
                        },
                        {
                            name: 'Light Blue',
                            inscriptionId:
                                'f69b2524582545d7438c65816c5eb16606ae9f870514155c4a4138626f3a8a9fi0',
                        },
                        {
                            name: 'Green',
                            inscriptionId:
                                'b9f3a2b96e566eb983d5604ed7a4f81a015b1e1e0aa4bbee858c18697a39448bi0',
                        },
                        {
                            name: 'Gold',
                            inscriptionId:
                                '5f62a2b6ab4f5cca2fe92491c24f95ce1322da9910768635ffe52dce9293d332i0',
                        },
                        {
                            name: 'BTC Orange',
                            inscriptionId:
                                '8ba759876fc63e156c3f1de1b2a9cc38d0009c222d2b700f8d63126b87cd9084i0',
                        },
                        {
                            name: 'Blue',
                            inscriptionId:
                                '206b7b809f781a19fe0ebac10b862d608f7420499110123b11ef70e76595408ei0',
                        },
                        {
                            name: 'Black',
                            inscriptionId:
                                'aa80a321d8c120184eaa8fbcb8db80b9131db31df680a37148250fca6a3c080ai0',
                        },
                    ],
                },
                {
                    type: 'Back',
                    traits: [
                        {
                            name: 'Sword',
                            inscriptionId:
                                'dc93dd4c27ab7785a22b7b0c864a7fb330824803d465c16d26362dfadcbbdb62i0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                'd631b53bbded9d73f25abf46328bc92661d2e661df390ce76e841f3814592e62i0',
                        },
                        {
                            name: 'Golden Sword',
                            inscriptionId:
                                '339d6aa8c2717b0c8458e2f513ac10b63d463f4867a388d588f108825e32a25ci0',
                        },
                    ],
                },
                {
                    type: 'Skin',
                    traits: [
                        {
                            name: 'Regular',
                            inscriptionId:
                                '92b79ad4dbb968fef619200f1e40fe093f3bf72e156b297782205824d65b0f6bi0',
                        },
                        {
                            name: 'Purple',
                            inscriptionId:
                                '459ed35677c1cb80d2aaf0d3f7e7bd249aa01336b6665cfabee675dd43d06453i0',
                        },
                        {
                            name: 'Robot',
                            inscriptionId:
                                '7a5b17c4e839d05f8c7e2538d47e439d47a3578017a9f94963f3d9e618bbb431i0',
                        },
                        {
                            name: 'Light',
                            inscriptionId:
                                '4cbd41c7965debdbf3ba1a6baa077054a454e3961c587d4512811d48fb62f799i0',
                        },
                        {
                            name: 'Green',
                            inscriptionId:
                                '32344a7730311196d6ef7a5f58317859fb9c0772af78f92dcfda620076946f36i0',
                        },
                        {
                            name: 'Gold',
                            inscriptionId:
                                '6d124041178fe34a0870fe1f66b26829d2a6536b775fd53e9c6423f79109f840i0',
                        },
                        {
                            name: 'Dark',
                            inscriptionId:
                                '2cffd4eea334e0fca466a208614783c131679a5efff463887b155c045c2509d3i0',
                        },
                        {
                            name: 'Dark Brown',
                            inscriptionId:
                                '5a6d1c54ec328daa59ba26e6b4359de9f8067ad1aac4c5b02bd8cc231dc114a3i0',
                        },
                        {
                            name: 'Cyber',
                            inscriptionId:
                                'c1983eb050224b0272c114479aba00764b4c4e4afe21f3e752b359d2a3411503i0',
                        },
                        {
                            name: 'Brown',
                            inscriptionId:
                                '75b5d19d270f56a82355de299f188288c201eef228ccf1e8dfe1fa5fcfafea70i0',
                        },
                        {
                            name: 'Blue',
                            inscriptionId:
                                '2bfc28621460b0712bfc0459a45fe409119b5f0896f1b7e29d33a0101105e8c9i0',
                        },
                        {
                            name: 'Black',
                            inscriptionId:
                                'c2465639d62431df13d40f58a8d7b8cc9c54df59612e8d9e6e334ee99d9897edi0',
                        },
                    ],
                },
                {
                    type: 'Clothing',
                    traits: [
                        {
                            name: 'Wizard Robes',
                            inscriptionId:
                                '061209dcca5f4ad1fa93ca96a21e8c2f3d7675a0345f85d82c36ddab37ef915ci0',
                        },
                        {
                            name: 'TB Jersey',
                            inscriptionId:
                                'be2b7a841244593fc2d39fb28fdd26d11ac745a9ef0552e8bdb6df77fbf44312i0',
                        },
                        {
                            name: 'Silver Chain',
                            inscriptionId:
                                'cb4f718cb61262745fc7cdd7cb9e0cc78cb83d91733f1213f3b3574540897bbbi0',
                        },
                        {
                            name: 'Oversized Sweater',
                            inscriptionId:
                                'fc077ffca0b2199b5b750173f871a8a2388470f8dabe100aa26367b4c96caadci0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                '6ca5ae60918215e502f7f8d9c634cb1fb1dcc6b58e5dd2dc3086704b51462f28i0',
                        },
                        {
                            name: 'MJ Jersey',
                            inscriptionId:
                                '5403119bcaeec24262e0079253b4dd791f4135b6aee32d682e71df06e89d7de4i0',
                        },
                        {
                            name: 'M Jersey',
                            inscriptionId:
                                '4705badf4afa9ed969db488512a7f4ec09a059006016e72751132f39afdc576di0',
                        },
                        {
                            name: 'Infinity',
                            inscriptionId:
                                'fae7db6637690c48d9f5e5ff8b9b7aae0ec92a0bdb39e96a84acdc1ce56ad729i0',
                        },
                        {
                            name: 'Gold Chain',
                            inscriptionId:
                                '1b1a4db1a0a6239e210061f68c6b9fe6f80a9dd6ebccd4b1ac7c5b001b9bedd6i0',
                        },
                        {
                            name: 'Gamer Shirt',
                            inscriptionId:
                                '4cce77d1f67fab7a46f60ba2b8962bb9e7749b5c9ddc7cc3100a7e9d02b8b3e0i0',
                        },
                        {
                            name: 'G Jacket',
                            inscriptionId:
                                'ba456b9bf33ad041625d2758e257a052f57bda462a4b67eb7fbc217a9bbcbbf5i0',
                        },
                        {
                            name: 'G Chain',
                            inscriptionId:
                                '383ef96ed2987bae7e2b358a6cf82f63b06054c69c6b05a2fbd973a6fc519cc9i0',
                        },
                        {
                            name: 'Demon Slayer',
                            inscriptionId:
                                'ba3a6061a8230039d780aae07414511ac1aacd90f5302726f7cac6e435e524f8i0',
                        },
                        {
                            name: 'BTC Shirt',
                            inscriptionId:
                                '1b965c467fe36cf36a53241eb69b1010889ed5364ce69cee2f273a49f5595704i0',
                        },
                        {
                            name: 'BTC Jersey',
                            inscriptionId:
                                '9f0aa2de3ab418d9eb09dc8fc84598a9460268956a99fb057c64ee9ab3b1d917i0',
                        },
                    ],
                },
                {
                    type: 'Accessory',
                    traits: [
                        {
                            name: 'White Beard',
                            inscriptionId:
                                '7c5385db5f6fb325e5cd54fbc9b43bba229828bba318a4e6b9690b8f3f005bf8i0',
                        },
                        {
                            name: 'Tongue',
                            inscriptionId:
                                'c7ad038d305adb1b206665a9f6b3aceca2e33fedda86b68d561dc9f41b1ceaf2i0',
                        },
                        {
                            name: 'Smile',
                            inscriptionId:
                                'd034a3acd983735f448ed41ffff8a78565f760a497dbe1df57547f0249ba3fa5i0',
                        },
                        {
                            name: 'Pizza',
                            inscriptionId:
                                '736fa08a37a02efd51c107038e3da7f9969b451670d6ca32621c80aea4cee46ai0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                '407ee0f34c5c78bb5675d0650f8f4afc62bb4768cb5d6b6fa09ee006836d4b5di0',
                        },
                        {
                            name: 'Laptop',
                            inscriptionId:
                                '7a5592276b52e08130a01a41b4202c03de375dedccffa1204bd7919d098781d2i0',
                        },
                        {
                            name: 'Joint',
                            inscriptionId:
                                '78b5659a3bfeb88c04f21daf6b9558ca4864566d9e3e461d73dc587bef85323ei0',
                        },
                        {
                            name: 'Hay',
                            inscriptionId:
                                'c033aa4943949bbb33ce711bc0b535fb86b05fcd969b1c1fdd28e6ed394b6dc7i0',
                        },
                        {
                            name: 'Gamer Laptop',
                            inscriptionId:
                                '6fd2e8c7d11e9492f4959bf279f8bb9caa3c03707d3d16480e0d73c369ae9a46i0',
                        },
                        {
                            name: 'Frown',
                            inscriptionId:
                                '2706e2bfd663f727ec32b727c9ef1c939f624804c58f1abc146f6076677c6e4ci0',
                        },
                        {
                            name: 'Cigarette',
                            inscriptionId:
                                '576f4c43764803e433e032a5cbeab269975c4f8abfc6d0cb059ba8d2fcc5630ai0',
                        },
                        {
                            name: 'Banana',
                            inscriptionId:
                                '099f4c0870e802249299a54a7bb003e8d4fc6fd7d1bc926dcfa33530c9b1e0a6i0',
                        },
                    ],
                },
                {
                    type: 'Eyes',
                    traits: [
                        {
                            name: 'VR',
                            inscriptionId:
                                '3efbd427db22d5b8a31bc93c95ad2faf10de09dd1fa47c84b5cec64446e258bbi0',
                        },
                        {
                            name: 'Shutter Shades',
                            inscriptionId:
                                '18f4c5eb99e7c7c1bab13cc39385ab481af46f8334bc200011a5a3d99a3ca8e2i0',
                        },
                        {
                            name: 'Shocked',
                            inscriptionId:
                                '28d79f52dcf29f8925c180db79c53515ee7b6e9ff4dc755907bb59f00aa56bfdi0',
                        },
                        {
                            name: 'Shades',
                            inscriptionId:
                                'efc16d24604a222403a9a4a982d594ad40ad6ac04798c337593dcbbb0f27dda5i0',
                        },
                        {
                            name: 'Scout Eye',
                            inscriptionId:
                                '185c2496a70f57813c192939de9c01107e4b2d8fe37a4ec576caad6c271cfc99i0',
                        },
                        {
                            name: 'Pit Vipers',
                            inscriptionId:
                                '7ac97a794a47d27f3948da502e27dfda3d9c8f13fb528ea57ba35db1761f9e0ei0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                '428d1b98f26f039bc48357d4e40bfda78bfd0a5ba9e70e2f29fd31506e9b5843i0',
                        },
                        {
                            name: 'Hyper Specs',
                            inscriptionId:
                                '00ea4adfa89596d49243cfd5ddc5f9016e96486579de823d3093ac6ffc422342i0',
                        },
                        {
                            name: 'Golden Shades',
                            inscriptionId:
                                '6123afe52757c95db30b4ef6478e735182ad29b561e4bb81fd9fb6a8d04a4b0bi0',
                        },
                        {
                            name: 'Gamer Glasses',
                            inscriptionId:
                                '0897d557f2d2d8d6102eb689aac7eea420bc22a24b9a5e56c644e74e36bce6f9i0',
                        },
                        {
                            name: 'Eyepatch',
                            inscriptionId:
                                'd04a2894e23aefe6fbb9b49207508ad80cb937946dfecb3fddb6c72aea7b9b09i0',
                        },
                        {
                            name: 'Cyber Visor',
                            inscriptionId:
                                '431ad1097621f1a84e84481d39e33cf51ee00c80a0ced36b2cf3666bc1ea267ai0',
                        },
                        {
                            name: 'Crying',
                            inscriptionId:
                                'e6925c5edb968f5af1d60ab7b8960509e6fdb30522db81b53bc01c3435ccc9a9i0',
                        },
                    ],
                },
                {
                    type: 'Ear',
                    traits: [
                        {
                            name: 'Silver Hoops',
                            inscriptionId:
                                '5a025762b2ba51368c47854b364a6ad8f100c5295d23f3f7ce82fe9cfb85cc94i0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                '557c28f876804877fbc9990c5795934ba5bf20a705a287257c17cd60a82826c7i0',
                        },
                        {
                            name: 'Gold Hoop',
                            inscriptionId:
                                '134f9c175740511a95dfae4a6d992cb9ab27d6b9368939a8fbe9b017d62e5966i0',
                        },
                        {
                            name: 'G Earring',
                            inscriptionId:
                                'bb076ef516a9d8fc9d13c0212a12ac627517fc52b4a741d098bbc627c32f5d61i0',
                        },
                        {
                            name: 'Controller',
                            inscriptionId:
                                'fec513b363cfcc02833077ab135e4211d8cb5331075821bf7004be74370ad839i0',
                        },
                    ],
                },
                {
                    type: 'Head',
                    traits: [
                        {
                            name: 'Wizard Hat',
                            inscriptionId:
                                '44025439ed3ce7e6c7d118b4fbead08205d00688e046ef3f5fa4a45c17ee77c9i0',
                        },
                        {
                            name: 'Sweatband',
                            inscriptionId:
                                '280d4ca3bd91db02b115df76f4e7b2cad1b830ec0673e8d9f81f9e902a1f0c30i0',
                        },
                        {
                            name: 'None',
                            inscriptionId:
                                '307f1cbd5b91463ad884b23d5ee6dde97ee810c2bb5574191c9aa1968f3a6938i0',
                        },
                        {
                            name: 'Mohawk',
                            inscriptionId:
                                '20dd15043aa5f92137ff04ec88c954c6201d9407bc220562258fde750aeb1c5bi0',
                        },
                        {
                            name: 'Headset',
                            inscriptionId:
                                'd0d28254cb8f4241a785cad71f299ace5e15a0b63727c4d3856e39b7bed894a1i0',
                        },
                        {
                            name: 'Headphones',
                            inscriptionId:
                                '01f0041882cf9f7fb1e3402c2f49cf96d32cd3071a1f21c77a1f56ea45eda34di0',
                        },
                        {
                            name: 'Halo',
                            inscriptionId:
                                '768d1fee2af8ef0c36b9619e1f37765c8a98fdbf33386c65e17b66646819bf16i0',
                        },
                        {
                            name: 'Hair Sweatband',
                            inscriptionId:
                                '9770e8243bb77ff911849cc5ac803e74af2198c2785fbaab210616ddb41453dbi0',
                        },
                        {
                            name: 'Golden Horns',
                            inscriptionId:
                                'fa83bf1b26a45a554a59f9a861c8ef4f9411e09196a9d224d9f45b49e7ede05fi0',
                        },
                        {
                            name: 'G Cap',
                            inscriptionId:
                                'b50d394e4733d60e8853c1d3884e5648cebeab82d16471111819eddacb70c200i0',
                        },
                        {
                            name: 'Floating Diamond',
                            inscriptionId:
                                '71a7671c5a80dae0201c273c0b2b926433f0a9ba7e2a6c8b83600f77c6814351i0',
                        },
                        {
                            name: 'Durag',
                            inscriptionId:
                                '9062f18627624ca00bc80de8c5ae5c91631bc1df1ad3a83ce3928967a3fb2797i0',
                        },
                        {
                            name: 'Devil',
                            inscriptionId:
                                '9002c4f5aedadc052cbbc53db184050d4e8fb32ae1909766f2721e1bb521a956i0',
                        },
                        {
                            name: 'Crown',
                            inscriptionId:
                                '8118c913818608bf034fc769a019b146a8e22fc1ef2f26b9e6f8695c9aea56aci0',
                        },
                        {
                            name: 'Chef',
                            inscriptionId:
                                '44be7379154a9b2b70d55fd83f85ccd843f450e224671572f3e7119e32ebb2fci0',
                        },
                        {
                            name: 'Bucket Hat',
                            inscriptionId:
                                'b2cadd4e3758122b45b108da7577540aa169f7e093af73b49b39babb851207bai0',
                        },
                    ],
                },
                {
                    type: '1 of 1s',
                    traits: [
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '288fdae86d56ad4167f1c4915e1f0ab0b0772c1f11a14d56f1b83bd3ae93bae6i0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '143ee69b6e790e06c666c7d0104d46ee014197395662e70c55039a7b150075a1i0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '62d1d4846d23501977e5d2a8623c2b450b73bf6d3814c1c307a279f2e5a7bf74i0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '8bd97d0798c69058add71a96720d9a41091d1a4d12e1fcfd8269716ee93d326fi0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                'c7459f48bf9574ba0d95d8228e42f6ce19682e68f5a5758e55fb29faf3d9526ei0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '4d1e307da566200560989a801973d75376247d323c52b1e435ec4957bb579846i0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                'c89f4117cf99250b528fe3e28a6a08fa4835524f928ea23751f27bdd4e479f42i0',
                        },
                        {
                            name: '1-of-1',
                            inscriptionId:
                                '2999493856ebb32d539966aeaf7dff9f6872891c8d6a8df25fdf277add59941ai0',
                        },
                    ],
                },
            ],
            // cspell:enable
        },
        createEmptyBitgenCollection(),
    ];

    return defaultBitgenCollections;
}
