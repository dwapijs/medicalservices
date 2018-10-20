import { PatientRecord } from "../core/model/patient-record";
import { RepositoryBase } from "../../../sharedkernel/src";
import { IPatientRecordRepository } from "../core/interfaces/ipatient-record-repository";

export class PatientRecordRepository extends RepositoryBase<PatientRecord> implements IPatientRecordRepository {
}