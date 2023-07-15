const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/locationNameId", locationController.locationNameId);

router
  .route("/")
  .get(locationController.getAllLocations)
  .post(locationController.createOneLocation);

router
  .route("/:id")
  .get(locationController.getOneLocation)
  .patch(locationController.updateOneLocation)
  .delete(locationController.deleteOneLocation);

module.exports = router;
