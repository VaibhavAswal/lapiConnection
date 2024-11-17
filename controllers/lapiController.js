const { tryCatch } = require("../utils/tryCatch");
const crypto = require("crypto");

const LAPI_REGISTER = "/LAPI/V1.0/System/UpServer/Register";
const LAPI_KEEPALIVE = "/LAPI/V1.0/System/UpServer/Keepalive";
const LAPI_UNREGISTER = "/LAPI/V1.0/System/UpServer/Unregister";
const url = require("url");

// Calculate the nonce value. nonce is used for authentication.
function getNonce() {
  return (Math.random() * new Date().getTime()).toFixed(0);
}

// Generating HMAC-SHA256 signatures
function generateHmacSHA256(data, secret) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64");
}

exports.register = tryCatch(async (req, res) => {
  const { Vendor, DeviceType, DeviceCode, Algorithm, Nonce, Cnonce, Sign } =
    req.query;
  if (!Vendor || !DeviceType || !DeviceCode || !Algorithm || !Nonce || !Sign) {
    const nonce = getNonce();
    const response = {
      Nonce: nonce,
    };
    res.status(401).json(response);
    return;
  }
  const decodedUrl = decodeURIComponent(Sign)
    .replace(/\+/g, " ")
    .replace(/ /g, "+");
  const pstr = `${Vendor}/${DeviceType}/${DeviceCode}/${Algorithm}/${Nonce}`;
  const serverSign = generateHmacSHA256(pstr, process.env.LAPI_SECRET);
  if (serverSign !== decodedUrl) {
    console.log("Authentication failure:" + serverSign);
    const response = {
      Nonce: getNonce(),
    };

    // res.writeHead(401, {
    //   "Content-Type": "application/json; charset=UTF-8",
    // });
    // res.end(JSON.stringify(response));
    res.status(401).json(response);
    return;
  }
  const response = {
    Cnonce: Cnonce,
    Resign: serverSign,
  };
});

exports.wssRegister = async (req, socket, wss) => {
  const parsedUrl = url.parse(req.url, true);
  const uri = parsedUrl.pathname;
  const query = parsedUrl.query;
  const clientIP = req.connection.remoteAddress;
  if (req.method === "GET" && uri === LAPI_REGISTER) {
    console.log(parsedUrl.query);
    const Vendor = query.Vendor;
    const DeviceType = query.DeviceType;
    const DeviceCode = query.DeviceCode;
    const Algorithm = query.Algorithm;
    const Nonce = query.Nonce;
    const Cnonce = query.Cnonce || "";
    const Sign = query.Sign;
    if (
      !Vendor ||
      !DeviceType ||
      !DeviceCode ||
      !Algorithm ||
      !Nonce ||
      !Sign
    ) {
      console.log(clientIP.split(":").pop() + " " + "Trying to register...");
      const nonce = getNonce();
      const response = {
        Nonce: nonce,
      };
      socket.write(
        "HTTP/1.1 401 Unauthorized\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" +
          JSON.stringify(response)
      );
      socket.destroy();
      return;
    } else {
      const decodedUrl = decodeURIComponent(Sign)
        .replace(/\+/g, " ")
        .replace(/ /g, "+");
      const pstr = `${Vendor}/${DeviceType}/${DeviceCode}/${Algorithm}/${Nonce}`;
      const serverSign = generateHmacSHA256(pstr, process.env.LAPI_SECRET);
      // console.log(serverSign, decodedUrl);
      //  having signature issue until then it is false
      if (serverSign !== decodedUrl) {
        console.log("Authentication failure:" + " " + clientIP);
        const response = {
          Nonce: getNonce(),
        };
        socket.write(
          "HTTP/1.1 401 Unauthorized\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" +
            JSON.stringify(response)
        );
        socket.destroy();
        return;
      } else {
        console.log(clientIP.split(":").pop() + " " + "Authentication Success");
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
          wss.emit("connection", ws, req);
        });
      }
    }
  }
};
