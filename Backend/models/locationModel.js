const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: [true, "Please enter a name"],
  },
  address: {
    type: String,
    required: [true, "Please enter a address"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a phone number"],
  },

  // devices: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Device",
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

locationSchema.virtual("devices", {
  ref: "Device",
  foreignField: "location",
  localField: "_id",
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
