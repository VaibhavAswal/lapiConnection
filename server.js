const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const lapiRoute = require("./routes/lapiRoute");
const errorHandler = require("./middleware/errorHandler");
const { wssRegister } = require("./controllers/lapiController");
const { handleMessage, sendMsg } = require("./services/websocketMessage");
const { userRegister } = require("./controllers/userController");
const { tryCatch } = require("./utils/tryCatch");

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


//routes
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
  wssRegister(req, socket, wss);
  userRegister(req, socket, wss);
});

app.use(
  "/startanalytics",
  tryCatch(async (req, res) => {
    const data = req.body;
    const result = sendMsg(data, data.nvr_ip);

    if (result){
      res.status(200).json({
        message: "Analytics started."
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
