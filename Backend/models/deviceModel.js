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
  location: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      // required: [true, "Device must belong to a Location"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
