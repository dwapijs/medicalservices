import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity, OneToMany } from "typeorm";
import { PatientVisitRecord } from "./patient-visit-record";
import { PatientDto } from "../dtos/patient-dto";

@Entity()
export class PatientRecord extends AggregateRoot {
    @Column()
    names: string;
    @Column()
    sex: string;
    @Column()
    dob: Date;
    @Column()
    facilityCode: number;
    @Column()
    idType: string;
    @Column()
    idNumber: string;
    @OneToMany(type => PatientVisitRecord, v => v.patient, {cascade: true, eager: true})
    visits: PatientVisitRecord[];

    constructor(names: string, sex: string, dob: Date, facilityCode: number, idType: string, idNumber: string) {
        super();
        this.names = names;
        this.sex = sex;
        this.dob = dob;
        this.facilityCode = facilityCode;
        this.idType = idType;
        this.idNumber = idNumber;
    }

    static createFromDto(patientDto: PatientDto): PatientRecord {
        return new PatientRecord(
            patientDto.names, patientDto.sex, patientDto.dob,
            patientDto.facilityCode, patientDto.idType, patientDto.idNumber
        );
    }

    addVisit(visit: PatientVisitRecord) {
        if (!this.visits) {
            this.visits = [];
        }
        this.visits.push(visit);
    }

    toString() {
        return `${this.names},${this.sex}`;
    }
}