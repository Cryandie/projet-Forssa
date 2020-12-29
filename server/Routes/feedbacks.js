const router = require("express").Router();
const feedbackControllers = require("../controllers/feedback.controller");
const auth = require("../Middleware/auth");
const feedOwner = require("../Middleware/feedOwner");
router.get(
  "/:profileId/feedbacks",
  auth,
  feedbackControllers.getProfileFeedbacks
);
router.post("/:profileId/create", auth, feedbackControllers.createFeedback);
router.put("/:feedbackId/update", auth, feedbackControllers.updateFeedback);
// feedOwner,
module.exports = router;
