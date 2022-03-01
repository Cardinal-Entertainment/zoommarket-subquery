// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ZoomBurnFeeChangedProps = Omit<ZoomBurnFeeChanged, NonNullable<FunctionPropertyNames<ZoomBurnFeeChanged>>>;

export class ZoomBurnFeeChanged implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public newZoomBurnFee: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomBurnFeeChanged entity without an ID");
        await store.set('zoomBurnFeeChanged', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomBurnFeeChanged entity without an ID");
        await store.remove('zoomBurnFeeChanged', id.toString());
    }

    static async get(id:string): Promise<ZoomBurnFeeChanged | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomBurnFeeChanged entity without an ID");
        const record = await store.get('zoomBurnFeeChanged', id.toString());
        if (record){
            return ZoomBurnFeeChanged.create(record as ZoomBurnFeeChangedProps);
        }else{
            return;
        }
    }



    static create(record: ZoomBurnFeeChangedProps): ZoomBurnFeeChanged {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ZoomBurnFeeChanged(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
