const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/authCheck", authController.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "working..",
  });
});

module.exports = router;
