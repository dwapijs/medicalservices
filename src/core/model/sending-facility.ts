import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity } from "typeorm";

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

    toString(): string {
        return `${this.facilityCode}-{this.facilityName}`;
    }
}