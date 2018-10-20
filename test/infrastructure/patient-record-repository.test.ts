import "reflect-metadata";
import { createConnection } from "typeorm";
import * as fs from "fs";
import { PatientRecordRepository } from "../../src/infrastructure/patient-record-repository";
import { PatientRecord } from "../../src/core/model/patient-record";
import { SendingFacility } from "../../src/core/model/sending-facility";
import { PatientVisitRecord } from "../../src/core/model/patient-visit-record";
import { SendingFacilityRepository } from "../../src/infrastructure/sending-facility-repository";
import { IPatientRecordRepository } from "../../src/core/interfaces/ipatient-record-repository";
import { ISendingFacilityRepository } from "../../src/core/interfaces/isending-facility-repository";
import { Container } from "typedi";

describe("Patient Record Repository", () => {
    const dbPath: string = "test/dwapitest.sqlite3";
    let patientRepository: IPatientRecordRepository;
    let facilityRepository: ISendingFacilityRepository;

    const facilities = [
        new SendingFacility(1, "FMH"),
        new SendingFacility(2, "KKK")
    ];

    const patients = [
        new PatientRecord("Mary Doe", "F", new Date(1999, 2, 3), facilities[0].facilityCode, "NHIF", "230"),
        new PatientRecord("John Doe", "M", new Date(1969, 5, 14), facilities[0].facilityCode, "NHIF", "88093-02"),
        new PatientRecord("Barry Doe", "M", new Date(1988, 1, 23), facilities[1].facilityCode, "NHIF", "5635-0"),
        new PatientRecord("Kean John", "M", new Date(2003, 0, 13), facilities[1].facilityCode, "NHIF", "11-3334")
    ];

    const visits = [
        new PatientVisitRecord(new Date(2018, 1, 1), "Height", "50cm", patients[0]),
        new PatientVisitRecord(new Date(2018, 1, 2), "Height", "51cm", patients[0]),
        new PatientVisitRecord(new Date(2018, 1, 3), "Height", "88cm", patients[1]),
        new PatientVisitRecord(new Date(2018, 1, 4), "Height", "89cm", patients[1]),
        new PatientVisitRecord(new Date(2018, 1, 5), "Height", "73cm", patients[2]),
        new PatientVisitRecord(new Date(2018, 1, 6), "Height", "74cm", patients[2]),
        new PatientVisitRecord(new Date(2018, 1, 7), "Height", "89cm", patients[3])
    ];

    patients[0].addVisit(visits[0]);
    patients[0].addVisit(visits[1]);
    patients[1].addVisit(visits[2]);
    patients[1].addVisit(visits[3]);
    patients[2].addVisit(visits[4]);
    patients[2].addVisit(visits[5]);
    patients[3].addVisit(visits[6]);

    beforeAll(async () => {
        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("db deleted !");
            }
        );
        const connection = await createConnection({
            logging: false,
            type: "sqlite",
            database: dbPath,
            entities: ["./src/core/model/*.ts"],
            synchronize: true
        });
        facilityRepository = Container.get(SendingFacilityRepository);

        await new SendingFacilityRepository(SendingFacility, connection).createBatch(facilities);
        patientRepository = new PatientRecordRepository(PatientRecord, connection);
        await patientRepository.createBatch(patients);
    });

    test("should load patient with Visits", async () => {
        const patientRecord = await patientRepository.get(patients[0].id);
        expect(patientRecord.visits.length > 0);
        console.log(`${patientRecord}`);
        patientRecord.visits.forEach((f) => console.log(`> ${f}`));
    });
});