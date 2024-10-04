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
const errorHandler = require("./middleware/errorHandler");
const { wssRegister } = require("./controllers/lapiController");
const { handleMessage } = require("./services/websocketMessage");

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
  wssRegister(req, socket, wss)
});

app.use(errorHandler);
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}.`);
});
