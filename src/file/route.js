const express = require("express");
const { create, find } = require("./service");
const router = express.Router();
const multer = require("multer");

// Create a multer instance with the storage engine
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", find);
router.post("/", upload.single("file"), create);

module.exports = router;
