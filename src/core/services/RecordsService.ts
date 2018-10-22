import { IRecordsService } from "../interfaces/irecords-service";
import { SendingFacility } from "../model/sending-facility";
import { PatientRecord } from "../model/patient-record";
import { ISendingFacilityRepository } from "../interfaces/isending-facility-repository";
import { IPatientRecordRepository } from "../interfaces/ipatient-record-repository";
import { Service } from "typedi";
import { PatientDto } from "../dtos/patient-dto";

@Service()
export class RecordsService implements IRecordsService {

    facilityRepository: ISendingFacilityRepository;
    patientRepository: IPatientRecordRepository;

    constructor(faciltyRepository: ISendingFacilityRepository, patientRepository: IPatientRecordRepository) {
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