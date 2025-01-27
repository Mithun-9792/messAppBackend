const express = require("express");
const router = express.Router();
const {
  getNearbyMess,
  viewMenu,
  register,
  login,
  updateUser,
} = require("../controllers/user");
const { tokenDecodeMiddleware } = require("../middlwares/auth");

router.get("/nearby-mess", getNearbyMess);
router.get("/menu/:messId", viewMenu);
router.post("/register", register);
router.post("/login", login);
router.put("/updateUser", tokenDecodeMiddleware, updateUser);

module.exports = router;
