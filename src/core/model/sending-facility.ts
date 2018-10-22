import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity } from "typeorm";
import { PatientDto } from "../dtos/patient-dto";

@Entity()
export class SendingFacility extends AggregateRoot {
    @Column()
    facilityCode: number;
    @Column()
    facilityName: string;

    constructor(facilityCode: number, facilityName: string) {
        super();
        this.facilityCode = facilityCode;
        this.facilityName = facilityName;
    }

    static createFromDto(patientDto: PatientDto): SendingFacility {
        return new SendingFacility(patientDto.facilityCode, patientDto.facilityName);
    }

    toString(): string {
        return `${this.facilityCode}-${this.facilityName}`;
    }
}