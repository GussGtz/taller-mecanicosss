const express = require("express");
const login = require("../Controllers/login");
const router = express.Router();

router.post("/login", login.login);

module.exports = router;
