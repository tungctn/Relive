const { Router } = require("express");
const {
  preview_prescription,
  get_patient,
  get_patient_id,
  get_all_doctor,
} = require("../controllers/patientControllers");
const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");
const router = Router();

router.get("/prescription/:id", requirePatientAuth, preview_prescription);
router.get("/getpatient", requirePatientAuth, get_patient);
router.get("/getpatient/:patientID", get_patient_id);
router.get("/getalldoctor", get_all_doctor);

module.exports = router;
