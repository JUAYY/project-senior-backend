const express = require("express");
const { find, create, findOneById, update, remove } = require("./service");
const router = express.Router();

router.get("/", find);
router.get("/:id", findOneById);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
