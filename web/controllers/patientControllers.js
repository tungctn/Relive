const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

module.exports.preview_prescription = async (req, res) => {
  const id = req.params.id;
  const healthID = req.patient.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;
  res.status(200).json({ patient });
};

module.exports.get_patient_id = async (req, res) => {
  let petientID = req.params.patientID;
  const patient = await Patient.findOne({ _id: petientID }).populate(
    "exercise"
  );
  const advices = await Report.find({ patient: petientID })
    .populate("doctor")
    .populate("patient");

  res.status(200).json({ patient, advices });
};

module.exports.get_all_doctor = async (req, res) => {
  const doctors = await Doctor.find({});
  res.status(200).json({ doctors });
};
