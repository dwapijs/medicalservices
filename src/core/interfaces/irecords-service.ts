import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";
import { PatientDto } from "../dtos/patient-dto";

export interface IRecordsService {
    savePatient(patientDto: PatientDto): Promise<PatientRecord>;
}