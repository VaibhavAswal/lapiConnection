const axios = require("axios");

const LAPI_REGISTER = "/LAPI/V1.0/System/UpServer/Register";
const LAPI_KEEPALIVE = "/LAPI/V1.0/System/UpServer/Keepalive";
const LAPI_UNREGISTER = "/LAPI/V1.0/System/UpServer/Unregister";
const LIVES = 60;

const nvrConnections = new Map();
const acadeIDCseq = new Map();
let client;
function updateRTSPUrl(responseObj, username, password, newIp) {
  // Extract the current RTSP URL from the response object
  const currentUrl = responseObj?.Data?.URL;
  console.log("local ip url :" + currentUrl);

  // Find the part of the URL after the IP and port (after ":554")
  const pathIndex = currentUrl?.indexOf(":554/");
  const path = currentUrl?.substring(pathIndex + 5); // Extract everything after ":554/"

  // Construct the new RTSP URL with username, password, and new IP
  const newUrl = `rtsp://${username}:${password}@${newIp}:554/${path}`;

  return newUrl;
}

// Function to convert time to Unix timestamp with 6.5-hour delta
function getUnixTimestamp(dateTimeStr, delay = 0, deltaHours = 0) {
  // Parse the date-time string (assumes format 'YYYY-MM-DD HH:mm:ss ±HHmm')
  const date = new Date(dateTimeStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date-time format");
  }

  // Convert deltaHours to seconds
  const deltaInSeconds = deltaHours * 3600;

  // Calculate the Unix timestamp with adjustments
  const adjustedTimeInSeconds =
    Math.floor(date.getTime() / 1000) + deltaInSeconds + delay;

  return adjustedTimeInSeconds;
}

exports.sendMsg = (msg, ip) => {
  const nvrWs = nvrConnections.get(ip);
  console.log(msg);
  if (nvrWs) {
    // nvrWs.send(JSON.stringify(msg));
    const acadID = msg.academy_id;
    newCseq = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    acadeIDCseq.set(newCseq, {
      academyId: acadID,
      streaming_setting_id: msg.streaming_setting_id,
      password: msg.nvr_password,
      username: msg.nvr_user_name,
      schedular_id: msg.schedular_id,
    });
    console.log("sending request to nvr: " + ip);
    const startTimestamp = getUnixTimestamp(
      (dateTimeStr = msg.time.start),
      (delay = msg.delay)
    );
    const endTimestamp = getUnixTimestamp(
      (dateTimeStr = msg.time.end),
      (delay = msg.delay)
    );
    const formattedMsg = {
      RequestURL: `/LAPI/V1.0/Channels/${msg.channel.trim()}/Media/Video/Streams/RecordURL?Begin=${startTimestamp}&End=${endTimestamp}&Types=Normal&RelationOfTypes=AND&Position=Local&SessionID=123456&TransType=HTTP`,
      Method: "GET",
      Cseq: newCseq,
      Data: {},
    };
    nvrWs.send(JSON.stringify(formattedMsg));
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

  nvrConnections.set(clientIP.split(":").pop(), ws);
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    const uri = data.RequestURL;
    Cseq = data.Cseq;
    if (!data.isClient) {
      if (uri === LAPI_KEEPALIVE) {
        // Processing of requests for preservation of live
        handleKeepAlive(ws, data);
      } else if (uri === LAPI_UNREGISTER) {
        console.log(clientIP + "Device Disconnect");
        // Processing of write-off requests
      } else {
        if (acadeIDCseq.has(Cseq)) {
          const reqData = acadeIDCseq.get(data.Cseq);
          console.log(
            "url: https://staging-api-v1.techatplay.ai/external/manage_analytics"
          );
          console.log({
            streamUrl: updateRTSPUrl(
              data,
              reqData.username,
              reqData.password,
              clientIP.split(":").pop()
            ),
            academy_id: reqData.academyId,
            streaming_setting_id: reqData.streaming_setting_id,
            schedular_id: reqData.schedular_id,
          });
          axios
            .post(
              "https://staging-api-v1.techatplay.ai/external/manage_analytics",
              {
                streamUrl: updateRTSPUrl(
                  data,
                  reqData.username,
                  reqData.password,
                  clientIP.split(":").pop()
                ),
                academy_id: reqData.academyId,
                streaming_setting_id: reqData.streaming_setting_id,
                schedular_id: reqData.schedular_id,
              }
            )
            .then((res) => {
              console.log(`axios response status code: ${res.statusCode}`);
              // console.log(res);
            })
            .catch((error) => {
              console.error(error?.message);
            });
          console.log(
            "Stream url :",
            updateRTSPUrl(
              data,
              reqData.username,
              reqData.password,
              clientIP.split(":").pop()
            )
          );
          acadeIDCseq.delete(data.Cseq);
        } else {
          if (client) {
            client.send(JSON.stringify(data));
          }
          // console.log(JSON.stringify(data));
        }
      }
    } else {
      if (client !== ws) {
        client = ws;
      }
      nvr = nvrConnections.get(data.ip);
      if (!nvr) {
        ws.send(JSON.stringify("NVR with IP " + data.ip + " is not online."));
        return;
      }
      console.log(data.data);
      console.log("sending to " + data.ip);
      nvr.send(JSON.stringify(data.data));
    }
  });

  ws.on("close", async () => {
    console.log("The client disconnects:" + clientIP.split(":").pop() + "\n");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

exports.changeCameraAngle = (channel, ip, preset) => {
  const nvrWs = nvrConnections.get(ip);
  if (nvrWs) {
    const formattedMsg = {
      RequestURL: `/LAPI/V1.0/Channels/${channel}/PTZ/Presets/${preset}/Goto`,
      Method: "PUT",
      Cseq: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      Data: {},
    };
    nvrWs.send(JSON.stringify(formattedMsg));
    return true;
  } else {
    console.log("NVR with IP " + ip + " is not online.");
    return false;
  }
};
