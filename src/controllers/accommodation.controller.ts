import express from "express";
import AccommodationModel from "../models/accommodation/model";

const accommodationRouter = express.Router();

accommodationRouter
.get("/", async (req,res) => {
  try {
    let accommodations = await AccommodationModel.find();
    res.send(accommodations);
  } catch (error) {
    console.log(error);
    res.send(404);
  }
})
//.post()
//

export default accommodationRouter;