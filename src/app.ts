import express from "express";
import cors from "cors";
// Router imports here

const app = express();

app.use(express.json());
app.use(cors());

// Routes

// accommodation seems to be the only route for us needed.
//app.use("/accommodation")

export { app }