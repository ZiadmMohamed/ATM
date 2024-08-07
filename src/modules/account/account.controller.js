import accountModel from "../../../DB/models/account.model.js";
import TransactionModel from "../../../DB/models/transactions.model.js";
import AppError from "../../utilis/errorClass.js";

export const createAccount = async (req, res, next) => {
  const user = req.user;
  const acount = await accountModel.findOne({ userId: user._id });
  if (acount) throw new AppError("you already have an account");

  const newAcount = await accountModel.create({ userId: user._id });

  return res.status(200).json({ msg: "done", newAcount });
};

export const deposit = async (req, res, next) => {
  const { amount } = req.body;
  const user = req.user;
  const acountExist = await accountModel.findOne({ userId: user._id });
  if (!acountExist) throw new AppError("you don't have an account");

  const acount = await accountModel.updateOne(
    { userId: user._id },
    { $inc: { balance: amount } }
  );

  await TransactionModel.create({
    userId: user._id,
    amount,
    type: "deposit",
  });

  return res.status(200).json({ msg: "done", acount });
};

export const withdraw = async (req, res, next) => {
  const { amount } = req.body;
  const user = req.user;
  const accountExist = await accountModel.findOne({ userId: user._id });
  if (!accountExist) throw new AppError("you don't have an account");

  if (accountExist.balance < amount) throw new AppError("Insufficient balance");
  const acount = await accountModel.updateOne(
    { userId: user._id },
    { $inc: { balance: -amount } }
  );

  await TransactionModel.create({
    userId: user._id,
    amount,
    type: "withdraw",
  });

  return res.status(200).json({ msg: "done", acount });
};
export const checkBalance = async (req, res, next) => {
  const user = req.user;
  const account = await accountModel.findOne({ userId: user._id });
  if (!account) throw new AppError("you don't have an account");

  return res.status(200).json({ msg: "done", balance: account.balance });
};

export const Transactions = async (req, res, next) => {
  const user = req.user;
  const transactions = await TransactionModel.find({ userId: user._id });

  if (!transactions.length) {
    return res.status(400).json({ msg: "You don't have any transactions" });
  }

  return res.status(200).json({ msg: "Done", transactions });
};
