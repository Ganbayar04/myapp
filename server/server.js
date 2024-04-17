const express = require("express");
const app = express();
// Админ, хэрэглэгч
const userRouter = require("../server/router/userRouter.js");
// Данс
const dansRouter = require("../server/router/dansRouter.js");
// Данс_төрөл
const dansTurulRouter = require("../server/router/dansTurulRouter.js");
// Өрх_төсөв
const tusuwRouter = require("../server/router/tusuwRouter.js");
// Төлөвлөгөөт орлого
const tuluwluguutOrlogoRouter = require("../server/router/tuluwluguutOrlogoRouter.js");
// төлөвлөгөөт зарлага
const tuluwluguutZarlagaRouter = require("../server/router/tuluwluguutZarlagaRouter.js");
// Орлого_төрөл
const orlogoTurulRouter = require("../server/router/orlogoTurulRouter.js");
// Зарлага_төрөл
const zarlagaTurulRouter = require("../server/router/zarlagaTurulRouter.js");
// Орлого
const orlogoRouter = require("../server/router/orlogoRouter.js");
// Зарлага
const zarlagaRouter = require("../server/router/zarlagaRouter.js");

require("dotenv").config({ path: "../server/config/.env" });
require("../server/config/db.js");

app.use(express.json());

// Админ, хэрэглэгч
app.use("/api/users", userRouter);
// Данс
app.use("/api/dans", dansRouter);
// Данс_төрөл
app.use("/api/dansTurul", dansTurulRouter);
// Өрх_төсөв
app.use("/api/tusuw", tusuwRouter);
// Төлөвлөгөөт орлого
app.use("/api/tuluw", tuluwluguutOrlogoRouter);
// Төлөвлөгөөт зарлага
app.use("/api/tZarlaga", tuluwluguutZarlagaRouter);
// Орлого_төрөл
app.use("/api/oTurul", orlogoTurulRouter);
// Зарлага_төрөл
app.use("/api/zTurul", zarlagaTurulRouter);
// Орлого
app.use("/api/orlogo", orlogoRouter);
// Зарлага
app.use("/api/zarlaga", zarlagaRouter);


app.listen(9090, "192.168.1.5", () => {

  console.log("port is listening");
});
