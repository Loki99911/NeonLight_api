const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/authContr");
const { validateBody, authenticate, upload } = require("../../middlewars");
const {
  loginSchemaJoi,
} = require("../../models/user");

router.post("/login", validateBody(loginSchemaJoi), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
// router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
