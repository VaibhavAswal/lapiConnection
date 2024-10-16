const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const authRoute = require("./routes/authRoute");
const lapiRoute = require("./routes/lapiRoute");
const dataRoute = require("./routes/dataRoute");
const errorHandler = require("./middleware/errorHandler");
const { wssRegister } = require("./controllers/lapiController");
const { handleMessage, sendMsg } = require("./services/websocketMessage");
const { userRegister } = require("./controllers/authController");
const { tryCatch } = require("./utils/tryCatch");
const nvrModel = require("./models/nvrModel");

require("dotenv").config();

app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const connectDb = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING).catch((err) => {
    console.log(
      `Failed to connect to mongo on startup - retrying in 5 sec\n${err}`
    );
    setTimeout(connectDb, 5000);
  });
};

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Lost MongoDB connection Retrying...");
});

connectDb();

//routes
app.use("/auth", authRoute);
app.use("/LAPI/V1.0", lapiRoute);
app.use("/data", dataRoute);

// websocket server
wss = new WebSocketServer({ server: app });
wss.on("connection", (ws, req) => {
  handleMessage(ws, req);
});

function onSocketError(err) {
  console.error(err);
}
server.on("upgrade", function upgrade(req, socket, head) {
  socket.on("error", onSocketError);
  socket.removeListener("error", onSocketError);
  wssRegister(req, socket, wss);
  userRegister(req, socket, wss);
});

app.use(
  "/startanalytics",
  tryCatch(async (req, res) => {
    const data = req.body;
    console.log(data);
    const nvr = await nvrModel.findOne({ Ip: data.ip });

    if (!nvr) {
      res.status(404).json({
        message: "NVR not found.",
      });
      return;
    }

    const result = sendMsg(JSON.stringify(data), data.ip);

    if (result){
      res.status(200).json({
        message: "Analytics started.",
        chat,
      });
    } else {
      res.status(503).json({
        message: "Camera not online.",
      });
    }
  })
);

app.use(errorHandler);
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}.`);
});
