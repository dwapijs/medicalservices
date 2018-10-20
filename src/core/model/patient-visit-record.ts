import { EntityBase } from "../../../../sharedkernel/src";
import { Entity, ManyToOne } from "typeorm";
import { Column } from "typeorm/browser";
import { PatientRecord } from "./patient-record";

@Entity()
export class PatientVisitRecord extends EntityBase {
    @Column()
    visitDate: Date;
    @Column()
    obsName: string;
    @Column()
    obsValue: string;
    @ManyToOne(type => PatientRecord, p => p.visits)
    patient: PatientRecord;
}