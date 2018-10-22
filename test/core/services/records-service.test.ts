import { RecordsService } from "../../../src/core/services/RecordsService";
import { SendingFacility } from "../../../src/core/model/sending-facility";
import { PatientRecord } from "../../../src/core/model/patient-record";
import { PatientRecordRepository } from "../../../src/infrastructure/patient-record-repository";
import { SendingFacilityRepository } from "../../../src/infrastructure/sending-facility-repository";
import { createConnection } from "typeorm";
import * as fs from "fs";
import { IRecordsService } from "../../../src/core/interfaces/irecords-service";
import { PatientVisitRecord } from "../../../src/core/model/patient-visit-record";
import { PatientDto } from "../../../src/core/dtos/patient-dto";

describe("Records Service", () => {

    const dbPath: string = "test/dwapitestA.sqlite3";
    let patientRepository: PatientRecordRepository;
    let facilityRepository: SendingFacilityRepository;
    let service: IRecordsService;

    const patientDto: PatientDto = {
        names: "Mary Doe",
        sex: "F",
        dob: new Date(1999, 2, 3),
        facilityCode: 167,
        facilityName: "KERO",
        idType: "NHIF",
        idNumber: "230",
        visits: [
            {
                visitDate: new Date(2018, 2, 2),
                obsName: "obs",
                obsValue: "22"
            }
        ]
    };


    beforeAll(async () => {

        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("db deleted !");
            }
        );
        const connection = await createConnection({
            logging: true,
            type: "sqlite",
            database: dbPath,
            entities: ["./src/core/model/*.ts"],
            synchronize: true
        });
        patientRepository = new PatientRecordRepository(PatientRecord, connection);
        facilityRepository = new SendingFacilityRepository(SendingFacility, connection);
        service = new RecordsService(facilityRepository, patientRepository);
    });
    test("should save Patient with Facility", async () => {
        const savedPatient = await service.savePatient(patientDto);
        const patient = await patientRepository.get(savedPatient.id);
        const facility = await facilityRepository.getByCode(patient.facilityCode);
        expect(patient).not.toBeUndefined();
        expect(facility).not.toBeUndefined();
        console.log(`${facility} >> ${patient}`);
    });
});