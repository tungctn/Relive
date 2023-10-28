const { Router } = require("express");
const {
  add_exercise,
  get_exercise,
  get_all_exercise,
} = require("../controllers/exerciseController");
const router = Router();

router.post("/addexercise", add_exercise);
router.get("/getexercise/:exerciseID", get_exercise);
router.get("/getallexercise", get_all_exercise);

module.exports = router;
