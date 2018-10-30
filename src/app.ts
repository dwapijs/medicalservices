import "reflect-metadata";
import express from "express";
import * as homeController from "./controllers/home-controller";
import * as patienController from "./controllers/patient-controller";
import bodyParser from "body-parser";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typedi";


export let connection: Connection;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

useContainer(Container);
createConnection().then(async c => {
    connection = c;
    console.log(`connected successfully ${connection.name}`);
}).catch(error => console.log("TypeORM connection error: ", error));

app.get("/", homeController.index);

app.get("/patient", patienController.index);
app.post("/patient", patienController.postPatient);

export default app;