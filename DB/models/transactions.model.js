import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "withdraw"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;
