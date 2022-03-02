// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AuctionMaxTimeChangedProps = Omit<AuctionMaxTimeChanged, NonNullable<FunctionPropertyNames<AuctionMaxTimeChanged>>>;

export class AuctionMaxTimeChanged implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public newMaxAuctionTime: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AuctionMaxTimeChanged entity without an ID");
        await store.set('AuctionMaxTimeChanged', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AuctionMaxTimeChanged entity without an ID");
        await store.remove('AuctionMaxTimeChanged', id.toString());
    }

    static async get(id:string): Promise<AuctionMaxTimeChanged | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AuctionMaxTimeChanged entity without an ID");
        const record = await store.get('AuctionMaxTimeChanged', id.toString());
        if (record){
            return AuctionMaxTimeChanged.create(record as AuctionMaxTimeChangedProps);
        }else{
            return;
        }
    }



    static create(record: AuctionMaxTimeChangedProps): AuctionMaxTimeChanged {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AuctionMaxTimeChanged(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
