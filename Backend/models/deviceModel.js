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
  image: {
    type: String,
    required: [true, "Please select a image"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
