
const express = require("express")
const newsletterController = require("../controllers/newslettersController");
const router = express.Router();




router.get("/", newsletterController.getAll);
router.post("/add", newsletterController.createOne);
router.delete("/:id", newsletterController.deleteOne);

module.exports = router;
