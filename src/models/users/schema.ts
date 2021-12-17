import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "guest", enum: ["guest", "host"] },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPw = newUser.password;
  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPw, 10);
    newUser.password = hash;
  }
  next();
});

UserSchema.methods.toJSON = function () {

  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

UserSchema.statics.checkCredentials = async function (email, plainPw) {
    const user = await this.findOne({ email })
  
    if (user) {
      const isMatch = await bcrypt.compare(plainPw, user.password)
      if (isMatch) {
        return user
      } else {
        return null
      }
    } else {
      return null 
    }
  }