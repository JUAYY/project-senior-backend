const express = require("express");
const { findOneById, find, create, update, remove } = require("./service");
const router = express.Router();

router.post("/", create);

router.get("/", find);
router.get("/:id", findOneById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
