import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: false,
      lowercase: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: false,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

