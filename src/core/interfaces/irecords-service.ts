import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";
import { PatientDto } from "../dtos/patient-dto";
import { Service } from "typedi";

export interface IRecordsService {
    savePatient(patientDto: PatientDto): Promise<PatientRecord>;
}