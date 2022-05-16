const express = require("express");
const router = express.Router();
const logoutControllers = require("./controllers/logout.controllers");

router.get("/", logoutControllers.logout);

module.exports = router;
