// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type SettledProps = Omit<Settled, NonNullable<FunctionPropertyNames<Settled>>>;

export class Settled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public itemNumber: bigint;

    public nftToken: string;

    public saleToken: string;

    public bidAmount: bigint;

    public winner: string;

    public seller: string;

    public royaltyReceiver: string;

    public royaltyAmount: bigint;

    public tokenIds?: string[];


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Settled entity without an ID");
        await store.set('Settled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Settled entity without an ID");
        await store.remove('Settled', id.toString());
    }

    static async get(id:string): Promise<Settled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Settled entity without an ID");
        const record = await store.get('Settled', id.toString());
        if (record){
            return Settled.create(record as SettledProps);
        }else{
            return;
        }
    }



    static create(record: SettledProps): Settled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Settled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
