import { PatientRecord } from "../model/patient-record";
import { IRepositoryBase } from "../../../../sharedkernel/src";

export interface IPatientRecordRepository extends IRepositoryBase<PatientRecord> {
}