import { Router } from "express";
import {
  checkBalance,
  createAccount,
  deposit,
  Transactions,
  withdraw,
} from "./account.controller.js";
import { handle } from "../../utilis/asyncHandler.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { depositValidation } from "./ACCOUNTvALIDATION.js";

const router = Router();

router.post(
  "/deposit",
  validation(depositValidation),
  handle(auth),
  handle(deposit)
);
router.get(
  "/withdraw",
  validation(depositValidation),
  handle(auth),
  handle(withdraw)
);
router.post("/", handle(auth), handle(createAccount));
router.get("/Balance", handle(auth), handle(checkBalance));
router.get("/Transactions", handle(auth), handle(Transactions));

export default router;
