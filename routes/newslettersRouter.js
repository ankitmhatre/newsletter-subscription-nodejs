
const express = require("express")
const newsletterController = require("../controllers/newslettersController");
const router = express.Router();




router.get("/", newsletterController.getAll);
router.get("/search", newsletterController.findByFilters);
router.post("/add", newsletterController.createOne);
router.delete("/:id", newsletterController.deleteOne);

module.exports = router;
