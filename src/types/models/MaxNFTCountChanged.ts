// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type MaxNFTCountChangedProps = Omit<MaxNFTCountChanged, NonNullable<FunctionPropertyNames<MaxNFTCountChanged>>>;

export class MaxNFTCountChanged implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public newMaxNFTCount: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save MaxNFTCountChanged entity without an ID");
        await store.set('maxNFTCountChanged', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove MaxNFTCountChanged entity without an ID");
        await store.remove('maxNFTCountChanged', id.toString());
    }

    static async get(id:string): Promise<MaxNFTCountChanged | undefined>{
        assert((id !== null && id !== undefined), "Cannot get MaxNFTCountChanged entity without an ID");
        const record = await store.get('maxNFTCountChanged', id.toString());
        if (record){
            return MaxNFTCountChanged.create(record as MaxNFTCountChangedProps);
        }else{
            return;
        }
    }



    static create(record: MaxNFTCountChangedProps): MaxNFTCountChanged {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new MaxNFTCountChanged(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
