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

describe("Sending Facility Repository", () => {
    const dbPath: string = "test/dwapitestC.sqlite3";
    let facilityRepository: ISendingFacilityRepository;

    const facilities = [
        new SendingFacility(1, "FMH"),
        new SendingFacility(2, "KKK")
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
            logging: false,
            type: "sqlite",
            database: dbPath,
            entities: ["./src/core/model/*.ts"],
            synchronize: true
        });
        facilityRepository = new SendingFacilityRepository(SendingFacility, connection);
        await facilityRepository.create(facilities[0]);
    });

    test("should get facility by Code", async () => {
        const newFacility = await facilityRepository.getByCode(1);
        expect(newFacility).not.toBeUndefined();
        console.log(newFacility);
    });

    test("should create New facility if not exists", async () => {
        await facilityRepository.createIfNotExisits(facilities[1]);
        const newFacility = await facilityRepository.get(facilities[1].id);
        expect(newFacility).not.toBeUndefined();
        expect(newFacility.facilityCode === 2);
        console.log(newFacility);
    });
});