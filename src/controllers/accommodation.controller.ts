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
    // Refactor this later!
    // Request body contains city as a string, eg. "Paris"
    // Check if it already exists
    // If not, create a new destination
    // Then save the city id to the req.body.city information
    // Save the new accommodation.
    // Save the accommodation id to city accommodations array.
    let newAccommodation = new AccommodationModel(req.body);
    await newAccommodation.save()
    res.status(201).send(newAccommodation);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
})
.get("/:id", async (req, res) => {
  try {
    const accommodation = await AccommodationModel.findById(req.params.id)
    res.send(accommodation)
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})
.put("/:id", async (req, res) => {
  try {
    const accommodation = await AccommodationModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(accommodation)
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})
.delete("/:id", async (req,res) => {
  try {
    await AccommodationModel.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
})


export default accommodationRouter;