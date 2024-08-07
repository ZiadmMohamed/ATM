import jwt from "jsonwebtoken";
import AppError from "../utilis/errorClass.js";
import User from "../../DB/models/user.model.js";

const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) throw new AppError("token not found");

  const decoded = jwt.verify(token, "user");
  const user = await User.findOne({
    email: decoded.email,
    isLoggedIn: true,
  });

  if (!user) throw new AppError("user not found");

  req.user = user;
  next();
};

export default auth;
