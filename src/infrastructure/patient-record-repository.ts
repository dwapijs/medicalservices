import { PatientRecord } from "../core/model/patient-record";
import { RepositoryBase } from "../../../sharedkernel/src";
import { Service } from "typedi";
import { IPatientRecordRepository } from "../core/interfaces/ipatient-record-repository";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Connection } from "typeorm";
import { SendingFacility } from "../core/model/sending-facility";

@Service()
export class PatientRecordRepository extends RepositoryBase<PatientRecord> implements IPatientRecordRepository {
    constructor(@InjectConnection() connection: Connection) {
        super(PatientRecord, connection);
    }
}