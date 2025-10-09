const express = require("express");
const router = express.Router();
const { ping } = require("../controllers/public.controller");

router.get("/ping", ping);

module.exports = router;
