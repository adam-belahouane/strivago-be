import {ObjectId} from "mongoose";

export default interface City {
  _id: ObjectId
  name: string
}