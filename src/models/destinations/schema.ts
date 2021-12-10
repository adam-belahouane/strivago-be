import mongoose from "mongoose"

export const CitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  accommodations: [{type: mongoose.Schema.Types.ObjectId, ref: "accommodation"}]
}, {timestamps: true }) 