import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    unique: true,
  },

  password: { type: String, required: true },

  isLoggedIn: { type: Boolean, default: false },
});

const User = model("User", userSchema);

export default User;
