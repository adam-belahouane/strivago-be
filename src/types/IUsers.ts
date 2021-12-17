import {ObjectId} from "mongoose";

export default interface User {
    email: string,
    password: string,
    role: string,
    _id: ObjectId,
  }