import express from "express";
import createHttpError from "http-errors";
import  UserModel  from "../models/users/model";
import { JWTAuthenticate } from "../auth/tools.js";
import AccommodationModel from "../models/accommodation/model";
import { JWTAuthMiddleware } from "../auth/token.js";
import { hostOnlyMiddleware } from "../auth/host";
import bcrypt from "bcrypt"

const usersRouter = express.Router();

const checkCredentials = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    const accessToken = await JWTAuthenticate(newUser);
    res.send({ ...newUser.toObject(), accessToken });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req:any, res:any, next:any) => {
  try {
    const { email, password } = req.body

    const user = await checkCredentials(email, password);

    if (user) {
      const accessToken = await JWTAuthenticate(user);

      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  "/me/accomodation",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req:any, res, next) => {
    try {
      console.log(req.user._id.toString());
      const accomodations = await AccommodationModel.find({
        host: req.user._id.toString(),
      });

      res.status(200).send(accomodations);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;