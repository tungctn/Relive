const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.search_patient = async (req, res) => {
  const healthID = req.params.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const report = await Report.find({ patient: patient._id })
      .populate("doctor")
      .populate("patient");
    res.status(200).json({ patient, report: report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.get_doctor = async (req, res) => {
  let doctor = req.doctor;
  res.status(200).json({ doctor });
};

module.exports.change_problem = async (req, res) => {
  const { problems } = req.body;
  let upperProblem = problems.upperProblem;
  let lowerProblem = problems.lowerProblem;
  try {
    const patient = await Patient.findOneAndUpdate(
      { healthID: req.params.healthID },
      { upperProblem, lowerProblem },
      { new: true }
    );
    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};
