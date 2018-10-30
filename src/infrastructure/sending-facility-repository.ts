import { RepositoryBase } from "../../../sharedkernel/src";
import { ISendingFacilityRepository } from "../core/interfaces/isending-facility-repository";
import { SendingFacility } from "../core/model/sending-facility";
import { Service } from "typedi";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Connection } from "typeorm";


@Service()
export class SendingFacilityRepository extends RepositoryBase<SendingFacility> implements ISendingFacilityRepository {

    constructor(@InjectConnection() connection: Connection) {
        super(SendingFacility, connection);
    }

    async createIfNotExisits(facility: SendingFacility): Promise<SendingFacility> {
        console.log(facility);
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