// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TokenWhiteListedProps = Omit<TokenWhiteListed, NonNullable<FunctionPropertyNames<TokenWhiteListed>>>;

export class TokenWhiteListed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public token: string;

    public isWhitelisted: boolean;

    public minBidIncrement: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save TokenWhiteListed entity without an ID");
        await store.set('tokenWhiteListed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove TokenWhiteListed entity without an ID");
        await store.remove('tokenWhiteListed', id.toString());
    }

    static async get(id:string): Promise<TokenWhiteListed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get TokenWhiteListed entity without an ID");
        const record = await store.get('tokenWhiteListed', id.toString());
        if (record){
            return TokenWhiteListed.create(record as TokenWhiteListedProps);
        }else{
            return;
        }
    }



    static create(record: TokenWhiteListedProps): TokenWhiteListed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new TokenWhiteListed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
