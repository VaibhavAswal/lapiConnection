const Nvr = require("../models/nvrModel");
const Chat = require("../models/chatModel");

const LAPI_REGISTER = "/LAPI/V1.0/System/UpServer/Register";
const LAPI_KEEPALIVE = "/LAPI/V1.0/System/UpServer/Keepalive";
const LAPI_UNREGISTER = "/LAPI/V1.0/System/UpServer/Unregister";
const LIVES = 60;

const nvrConnections = new Map();

function handleKeepAlive(ws, data, clientIP) {
  const websocketRsp = {
    ResponseURL: data.RequestURL,
    ResponseCode: 0,
    ResponseString: "Succeed",
    Cseq: data.Cseq,
    Data: {
      Timeout: LIVES,
      Timestamp: Math.floor(Date.now() / 1000),
    },
  };

  const msg = JSON.stringify(websocketRsp);
  ws.send(msg);
}

exports.handleMessage = async (ws, req) => {
  const clientIP = req.connection.remoteAddress;
  console.log(clientIP + "is now online and Connected to system");

  const nvr = await Nvr.findOne({ Ip: clientIP });
  if (nvr) {
    nvrConnections.set(clientIP, ws);
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      const uri = data.RequestURL;

      if (uri === LAPI_KEEPALIVE) {
        // Processing of requests for preservation of live
        handleKeepAlive(ws, data, clientIP);
      } else if (uri === LAPI_UNREGISTER) {
        console.log(clientIP + "Device Disconnect");
        await Nvr.findOneAndUpdate({ Ip: clientIP }, { Status: "Offline" });
        // Processing of write-off requests
      } else {
        // Handling other messages
        //   console.log("Message received:" + JSON.stringify(data));
        const chat = new Chat({
          message: data,
          ip: clientIP,
          sender: "nvr",
          status: "processing",
        });
        await chat.save();
      }
    });

    ws.on("close", async () => {
      console.log("The client disconnects:" + clientIP + "\n");
      await Nvr.findOneAndUpdate({ Ip: clientIP }, { Status: "Offline" });
    });
  } else {
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      const nvrIp = data.deviceIp;

      // Retrieve the WebSocket connection for the specific NVR IP
      const nvrWs = nvrConnections.get(nvrIp);
      if (nvrWs) {
        nvrWs.send(JSON.stringify(data.message)); // Send message to specific NVR
        console.log(data.message);
        const chat = new Chat({
          message: data.message,
          ip: nvrIp,
          sender: "server",
          status: "done",
        });
        await chat.save();
        return;
      } else {
        ws.send(
          JSON.stringify({
            message: "NVR with IP " + nvrIp + " is not online.",
            type: "error",
          })
        );
      }
    });
    ws.on("close", () => {
      console.log("User disconnects:" + clientIP + "\n");
    });
  }

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};
