import jwt from "jsonwebtoken";
import IUser from "../types/IUsers";

export const JWTAuthenticate = async (user: IUser) => {
  const accessToken = await generateJWTToken({ _id: user._id });

  return { accessToken };
};

const generateJWTToken = (payload: any) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyJWT = (token: string) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );
