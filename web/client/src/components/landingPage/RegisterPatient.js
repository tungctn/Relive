import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import { useNavigate } from "react-router-dom";
import Reactloading from "react-loading";

export default function Register(props) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: {},
    address: {},
    contactPerson: { address: {} },
  });
  const [upperproblemlist, setupperproblemlist] = useState([{ problem: "", level: "" }]);
  const [lowerproblemlist, setlowerproblemlist] = useState([{ problem: "", level: "" }]);
  const [passwordError, setPasswordError] = useState("");
  const addupperproblem = () => {
    const upperproblemlist1 = [...upperproblemlist];
    upperproblemlist1.push({ problem: "", level: "" });
    setupperproblemlist(upperproblemlist1);
  };

  const addlowerproblem = () => {
    const lowerproblemlist1 = [...lowerproblemlist];
    lowerproblemlist1.push({ lowerproblem: "", level: "" });
    setlowerproblemlist(lowerproblemlist1);
  }

  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    dob: "",
    mobile: "",
    email: "",
    bloodGroup: "",
    address: {
      address: "",
      city: "",
      district: "",
      pincode: "",
    },
    password: "",
    upperProblem: upperproblemlist,
    lowerProblem: lowerproblemlist,
    contactPerson: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
    },
  });

  useEffect(() => {
    const auth = async () => {
      const res = await fetch("/auth");
      const data = await res.json();
      if (data.msg === "Doctor login Found") {
        navigate("/doctor/dashboard");
      }
      if (data.msg === "Admin login Found") {
        navigate("/admin/dashboard");
      }
      if (data.msg === "Patient login Found") {
        navigate("/patient/dashboard");
      }
    };
    auth();
  });

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (patient.password === confirmPassword) {
      setloading(true);
      e.preventDefault();
      const res = await fetch("/register/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });

      const data = await res.json();

      if (data.errors) {
        setloading(false);
        setErrors(data.errors);
        props.settoastCondition({
          status: "error",
          message: "Please Enter al fields correctly!",
        });
        props.setToastShow(true);
      } else {
        setloading(false);
        props.settoastCondition({
          status: "success",
          message: "Your Registration done Successfuly!",
        });
        props.setToastShow(true);
        navigate("/patient/dashboard");
      }
    } else {
      setPasswordError("Password Doesn't Matches");
    }
  };
  return (
    <div className="body overflow-hidden">
      <Navbar></Navbar>
      <div className="bg-secoundry w-ful">
        <div className="">
          <div className=" flex justify-center mt-10">
            <h1 className="p-2 px-8 rounded font-plusExtraBold text-5xl">Register</h1>
          </div>

          <form
            className="font-plus lg:ml-60  lg:px-8 lg:py-4 bg-white shadow-lg rounded max-w-screen-lg mt-8 mb-4 "
            onSubmit={handleRegisterPatient}
          >
            <div className="flex mt-2 bg-bgsecondary w-fit justify-between rounded mx-auto">
              <button
                onClick={() => setToggle("Patient")}
                className={
                  Toggle === "Patient"
                    ? "py-2 px-8 mr-2 text-lg font-plusBold text-white cursor-pointer rounded-xl bg-primary"
                    : "py-2 px-8 mr-2 text-lg font-plusBold cursor-pointer rounded-xl bg-bgsecondary"
                }
              >
                Patient
              </button>
              <button
                onClick={() => setToggle("Doctor")}
                className={
                  Toggle === "Doctor"
                    ? "py-2 px-8 text-lg font-plusBold font-semibold cursor-pointer rounded-xl bg-primary"
                    : "py-2 px-8 text-lg font-plusBold font-semibold cursor-pointer rounded-xl bg-bgsecondary"
                }
              >
                Doctor
              </button>
            </div>
            <div
              className={
                Toggle === "Doctor"
                  ? "h-96 p-2 flex flex-col justify-center "
                  : "hidden"
              }
            >
              <h1 className="font-bold flex justify-center mt-6">
                For register as doctor contact to admin with you all information
              </h1>
              <div className="border-4 p-4 mx-auto w-1/2 rounded-xl mt-8  ">
                <h1>send your all information</h1>
                <div>
                  <div className=" rounded-xl p-4 mt-4 ">
                    <h1 className="font-bold">Email:</h1>
                    <p>reliveadmin@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="lg:grid lg:grid-cols-4 lg:gap-2 mt-4 mr-4 grid grid-cols-4 gap-2">
                <label className="font-bold lg:text-xl font-plus px-4 my-4 pt-2">
                  Name
                </label>
                <div>
                  <input
                    className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                    required
                    placeholder="first name"
                    value={patient.name.firstName}
                    onChange={(e) => {
                      let temppatient = { ...patient };
                      temppatient.name.firstName = e.target.value;
                      setPatient(temppatient);
                    }}
                  ></input>
                </div>
                <input
                  className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                  required
                  placeholder="middle name"
                  value={patient.name.middleName}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.name.middleName = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
                <input
                  className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                  required
                  placeholder="last name"
                  value={patient.name.surName}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.name.surName = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 pt-2">Birthdate</label>
                <input
                  type="date"
                  className=" bg-blue-100 lg:h-10 rounded pl-4 h-8"
                  required
                  value={patient.dob}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.dob = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 pt-2">
                  Mobile No.{" "}
                </label>

                <input
                  type="tel"
                  placeholder="mobile no."
                  required
                  className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                  value={patient.mobile}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.mobile = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
              </div>


              <div className="grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4  pt-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g : abcdefg@gmail.com"
                  required
                  className="bg-blue-100 lg:h-10 rounded pl-4 col-span-2 h-8"
                  value={patient.email}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.email = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
                <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1 pt-2">
                  Address
                </label>
                <div className="w-full grid grid-cols-1 col-span-2">
                  <input
                      type="text"
                      className="bg-blue-100 lg:h-10 rounded pl-4 h-8 mb-3"
                      required
                      placeholder="Full address"
                      value={patient.address.address}
                      onChange={(e) => {
                        let temppatient = { ...patient };
                        temppatient.address.address = e.target.value;
                        setPatient(temppatient);
                      }}
                    ></input>
                <div className="grid grid-cols-2 lg:gap-8 gap-2 col-span-3 mb-4">
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="City"
                    value={patient.address.city}
                    onChange={(e) => {
                      let temppatient = { ...patient };
                      temppatient.address.city = e.target.value;
                      setPatient(temppatient);
                    }}
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="District"
                    value={patient.address.district}
                    onChange={(e) => {
                      let temppatient = { ...patient };
                      temppatient.address.district = e.target.value;
                      setPatient(temppatient);
                    }}
                  ></input>
                  
                </div>
                <div className="grid grid-cols-2 lg:gap-8 gap-2 col-span-3 mb-3">
                  <input
                      type="number"
                      className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                      required
                      placeholder="Pincode"
                      value={patient.address.pincode}
                      onChange={(e) => {
                        let temppatient = { ...patient };
                        temppatient.address.pincode = e.target.value;
                        setPatient(temppatient);
                      }}
                    ></input>
                </div>
                </div>
              </div>

              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label type="password" className="lg:text-xl font-bold px-4 py-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded pl-4 h-8"
                  required
                  placeholder="password"
                  value={patient.password}
                  onChange={(e) => {
                    let temppatient = { ...patient };
                    temppatient.password = e.target.value;
                    setPatient(temppatient);
                  }}
                ></input>
              </div>

              <div className="lg:grid lg:grid-cols-4 gap-2 mt-4 mr-4 flex">
                <label type="password" className=" lg:text-xl font-bold px-4 pt-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded lg:pl-4 h-8 pl-2"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <span className="text-sm py-1 text-red-500">
                  {passwordError}
                </span>
              </div>

              <div className="lg:grid lg:grid-cols-10 gap-2 mt-8 mr-4">
                <div className="col-span-3">
                  <label className=" lg:text-xl font-bold px-4 grid col-start-1 col-span-3 pt-2">
                    Any upper body problem
                  </label>
                </div>
                <div className="col-span-6">
                  {upperproblemlist.map((problem, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-7 col-span-1 mb-3"
                      >
                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={upperproblemlist.problem}
                          onChange={(e) => {
                            let upperproblemlist1 = [...upperproblemlist];
                            upperproblemlist1[index].problem = e.target.problem;
                            setupperproblemlist(upperproblemlist1);
                            let temppatient = { ...patient };
                            temppatient.upperProblems = upperproblemlist;
                            setPatient(temppatient);
                          }}
                        >
                          <option value="" disabled>body part</option>
                          <option value="Neck">Neck</option>
                          <option value="Shoulder">Shoulder</option>
                          <option value="Arm">Arm</option>
                          <option value="Chest">Chest</option>
                          <option value="Elbow">Elbow</option>
                          <option value="Wrist">Wrist</option>
                          <option value="Upper Back">Upper Back</option>
                          <option value="Hip">Hip</option>
                        </select>

                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={upperproblemlist.level}
                          onChange={(e) => {
                            let upperproblemlist1 = [...upperproblemlist];
                            upperproblemlist1[index].level = e.target.value;
                            setupperproblemlist(upperproblemlist1);
                            let temppatient = { ...patient };
                            temppatient.upperProblem = upperproblemlist;
                            setPatient(temppatient);
                          }}
                        >
                          <option value="" disabled>level of pain</option>
                          <option value="1">Mild</option>
                          <option value="2">Moderate</option>
                          <option value="3">Severe</option>
                          <option value="4">Intense</option>
                          <option value="5">Extreme</option>
                        </select>


                        <div
                          className="col-span-1 pl-3 mt-2"
                          onClick={() => {
                            if (upperproblemlist.length > 1) {
                              let upperproblemlist1 = [...upperproblemlist];
                              upperproblemlist1.splice(index, 1);
                              let temppatient = { ...patient };
                              temppatient.upperProblem = upperproblemlist1;
                              setPatient(temppatient);
                              setupperproblemlist(upperproblemlist1);
                            }
                          }}
                        >
                          <img src={minus_logo} alt="" className="h-8 w-8" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div onClick={addupperproblem} className="col-span-1 mt-2">
                  <img src={plus_logo} alt="" className="h-8 w-8" />
                </div>
              </div>
              
              <div className="lg:grid lg:grid-cols-10 gap-2 mt-4 mr-4">
                <div className="col-span-3">
                  <label className=" lg:text-xl font-bold px-4 grid col-start-1 col-span-3 pt-2">
                    Any lower body problem
                  </label>
                </div>
                <div className="col-span-6">
                  {lowerproblemlist.map((problem, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-7 col-span-1 mb-3"
                      >
                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={lowerproblemlist.problem}
                          onChange={(e) => {
                            let lowerproblemlist1 = [...lowerproblemlist];
                            lowerproblemlist1[index].problem = e.target.problem;
                            setlowerproblemlist(lowerproblemlist1);
                            let temppatient = { ...patient };
                            temppatient.lowerProblem = lowerproblemlist;
                            setPatient(temppatient);
                          }}
                        >
                          <option value="" disabled>body part</option>
                          <option value="Lower Back">Lower Back</option>
                          <option value="Leg">Leg</option>
                          <option value="Knee">Knee</option>
                          <option value="Thigh">Thigh</option>
                          <option value="Ankle">Ankle</option>
                          <option value="Foot">Foot</option>
                        </select>

                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={lowerproblemlist.level}
                          onChange={(e) => {
                            let lowerproblemlist1 = [...lowerproblemlist];
                            lowerproblemlist1[index].level = e.target.value;
                            setlowerproblemlist(lowerproblemlist1);
                            let temppatient = { ...patient };
                            temppatient.lowerProblem = lowerproblemlist;
                            setPatient(temppatient);
                          }}
                        >
                          <option value="" disabled>level of pain</option>
                          <option value="1">Mild</option>
                          <option value="2">Moderate</option>
                          <option value="3">Severe</option>
                          <option value="4">Intense</option>
                          <option value="5">Extreme</option>
                        </select>


                        <div
                          className="col-span-1 pl-3 mt-2"
                          onClick={() => {
                            if (lowerproblemlist.length > 1) {
                              let lowerproblemlist1 = [...lowerproblemlist];
                              lowerproblemlist1.splice(index, 1);
                              let temppatient = { ...patient };
                              temppatient.lowerProblems = lowerproblemlist1;
                              setPatient(temppatient);
                              setlowerproblemlist(lowerproblemlist1);
                            }
                          }}
                        >
                          <img src={minus_logo} alt="" className="h-8 w-8" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div onClick={addlowerproblem} className="col-span-1 mt-2">
                  <img src={plus_logo} alt="" className="h-8 w-8" />
                </div>
              </div>

            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="flex justify-center mb-4 mt-8">
                {loading ? (
                  <Reactloading
                    type={"bubbles"}
                    color={""}
                    height={"5%"}
                    width={"5%"}
                  />
                ) : (
                  <button className="bg-primary rounded-xl p-2 px-12 font-plusExtraBold text-white text-xl hover:bg-secondary hover:text-primary mt-8 mb-4 ">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}
