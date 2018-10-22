import { RepositoryBase } from "../../../sharedkernel/src";
import { ISendingFacilityRepository } from "../core/interfaces/isending-facility-repository";
import { SendingFacility } from "../core/model/sending-facility";
import { Service } from "typedi";

@Service()
export class SendingFacilityRepository extends RepositoryBase<SendingFacility> implements ISendingFacilityRepository {
    async createIfNotExisits(facility: SendingFacility): Promise<SendingFacility> {
        const exisiting = await this.getByCode(facility.facilityCode);
        if (exisiting) {
            return exisiting;
        }
        return super.create(facility);
    }

    getByCode(code: number): Promise<SendingFacility> {
        return this.connection.manager.findOne(SendingFacility, {
            where: {
                facilityCode: code
            }
        });
    }
}