const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/auth/register", authController.signup);
router.post("/auth/login", authController.login);
router.get("/logout", authController.logout);

// // Protect all routes after this middleware
router.use(authController.protect);

router.get("/user/:id", userController.getUser);
router.put("/user/:id", userController.updateMe);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
