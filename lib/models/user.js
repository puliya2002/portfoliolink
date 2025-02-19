import mongoose, { Schema, models } from "mongoose";

const profileSchema = new Schema({
  username: { type: String, unique: true, sparse: true },
  displayName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: profileSchema,

    currentstep: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
