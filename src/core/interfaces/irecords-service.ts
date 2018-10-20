import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";

export interface IRecordsService {
    enrollFacility(facility: SendingFacility): Promise<SendingFacility>;
    savePatient(patient: PatientRecord): Promise<PatientRecord>;
}