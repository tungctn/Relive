const Exercise = require("../models/exercise");

module.exports.add_exercise = async (req, res) => {
  const { title, video, specialCondition, upperproblem, lowerproblem } =
    req.body;
  try {
    const exercise = await Exercise.create({
      ...req.body,
    });
    res.status(200).json({ exercise });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.get_exercise = async (req, res) => {
  const exerciseID = req.params.exerciseID;
  try {
    const exercise = await Exercise.findOne({ _id: exerciseID });
    res.status(200).json({ exercise });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};
