const url = require("url");

exports.userRegister = (req, socket, wss) => {
    const parsedUrl = url.parse(req.url, true);
    const uri = parsedUrl.pathname;
    if (uri === "/chats") {
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit("connection", ws, req);
      });
      console.log("User connected");
    }
  };