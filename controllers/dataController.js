const Nvr = require("../models/nvrModel");
const Chat = require("../models/chatModel");
const { tryCatch } = require("../utils/tryCatch");
// const { sendMsg } = require("../server");

exports.getChats = tryCatch(async (req, res) => {
  const nvrList = await Nvr.find();

  const list = [];
  // fetch last message from each chat
  for (const nvr of nvrList) {
    const chat = await Chat.findOne({ ip: nvr.Ip }).sort({ createdAt: -1 });
    const allchat = await Chat.find({ ip: nvr.Ip });
    list.push({
      nvr,
      lastMessage: chat,
      allchat: allchat,
    });
  }

  res.status(200).json({
    message: "NVR list fetched successfully.",
    list,
  });
});

exports.startAnalytics = tryCatch(async (req, res) => {
  const data = req.body;
  console.log(data);
  const nvr = await Nvr.findOne({ Ip: data.ip });
  
  // sendMsg(JSON.stringify(data));

  if (!nvr) {
    res.status(404).json({
      message: "NVR not found.",
    });
    return;
  }

  res.status(200).json({
    message: "Analytics started.",
    chat,
  });
});
