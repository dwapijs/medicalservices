import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity, OneToMany } from "typeorm";
import { PatientVisitRecord } from "./patient-visit-record";

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
}