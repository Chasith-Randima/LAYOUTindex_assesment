const Device = require("../models/deviceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image Please upload only an image..", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadDeviceImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeDeviceImages = catchAsync(async (req, res, next) => {
  console.log(!req.files.images);
  if (!req.files.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `device-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/devices/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;

  let options = {
    root: path.join(__dirname, "../public/img/devices"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.getAllDevices = catchAsync(async (req, res, next) => {
  let filter = {};

  const features = new APIFeatures(Device.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const devices = await features.query;
  let count = new APIFeatures(Device.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let totalCount = await count.query.countDocuments();

  res.status(200).json({
    status: "success",
    message: `${devices.length} devices found..`,
    results: devices.length,
    totalCount,
    devices,
  });
});

exports.getOneDevice = catchAsync(async (req, res, next) => {
  let device = await Device.findById(req.params.id);

  if (!device) {
    return next(new AppError("No device found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "found the device...",
    device,
  });
});

exports.createOneDevice = catchAsync(async (req, res, next) => {
  req.body.createdAt = req.requestTime;

  const device = await Device.create(req.body);

  if (!device) {
    return next(new AppError("There was a error creating a device", 500));
  }

  res.status(200).json({
    status: "success",
    message: "device created successfully..",
    device,
  });
});

exports.updateOneDevice = catchAsync(async (req, res, next) => {
  const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!device) {
    return next(new AppError("No device found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "device updated sucessfuly..",
    device,
  });
});

exports.deleteOneDevice = catchAsync(async (req, res, next) => {
  const device = await Device.findByIdAndDelete(req.params.id);

  if (!device) {
    return next(new AppError("No device found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "device deleted sucessfully..",
  });
});
