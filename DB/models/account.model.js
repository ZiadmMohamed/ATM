import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: Number, default: 0 },
});

const accountModel = model("Account", accountSchema);

export default accountModel;
