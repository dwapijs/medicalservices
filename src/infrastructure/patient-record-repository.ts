import { PatientRecord } from "../core/model/patient-record";
import { RepositoryBase } from "../../../sharedkernel/src";
import { Service } from "typedi";
import { IPatientRecordRepository } from "../core/interfaces/ipatient-record-repository";

@Service()
export class PatientRecordRepository extends RepositoryBase<PatientRecord> implements IPatientRecordRepository {
}