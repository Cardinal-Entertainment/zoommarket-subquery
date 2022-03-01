// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';

import {
    NFTTokenId,
} from '../interfaces'




type ItemListedProps = Omit<ItemListed, NonNullable<FunctionPropertyNames<ItemListed>>>;

export class ItemListed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public itemNumber: bigint;

    public auctionEnd: Date;

    public seller: string;

    public tokenIds?: NFTTokenId[];

    public saleToken: string;

    public nftToken: string;

    public minPrice: bigint;

    public zoomBurned: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ItemListed entity without an ID");
        await store.set('itemListed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ItemListed entity without an ID");
        await store.remove('itemListed', id.toString());
    }

    static async get(id:string): Promise<ItemListed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ItemListed entity without an ID");
        const record = await store.get('itemListed', id.toString());
        if (record){
            return ItemListed.create(record as ItemListedProps);
        }else{
            return;
        }
    }



    static create(record: ItemListedProps): ItemListed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ItemListed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
