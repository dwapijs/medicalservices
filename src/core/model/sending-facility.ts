import { AggregateRoot } from "../../../../sharedkernel/src";
import { Column, Entity } from "typeorm";

@Entity()
export class SendingFacility extends AggregateRoot {
    @Column()
    facilityCode: number;
    @Column()
    facilityName: string;
}