import mongoose from "mongoose"


/* 
An Accommodation entry has a name, a short description, a maxGuests number, and is located in a city.
*/

export const AccommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  city: { type: String, required: true},
}, {timestamps: true }) 
