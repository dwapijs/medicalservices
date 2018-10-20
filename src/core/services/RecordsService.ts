import { IRecordsService } from "../interfaces/irecords-service";
import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";
import { ISendingFacilityRepository } from "../interfaces/isending-facility-repository";
import { IPatientRecordRepository } from "../interfaces/ipatient-record-repository";
import { Service } from "typedi";

@Service()
export class RecordsService implements IRecordsService {

    facilityRepository: ISendingFacilityRepository;
    patientRepository: IPatientRecordRepository;

    constructor(faciltyRepository: ISendingFacilityRepository, patientRepository: IPatientRecordRepository) {
        this.facilityRepository = faciltyRepository;
        this.patientRepository = patientRepository;
    }

    enrollFacility(facility: SendingFacility): Promise<SendingFacility> {
        return this.facilityRepository.create(facility);
    }

    savePatient(patient: PatientRecord): Promise<PatientRecord> {
        return this.patientRepository.create(patient);
    }
}