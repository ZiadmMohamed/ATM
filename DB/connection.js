import mongoose from "mongoose";

const connectionDb = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/ATM")
    .then(() => {
      console.log("DataBase connected");
    })
    .catch((err) => {
      console.log({ msg: "catch error in DataBase connecting", err });
    });
};
export default connectionDb;
