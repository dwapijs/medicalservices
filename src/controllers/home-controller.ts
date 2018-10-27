import { Request, Response } from "express";

export let index = async (req: Request, res: Response) => {
    res.send("Hellooo");
};