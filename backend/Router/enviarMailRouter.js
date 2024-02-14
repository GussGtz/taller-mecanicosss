const express = require("express");
const enviarMail = require("../Controllers/enviarMail");
const router = express.Router();

router.post("/", enviarMail.enviarMail);

module.exports = router;
