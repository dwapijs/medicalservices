import { Request, Response } from "express";
import { IRecordsService } from "../core/interfaces/irecords-service";
import { RecordsService } from "../core/services/RecordsService";
import { Container } from "typedi";
import { Runtime } from "inspector";


export let index = async (req: Request, res: Response) => {
    res.send("Patient Home");
};
export let postPatient = async (req: Request, res: Response) => {
    const service: IRecordsService = Container.get(RecordsService);
    console.log(service);
    await service.savePatient(req.body);
    res.send("Recivied");
};