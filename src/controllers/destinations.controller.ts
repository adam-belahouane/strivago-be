import express from "express";
import AccommodationModel from "../models/accommodation/model";
import CityModel from "../models/destinations/model";


const destinationsRouter = express.Router();

destinationsRouter
.get("/", async(req,res) => {
  try {
    const results = await CityModel.find().populate({path: "accommodations"})
    res.send(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
})
.post("/", async (req,res) => {
  try {
    const newCity = new CityModel(req.body);
    await newCity.save();
    res.send(newCity);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    // Send meaningful error back if city already exists
  }
})

.get("/:cityId", async (req,res) => {
  // Consider if url could contain the city by name
  // Just handle the find accordingly then, eg. {name: "Paris"}
  try {
    const result = await CityModel.findById(req.params.cityId).populate({path: "accommodations"})

    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
})

export default destinationsRouter;