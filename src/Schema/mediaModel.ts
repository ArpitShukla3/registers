import { Schema, model, Types } from "mongoose";
import { IUser } from "../Schema/UserModel"; // Import the IUser interface

const mediaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});
mediaSchema.index({ user: 1 });
mediaSchema.pre("save", function (next) {
  this.updated = new Date();
  next();
});

const Media = model("Media", mediaSchema);

export default Media;
