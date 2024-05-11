
const express = require("express")
const subscribeController = require("../controllers/subscribeController");
const router = express.Router();




router.get("/",  subscribeController.getSubscription);
router.post("/add/:newsletterId", subscribeController.subscribeTo);
router.delete("/:subscriptionId", subscribeController.deleteSubscription);

module.exports = router;
