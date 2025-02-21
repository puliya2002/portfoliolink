import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  displayName: { type: String, required: true },
  bio: { type: String, required: true },
  template: { type: String, default: "default" },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: profileSchema,
    // Other fields...
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
