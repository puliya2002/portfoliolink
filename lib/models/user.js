import mongoose, { Schema, models } from "mongoose";
import { type } from "os";

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
  picture:String,
  tagline: String,
  about: String,
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

const socialSchema = new Schema({
  facebook: String,
  instagram: String,
  linkedin: String,
  github: String
});

const statsSchema = new Schema({
  title: String,
  value: String
});

const projectSchema = new Schema({
  title: String,
  description: String,
  link: String,
  technologies: [String],
  coverPhoto: String,
  screenshot: String
  // createdAt: { type: Date, default: Date.now },
});

const experienceSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date
});

const educationSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
});

const skillSchema = new Schema({
  name: String,
  proficiency: {
    type: Number,
    default: 75, // Default proficiency level (75%)
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    default: "technical",
    enum: ["technical", "soft", "language", "tool", "framework", "other"],
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

    setup: {
      type: setupSchema,
      default: () => ({}), // Ensures setup is initialized with default values
    },
    profile: profileSchema,
    social: socialSchema,
    stats: [statsSchema],
    project: [projectSchema],
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],

    theme: {
      type: String,
      default: "dark",
    },

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
    setDefaultsOnInsert: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
