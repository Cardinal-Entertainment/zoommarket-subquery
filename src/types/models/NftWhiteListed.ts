// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftWhiteListedProps = Omit<NftWhiteListed, NonNullable<FunctionPropertyNames<NftWhiteListed>>>;

export class NftWhiteListed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public token: string;

    public isWhitelisted: boolean;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftWhiteListed entity without an ID");
        await store.set('nftWhiteListed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftWhiteListed entity without an ID");
        await store.remove('nftWhiteListed', id.toString());
    }

    static async get(id:string): Promise<NftWhiteListed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftWhiteListed entity without an ID");
        const record = await store.get('nftWhiteListed', id.toString());
        if (record){
            return NftWhiteListed.create(record as NftWhiteListedProps);
        }else{
            return;
        }
    }



    static create(record: NftWhiteListedProps): NftWhiteListed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftWhiteListed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
