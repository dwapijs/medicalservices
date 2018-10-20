import { RepositoryBase } from "../../../sharedkernel/src";
import { ISendingFacilityRepository } from "../core/interfaces/isending-facility-repository";
import { SendingFacility } from "../core/model/sending-facility";

export class SendingFacilityRepository extends RepositoryBase<SendingFacility> implements ISendingFacilityRepository {
}