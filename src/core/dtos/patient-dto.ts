import { PatientVisitDto } from "./patient-visit-dto";

export interface PatientDto {
    names: string;
    sex: string;
    dob: Date;
    facilityCode: number;
    facilityName: string;
    idType: string;
    idNumber: string;
    visits: PatientVisitDto[];
}