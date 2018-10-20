import { PatientRecord } from "../core/model/patient-record";
import { RepositoryBase } from "../../../sharedkernel/src";
import { IPatientRecordRepository } from "../core/interfaces/ipatient-record-repository";
import { Service } from "typedi";
@Service()
export class PatientRecordRepository extends RepositoryBase<PatientRecord> implements IPatientRecordRepository {
}