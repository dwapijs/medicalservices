import { SendingFacility } from "../model/sending-facility";
import { IRepositoryBase } from "../../../../sharedkernel/src";
import { Service } from "typedi";

export interface ISendingFacilityRepository extends IRepositoryBase<SendingFacility> {
    getByCode(code: number): Promise<SendingFacility>;
    createIfNotExisits(facility: SendingFacility): Promise<SendingFacility>;
}