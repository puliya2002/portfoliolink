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

const setupSchema = new Schema({
  project: {
    type: Boolean,
    default: true,
  },
  skills: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: Boolean,
    default: false,
  },
  education: {
    type: Boolean,
    default: false,
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
    setup: setupSchema,

    currentstep: {
      type: Number,
      default: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
