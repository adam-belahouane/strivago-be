
import createHttpError from "http-errors";
import {UserSchema} from "../models/users/schema"
import  UserModel  from "../models/users/model";
import { verifyJWT } from "./tools.js";


export const JWTAuthMiddleware = async (req:any, res:any, next:any) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(401, "Please provide credentials in Authorization header")
    );
  } else {
    try {

      const token = req.headers.authorization.replace("Bearer ", "");


      const decodedToken:any = await verifyJWT(token);

      console.log("DECODED TOKEN ", decodedToken);

      const user =  await UserModel.findById(decodedToken._id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found!"));
      }
    } catch (error) {
      next(createHttpError(401, "Token not valid!"));
    }
  }
};