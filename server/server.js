const express = require("express");
const app = express();

const userRouter = require("../server/router/userRouter.js");
const dansRouter = require("../server/router/dansRouter.js");
const dansTurulRouter = require("../server/router/dansTurulRouter.js");
const tusuwRouter = require("../server/router/tusuwRouter.js");

require("dotenv").config({ path: "../server/config/.env" });
require("../server/config/db.js");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/dans", dansRouter);
app.use("/api/dansTurul", dansTurulRouter);
// Өрх_төсөв
app.use("/api/tusuw", tusuwRouter);

app.listen(9090, "192.168.100.68", () => {
  console.log("port is listening");
});
