const express = require("express");
const app = express();

const userRouter = require("../server/router/userRouter.js");
const dansRouter = require("../server/router/dansRouter.js");
const dansTurulRouter = require("../server/router/dansTurulRouter.js");
const tusuwRouter = require("../server/router/tusuwRouter.js");
// Төлөвлөгөөт орлого
const tuluwluguutOrlogoRouter = require("../server/router/tuluwluguutOrlogoRouter.js");
// төлөвлөгөөт зарлага
const tuluwluguutZarlagaRouter = require("../server/router/tuluwluguutZarlagaRouter.js");
// Орлого_төрөл
const orlogoTurulRouter = require("../server/router/orlogoTurulRouter.js");

require("dotenv").config({ path: "../server/config/.env" });
require("../server/config/db.js");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/dans", dansRouter);
app.use("/api/dansTurul", dansTurulRouter);
// Өрх_төсөв
app.use("/api/tusuw", tusuwRouter);
// Төлөвлөгөөт орлого
app.use("/api/tuluw", tuluwluguutOrlogoRouter);
// Төлөвлөгөөт зарлага
app.use("/api/tZarlaga", tuluwluguutZarlagaRouter);
// Орлого_төрөл
app.use("/api/oTurul", orlogoTurulRouter);

app.listen(9090, "192.168.1.229", () => {
  console.log("port is listening");
});
