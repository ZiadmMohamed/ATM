import express from "express";
import userRouter from "./src/modules/user/user.routes.js";
import accountRouter from "./src/modules/account/account.routes.js";

import connectionDb from "./DB/connection.js";
import AppError from "./src/utilis/errorClass.js";

const app = express();
const port = 3000;
app.use(express.json());

connectionDb();

app.use("/user", userRouter);
app.use("/account", accountRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("*", (req, res, next) => {
  next(new AppError(`invalid url  : ${req.originalUrl}`, 404));
});
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ msg: `Catch error: ${err.message}` });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
