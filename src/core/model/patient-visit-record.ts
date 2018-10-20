import { EntityBase } from "../../../../sharedkernel/src";
import { Entity, ManyToOne, Column } from "typeorm";
import { PatientRecord } from "./patient-record";
import moment = require("moment");

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

    constructor(visitDate: Date, obsName: string, obsValue: string, patient: PatientRecord) {
        super();
        this.visitDate = visitDate;
        this.obsName = obsName;
        this.obsValue = obsValue;
        this.patient = patient;
    }

    toString() {
        return `${this.obsName}[${this.obsValue}],${moment(this.visitDate).format("Do MMM YYYY")}`;
    }
}