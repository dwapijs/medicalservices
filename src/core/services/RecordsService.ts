import { IRecordsService } from "../interfaces/irecords-service";
import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";
import { Inject, Service } from "typedi";
import { PatientDto } from "../dtos/patient-dto";
import { PatientRecordRepository } from "../../infrastructure/patient-record-repository";
import { SendingFacilityRepository } from "../../infrastructure/sending-facility-repository";

@Service()
export class RecordsService implements IRecordsService {

    facilityRepository: SendingFacilityRepository;
    patientRepository: PatientRecordRepository;

    constructor(faciltyRepository: SendingFacilityRepository, patientRepository: PatientRecordRepository) {
        this.facilityRepository = faciltyRepository;
        this.patientRepository = patientRepository;
    }

    async savePatient(patientDto: PatientDto): Promise<PatientRecord> {
        const patient = PatientRecord.createFromDto(patientDto);
        const facility = SendingFacility.createFromDto(patientDto);
        await this.facilityRepository.createIfNotExisits(facility);
        return this.patientRepository.create(patient);
    }
}