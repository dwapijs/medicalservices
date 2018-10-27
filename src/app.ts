import express from "express";
import * as homeController from "./controllers/home-controller";

const app = express();

app.get("/", homeController.index);

export default app;