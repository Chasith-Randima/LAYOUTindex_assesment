const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, "Please add the serial number"],
  },
  type: {
    type: String,
    enum: ["pos", "kisok", "signage"],
    required: [true, "Please sadd a type"],
  },
  images: [String],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
