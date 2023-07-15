const Location = require("../models/locationModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllLocations = catchAsync(async (req, res, next) => {
  let filter = {};

  const features = new APIFeatures(Location.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const locations = await features.query;
  let count = new APIFeatures(Location.find(filter), req.query)
    .filter()
    .sort()
    .limitFields();
  // .paginate();
  let totalCount = await count.query.countDocuments();

  res.status(200).json({
    status: "success",
    message: `${locations.length} locations found..`,
    results: locations.length,
    totalCount,
    locations,
  });
});

exports.getOneLocation = catchAsync(async (req, res, next) => {
  let location = await Location.findById(req.params.id).populate("devices");
  // console.log(location);
  // console.log(location.devices);

  if (!location) {
    return next(new AppError("No location found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "found the document...",
    location,
    devices: location.devices,
  });
});

exports.createOneLocation = catchAsync(async (req, res, next) => {
  req.body.createdAt = req.requestTime;

  const location = await Location.create(req.body);

  if (!location) {
    return next(new AppError("There was a error creating a location", 500));
  }

  res.status(200).json({
    status: "success",
    message: "location created successfully..",
    location,
  });
});

exports.updateOneLocation = catchAsync(async (req, res, next) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!location) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "location updated sucessfuly..",
    location,
  });
});

exports.deleteOneLocation = catchAsync(async (req, res, next) => {
  const location = await Location.findByIdAndDelete(req.params.id);

  if (!location) {
    return next(new AppError("No location found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "location deleted sucessfully..",
  });
});

exports.hospitalNameId = catchAsync(async (req, res, next) => {
  const doc = await Hospital.find({}).select({ name: 1, _id: 1 });

  if (doc) {
    res.status(200).json({
      status: "success",
      message: `${doc.length} documents found...`,
      results: doc.length,
      doc,
    });
  }
});

exports.locationNameId = catchAsync(async (req, res, next) => {
  const doc = await Location.find({}).select({ locationName: 1, _id: 1 });

  if (doc) {
    res.status(200).json({
      status: "success",
      message: `${doc.length} documents found...`,
      results: doc.length,
      doc,
    });
  }
});
