// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AuctionCardsProps = Omit<AuctionCards, NonNullable<FunctionPropertyNames<AuctionCards>>>;

export class AuctionCards implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public itemNumber: bigint;

    public name: string;

    public cardOrigin: string;

    public rarity: string;

    public isNotZoombies: boolean;

    public tokenId: bigint;

    public image?: string;

    public description?: string;

    public typeId?: string;

    public cardSet?: string;

    public zombieType?: string;

    public editionCurrent?: bigint;

    public editionTotal?: bigint;

    public cardLevel?: bigint;

    public originalCost?: bigint;

    public earnCZXP?: bigint;

    public sacrificeCZXP?: bigint;

    public unlockCZXP?: bigint;

    public releaseTime?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AuctionCards entity without an ID");
        await store.set('AuctionCards', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AuctionCards entity without an ID");
        await store.remove('AuctionCards', id.toString());
    }

    static async get(id:string): Promise<AuctionCards | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AuctionCards entity without an ID");
        const record = await store.get('AuctionCards', id.toString());
        if (record){
            return AuctionCards.create(record as AuctionCardsProps);
        }else{
            return;
        }
    }



    static create(record: AuctionCardsProps): AuctionCards {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AuctionCards(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
