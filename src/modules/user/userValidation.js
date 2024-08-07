import Joi from "joi";

export const signUpValidation = {
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    password: Joi.string(),
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.string().valid(Joi.ref("password")),
  }).options({ presence: "required" }),
};

export const signInValidation = {
  body: Joi.object({
    password: Joi.string(),
    username: Joi.string(),
  }).options({ presence: "required" }),
};
