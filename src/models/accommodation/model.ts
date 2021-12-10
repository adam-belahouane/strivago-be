import mongoose from "mongoose"
import { AccommodationSchema } from "./schema"

const AccommodationModel = mongoose.model("accommodation", AccommodationSchema);

export default AccommodationModel