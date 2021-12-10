import express from "express";
import cors from "cors";
// Router imports here
import accommodationRouter from "./controllers/accommodation.controller";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/accommodation", accommodationRouter)
// app.use("/destinations", router)

export { app }