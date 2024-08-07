import { Router } from "express";
import { signIn, signUp } from "./user.controller.js";
import { validation } from "../../middleware/validation.js";
import { signInValidation, signUpValidation } from "./userValidation.js";
import { handle } from "../../utilis/asyncHandler.js";


const router = Router();
router.post("/logIn", validation(signInValidation), handle(signIn));
router.post("/", validation(signUpValidation), handle(signUp));


export default router;
