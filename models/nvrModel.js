const mongoose = require("mongoose");

const NvrSchema = new mongoose.Schema(
  {
    Vendor: {
      type: String,
      required: true,
    },
    DeviceType: {
      type: String,
      required: true,
    },
    DeviceCode: {
      type: String,
      required: true,
    },
    Ip: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    LastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NVR", NvrSchema);
