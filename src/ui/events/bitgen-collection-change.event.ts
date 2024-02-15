import {defineTypedEvent} from 'element-vir';
import {PartialDeep} from 'type-fest';
import {BitgenCollection} from '../../data/bitgen-collection';

export const BitgenCollectionChangeEvent = defineTypedEvent<
    Readonly<PartialDeep<BitgenCollection>>
>()('bitgen-collection-change');
