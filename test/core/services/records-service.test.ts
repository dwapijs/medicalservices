import { RecordsService } from "../../../src/core/services/RecordsService";
import { SendingFacility } from "../../../src/core/model/sending-facility";
import { PatientRecord } from "../../../src/core/model/patient-record";
import { PatientRecordRepository } from "../../../src/infrastructure/patient-record-repository";
import { SendingFacilityRepository } from "../../../src/infrastructure/sending-facility-repository";
import { createConnection } from "typeorm";
import * as fs from "fs";
import { IRecordsService } from "../../../src/core/interfaces/irecords-service";

describe("Records Service", () => {

    const dbPath: string = "test/dwapitest.sqlite3";
    let patientRepository: PatientRecordRepository;
    let facilityRepository: SendingFacilityRepository;
    let service: IRecordsService;
    const facilities = [
        new SendingFacility(1, "FMH")
    ];

    const patients = [
        new PatientRecord("Mary Doe", "F", new Date(1999, 2, 3), facilities[0].facilityCode, "NHIF", "230")
    ];

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
    test("should enroll facility", async () => {
        await service.enrollFacility(facilities[0]);
        const facility = await facilityRepository.get(facilities[0].id);
        expect(facility).not.toBeUndefined();
        console.log(`${facility}`);
    });
    test("should save Patient", async () => {
        await service.savePatient(patients[0]);
        const patient = await patientRepository.get(patients[0].id);
        expect(patient).not.toBeUndefined();
        console.log(`${patient}`);
    });
});