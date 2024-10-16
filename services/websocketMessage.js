const Nvr = require("../models/nvrModel");
const Chat = require("../models/chatModel");

const LAPI_REGISTER = "/LAPI/V1.0/System/UpServer/Register";
const LAPI_KEEPALIVE = "/LAPI/V1.0/System/UpServer/Keepalive";
const LAPI_UNREGISTER = "/LAPI/V1.0/System/UpServer/Unregister";
const LIVES = 60;

const nvrConnections = new Map();
let client;

// Function to convert time to Unix timestamp
function getUnixTimestamp(dateStr, timeStr) {
  const date = new Date(dateStr); // Parse the date
  const [time, modifier] = timeStr.split(" "); // Split time and AM/PM
  let [hours, minutes] = time.split(":").map(Number);

  // Adjust hours based on AM/PM
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Set the hours and minutes in the date object
  date.setHours(hours, minutes, 0, 0);

  // Return the Unix timestamp in seconds
  return Math.floor(date.getTime() / 1000);
}

exports.sendMsg = (msg, ip) => {
  const nvrWs = nvrConnections.get(ip);
  if (nvrWs) {
    // nvrWs.send(JSON.stringify(msg));
    console.log("sending request to nvr: " + ip);
    const startTimestamp = getUnixTimestamp(msg.date, msg.time.start);
    const endTimestamp = getUnixTimestamp(msg.date, msg.time.end);
    const formattedMsg = {
      RequestURL:
        `/LAPI/V1.0/Channels/1/Media/Video/Streams/RecordURL?Begin=${startTimestamp}&End=${endTimestamp}&Types=Normal&RelationOfTypes=AND&Position=Local&SessionID=123456&TransType=HTTP`,
      Method: "GET",
      Cseq: 1,
      Data: {},
    };
    nvrWs.send(formattedMsg);
    return true;
  } else {
    console.log("NVR with IP " + ip + " is not online.");
    return false;
  }
};

function handleKeepAlive(ws, data) {
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
  console.log(
    clientIP.split(":").pop() + "is now online and Connected to system"
  );

  const nvr = await Nvr.findOne({ Ip: clientIP.split(":").pop() });
  if (nvr) {
    nvrConnections.set(clientIP.split(":").pop(), ws);
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      const uri = data.RequestURL;

      if (uri === LAPI_KEEPALIVE) {
        // Processing of requests for preservation of live
        handleKeepAlive(ws, data);
      } else if (uri === LAPI_UNREGISTER) {
        console.log(clientIP + "Device Disconnect");
        await Nvr.findOneAndUpdate(
          { Ip: clientIP.split(":").pop() },
          { Status: "Offline" }
        );
        // Processing of write-off requests
      } else {
        // Handling other messages
        //   console.log("Message received:" + JSON.stringify(data));
        // const chat = new Chat({
        //   message: data,
        //   ip: clientIP.split(':').pop(),
        //   sender: "nvr",
        //   status: "processing",
        // });
        // await chat.save();
        // client.send(JSON.stringify(message));
        console.log("Message received:" + JSON.stringify(data));
      }
    });

    ws.on("close", async () => {
      console.log("The client disconnects:" + clientIP.split(":").pop() + "\n");
      await Nvr.findOneAndUpdate(
        { Ip: clientIP.split(":").pop() },
        { Status: "Offline" }
      );
    });
  } else {
    client = ws;
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      const nvrIp = data.deviceIp;

      // Retrieve the WebSocket connection for the specific NVR IP
      const nvrWs = nvrConnections.get(nvrIp);
      if (nvrWs) {
        nvrWs.send(JSON.stringify(data.message)); // Send message to specific NVR
        // const chat = new Chat({
        //   message: data.message,
        //   ip: nvrIp,
        //   sender: "server",
        //   status: "done",
        // });
        // await chat.save();
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
      console.log("User disconnects:" + clientIP.split(":").pop() + "\n");
    });
  }

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};
