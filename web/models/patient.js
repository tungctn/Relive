const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isMobilePhone } = require("validator");
const prescriptionSchema = require("./prescription");
const res = require("express/lib/response");

const patientSchema = new mongoose.Schema({
  healthID: {
    type: String,
  },
  name: {
    firstName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    middleName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    surName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
  },
  dob: {
    type: Date,
    required: [true, "Please enter Date of Birth"],
  },
  mobile: {
    type: String,
    required: [true, "Please enter Mobile Number"],
    minlength: [10, "Please Enter a valid Mobile Number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    validate: [isEmail, "Please Enter a valid Email"],
  },
  address: {
    address: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    city: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    district: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    pincode: {
      type: Number,
      min: [100000, "Please enter a valid pincode"],
      max: [999999, "Please enter a valid pincode"],
      required: [true, "Please enter complete Address"],
    },
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "Minimum length of password should must be 8 characters"],
  },
  upperProblem: [
    {
      problem: {
        type: String,
      },
      level: {
        type: Number,
      },
    },
  ],
  lowerProblem: [
    {
      problem: {
        type: String,
      },
      level: {
        type: Number,
      },
    },
  ],
  
  prescriptions: [prescriptionSchema],
});

patientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

patientSchema.statics.login = async function (healthID, password) {
  const patient = await this.findOne({ healthID });
  if (!healthID) {
    throw Error("Please enter HealthId");
  }
  if (patient) {
    const auth = await bcrypt.compare(password, patient.password);
    if (auth) {
      return patient;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid HealthID");
};

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
