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
    res.sendStatus(404);
  }
})
.post("/", async (req, res)=>{
  try {
    console.log("the request body is", req.body)
    let newAccommodation = new AccommodationModel(req.body)
    await newAccommodation.save()
    res.status(201).send(newAccommodation);
    
   
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
})


export default accommodationRouter;