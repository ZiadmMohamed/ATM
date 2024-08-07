import jwt from "jsonwebtoken";
import User from "../../../DB/models/user.model.js";
import AppError from "../../utilis/errorClass.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  if (!password) {
    return next(new AppError("Passwords  are missing", 400));
  }
  const user = await User.findOne({ username: username.toLowerCase() });
  user && new AppError("user is already exist");

  const hash = bcrypt.hashSync(password, 8);
  const newUser = await User.create({
    username,
    password: hash,
  });
  newUser
    ? res.status(200).json({ msg: "done", newUser })
    : new AppError("user not created");
};

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AppError("email or password isn't correct");
  }

  await User.updateOne({ username }, { isLoggedIn: true });

  const token = jwt.sign({ username }, "user");
  return res.status(200).json({ msg: "done", token: token });
};
