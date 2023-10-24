const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.add_report = async (req, res) => {
  const { healthID, doctor, advice } = req.body;
  try {
    const patient = await Patient.findOne({ healthID });
    const newReport = await Report.create({
      patient: patient._id,
      doctor,
      advice,
    })
    //   .populate("patient")
    //   .populate("doctor");
    res.status(200).json({ newReport });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong..." });
  }
};

module.exports.get_report = async (req, res) => {
  const doctorID = req.params.doctorID;
  const patientID = req.params.patientID;
  try {
    const report = await Report.findOne({
      doctor: doctorID,
      patient: patientID,
    })
      .populate("patient")
      .populate("doctor");
    res.status(200).json({ report });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};
