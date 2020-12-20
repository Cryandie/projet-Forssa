const Feedback = require("../Models/Feedback");

const getProfileFeedbacks = async (req, res) => {
  const id = req.params.profileId;
  try {
    const feedbacks = await Feedback.find({ profile: id });
    return res.status(200).json({ feedbacks: feedbacks });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createFeedback = async (req, res) => {
  const profileId = req.params.profileId;

  const newFeed = new Feedback({
    user: req.user.user.id,
    profile: profileId,
    content: req.body.content,
    rating: req.body.rating,
  });
  try {
    const savedFeed = await newFeed.save();
    return res.status(200).json({ savedFeed: savedFeed });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const updateFeedback = async (req, res) => {
  const id = req.params.feedbackId;
  try {
    const dataToUpdate = req.body;
    const { ...updateData } = dataToUpdate;

    const updatedFeedback = await Feedback.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log(updatedFeedback);
    return res.status(200).json({ updatedFeedback: updatedFeedback });
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports.updateFeedback = updateFeedback;
module.exports.createFeedback = createFeedback;
module.exports.getProfileFeedbacks = getProfileFeedbacks;
