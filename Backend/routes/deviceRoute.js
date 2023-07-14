const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const authController = require("../controllers/authControllers");

router.use("/image/:imageName", deviceController.getImage);

router
  .route("/")
  .get(deviceController.getAllDevices)
  .post(
    authController.protect,
    deviceController.uploadDeviceImages,
    deviceController.resizeDeviceImages,
    deviceController.createOneDevice
  );

router
  .route("/:id")
  .get(deviceController.getOneDevice)
  .patch(deviceController.updateOneDevice)
  .delete(deviceController.deleteOneDevice);

module.exports = router;
