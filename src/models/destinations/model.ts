import mongoose from "mongoose";
import { CitySchema } from "./schema";
import City from "../../types/ICity";

const CityModel = mongoose.model<City>("city", CitySchema);

export default CityModel;