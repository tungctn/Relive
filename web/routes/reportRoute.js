const { Router } = require("express");

const router = Router();

const { add_report, get_report } = require("../controllers/reportControllers");

router.post("/addreport", add_report);
router.get("/getreport/:doctorID/patientID", get_report);

module.exports = router;
