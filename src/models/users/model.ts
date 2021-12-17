import mongoose from "mongoose";
import { UserSchema } from "./schema";
import User from "../../types/IUsers"
const UserModel = mongoose.model<User>("city", UserSchema);

export default UserModel;