import mongoose from "mongoose"
import { AccommodationSchema } from "./schema"
import Accommodation from "../../types/IAccommodation";

const AccommodationModel = mongoose.model<Accommodation>("accommodation", AccommodationSchema);

export default AccommodationModel