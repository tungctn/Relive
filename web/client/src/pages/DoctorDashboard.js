import doctor_profile from "../assets/img/dashboard/doctor2.png";
import reports from "../assets/img/dashboard/report2_pbl.png";
import search from "../assets/img/dashboard/search2.png";
import add_pre_logo from "../assets/img/dashboard/add_prescription_logo.png";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
const DoctorDashboard = (props) => {
  const [Loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({});
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [problems, setProblems] = useState({});
  const [reports, setReports] = useState([]);
  const [doctor, setDoctor] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    org: "",
    orgAddress: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    emergencyno: "",
    orgNumber: "",
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    education: [{ degree: "" }],
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    specialization: [{ special: "" }],
    password: "",
    _id: "",
  });

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getdoctor() {
      const res = await fetch("/getdoctor");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to Proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setDoctor(data.doctor);
      }
    }
    async function getpatient() {
      setLoading(true);
      if (props.healthID.length > 1) {
        const res = await fetch(`/searchpatient/${props.healthID}`);
        const data = await res.json();

        // if (data.AuthError) {
        //   setLoading(false);
        //   props.settoastCondition({
        //     status: "info",
        //     message: "Please Login to proceed!!!",
        //   });
        //   props.setToastShow(true);
        //   navigate("/");
        // } else if (data.error) {
        //   setLoading(false);
        //   props.settoastCondition({
        //     status: "error",
        //     message: "This HealthID doesn't exist!!!",
        //   });
        //   props.setToastShow(true);
        // } else {
        console.log({ patient: data.patient });
        if (data.patient) {
          setPatient(data.patient);
        }

        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
        if (data.patient.lowerProblem || data.patient.upperProblem) {
          setProblems({
            ...problems,
            lowerProblem: data.patient.lowerProblem,
            upperProblem: data.patient.upperProblem,
          });
        }
        if (data.report) {
          setReports(data.report.reverse());
        }
        setDob(convertDatetoString(patient.dob));
        setLoading(false);
      }
      // } else if (props.healthID.length === 0) {
      //   setLoading(false);
      //   setPatient({});
      // }
      setLoading(false);
    }
    getdoctor();
    getpatient();
  }, [dob]);

  const searchPatient = async (e) => {
    e.preventDefault();
    if (props.healthID.length > 1) {
      setLoading(true);
      const res = await fetch(`/searchpatient/${props.healthID}`);
      const data = await res.json();

      if (data.AuthError) {
        setLoading(false);
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else if (data.error) {
        setLoading(false);
        props.settoastCondition({
          status: "error",
          message: "This HealthID doesn't exist!!!",
        });
        props.setToastShow(true);
      } else if (!data.patient) {
        setLoading(false);
        props.settoastCondition({
          status: "error",
          message: "No Patient Found!!!",
        });
        props.setToastShow(true);
      } else {
        setPatient(data.patient);

        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
        if (data.patient.lowerProblem || data.patient.upperProblem) {
          setProblems({
            ...problems,
            lowerProblem: data.patient.lowerProblem,
            upperProblem: data.patient.upperProblem,
          });
        }
        if (data.report) {
          setReports(data.report.reverse());
        }
        setDob(convertDatetoString(patient.dob));
        setLoading(false);
      }
    } else {
      props.settoastCondition({
        status: "warning",
        message: "Please Enter 12 Digit HealthID !!!",
      });
      props.setToastShow(true);
    }
  };

  const changeProblem = async () => {
    console.log(problems);
    console.log(patient.healthID);
    const res = await fetch(`/changeproblem/${patient.healthID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problems }),
    });
    const data = await res.json();
    console.log({ patient: data.patient });
    setPatient(data.patient);
    setProblems({
      ...problems,
      lowerProblem: data.patient.lowerProblem,
      upperProblem: data.patient.upperProblem,
    });
    setIsEditing(false);
  };

  return (
    <div className="full-body col-span-10 overflow-y-auto">
      <div className="body-without-footer   bg-bgprimary ">
        <div className="main    m-2  ">
          {/* dashboard today start */}
          <div className="">
            <div className="flex justify-between h-12 m-2 bg-bgprimary rounded mt-4 ">
              <div>
                <h1 className="text-2xl font-plusBold p-2 ">Dashboard</h1>
              </div>

              <Link to="/doctor/profile">
                <div className="flex bg-white rounded-lg shadow px-4 ml-60 h-14 ">
                  <img
                    src={doctor_profile}
                    className="w-12 p-1 pt-2 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="grid grid-rows-2 ml-2 gap-2  mb-4 pt-2">
                    <div className="font-plusBold text-base">
                      <h1 className="">
                        {`Dr. ${doctor.name.firstName} ${doctor.name.surName}`}
                      </h1>
                    </div>
                    <div className="">
                      <h2 className="text-sm font-plus">
                        {doctor.specialization[0].special}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* dashboard today end */}

          <form
            onSubmit={searchPatient}
            className="grid grid-cols-9 bg-white rounded-lg p-4 ml-12 mr-8 mt-8 shadow-md border-2 border-solid border-neutral-300 "
          >
            <div className="grid col-start-1 col-span-3">
              <h1 className="text-lg font-plusBold p-2 ">
                Search Patient By Health Id :
              </h1>
            </div>
            <div className=" grid col-span-3">
              <input
                placeholder="Health ID"
                className="font-plus rounded-lg border-2 text-md pl-4  focus:outline-none"
                type="text"
                value={props.healthID}
                onChange={(e) => {
                  props.setHealthID(e.target.value);
                }}
              ></input>
            </div>
            {Loading ? (
              <div className="grid col-start-8  h-10 ml-4">
                <ReactLoading
                  type={"bubbles"}
                  color={""}
                  height={"45%"}
                  width={"45%"}
                />
              </div>
            ) : (
              <div className=" grid col-start-8  h-10 ml-4  bg-secondary  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary  ">
                <div className="flex py-2 px-4 items-center ">
                  <img src={search} className=" h-4  " alt="search"></img>
                  <button className="ml-2 flex  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary   ">
                    Search
                  </button>
                </div>
              </div>
            )}
            <div className="grid col-start-9  h-10 ml-4  bg-secondary  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary  ">
              <div className="flex py-2 px-4 items-center ">
                <div
                  className="ml-2 flex cursor-pointer rounded font-semibold font-plus shadow-sm hover:bg-bgsecondary "
                  onClick={() => {
                    props.setHealthID("");
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          </form>

          {patient && Object.keys(patient).length !== 0 ? (
            <div className="grid grid-cols-2">
              <div className="m-4 p-4">
                <div>
                  <h1 className="font-bold font-plus text-xl ">
                    Patient Details
                  </h1>
                </div>
                <div className="bg-white font-plus p-4 mt-4 px-8 rounded-xl shadow">
                  <div className="flex">
                    <div>
                      <h1>Name : </h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="pl-3">{`${patient.name.firstName} `}</h1>
                      <h1 className="pl-1">{`${patient.name.middleName} `}</h1>
                      <h1 className="pl-1">{patient.name.surName}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Date : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{dob}</h1>
                    </div>
                  </div>
                  {/* <div className="flex">
                    <div>
                      <h1>Blood group : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{patient.bloodGroup}</h1>
                    </div>
                  </div> */}
                  <div>
                    <h1 className="font-bold mt-4">Past Health History</h1>
                    {/* <div>{`${patient.diseases[0].disease} (${patient.diseases[0].yrs} yrs.)`}</div> */}
                  </div>
                </div>
              </div>
              {/* recent health check up start */}
              <div className="m-4 p-4 ">
                <div>
                  <h1 className="font-bold font-plus text-xl ">
                    Recent Health Checkup
                    <img
                      src={add_pre_logo}
                      className="h-3 mx-3"
                      alt="adddiagno"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    />
                  </h1>
                </div>
                {Object.keys(problems).length > 0 ? (
                  <div className="bg-white mt-4 font-plus p-4 rounded-xl shadow px-8">
                    <div className="flex ">
                      <div>
                        <h1>Upper Problems:</h1>
                      </div>
                      {problems.upperProblem?.map((upperProblem, index) => (
                        <div className="ml-2" key={index}>
                          {isEditing ? (
                            <div>
                              <input
                                placeholder="Search"
                                className="w-96 rounded ml-4 text-xl pl-4 border focus:outline-none"
                                defaultValue={upperProblem.problem}
                                onChange={(e) => {
                                  let temp = problems.upperProblem;
                                  temp[index].problem = e.target.value;
                                  setProblems({
                                    ...problems,
                                    upperProblem: temp,
                                  });
                                }}
                              />
                              <input
                                placeholder="Search"
                                className="w-96 rounded ml-4 text-xl pl-4 border focus:outline-none"
                                defaultValue={upperProblem.level}
                                onChange={(e) => {
                                  let temp = problems.upperProblem;
                                  temp[index].level = e.target.value;
                                  setProblems({
                                    ...problems,
                                    upperProblem: temp,
                                  });
                                }}
                              />
                            </div>
                          ) : (
                            <h1>{`${upperProblem.problem} (Level ${upperProblem.level})`}</h1>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex ">
                      <div>
                        <h1>Lower Problems:</h1>
                      </div>
                      {problems.lowerProblem?.map((lowerProblem, index) => (
                        <div className="ml-2" key={index}>
                          {isEditing ? (
                            <div>
                              <input
                                placeholder="Search"
                                className="w-96 rounded ml-4 text-xl pl-4 border focus:outline-none"
                                defaultValue={lowerProblem.problem}
                                onChange={(e) => {
                                  let temp = problems.lowerProblem;
                                  temp[index].problem = e.target.value;
                                  setProblems({
                                    ...problems,
                                    lowerProblem: temp,
                                  });
                                }}
                              />
                              <input
                                placeholder="Search"
                                className="w-96 rounded ml-4 text-xl pl-4 border focus:outline-none"
                                defaultValue={lowerProblem.level}
                                onChange={(e) => {
                                  let temp = problems.lowerProblem;
                                  temp[index].level = e.target.value;
                                  setProblems({
                                    ...problems,
                                    lowerProblem: temp,
                                  });
                                }}
                              />
                            </div>
                          ) : (
                            <h1>{`${lowerProblem.problem} (Level ${lowerProblem.level})`}</h1>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className=" grid col-start-8  h-10 ml-4  bg-secondary  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary w-[200px] mt-4 ">
                        <div className="flex py-2 px-4 items-center ">
                          <button
                            className="ml-2 flex  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary"
                            onClick={changeProblem}
                          >
                            Edit problem
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white mt-4 font-plus p-4 rounded-xl shadow px-8 flex justify-center font-bold">
                    {" "}
                    No Data Found...{" "}
                  </div>
                )}
                {/* recent health check up end */}
              </div>
              <div></div>
            </div>
          ) : (
            <div className="text-2xl flex justify-center items-center font-plusBold my-60">
              Search Patient to Add Diagnosis
            </div>
          )}

          {Object.keys(patient).length !== 0 ? (
            <div className="font-plus m-4  ">
              <div className="flex justify-between m-8">
                <div className="font-bold text-xl ml-4">
                  <h1>Checkup History</h1>
                </div>
                <Link to="/doctor/addDiagno">
                  <div className=" grid col-start-8  h-10 ml-4  bg-secondary  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary  ">
                    <div className="flex py-2 px-4 items-center ">
                      <img
                        src={add_pre_logo}
                        className="h-3 mx-3"
                        alt="adddiagno"
                      ></img>
                      <button className="ml-2 flex  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary   ">
                        Add new report
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="bg-white m-4 rounded-lg overflow-y-auto">
                <div className="grid grid-rows-2 p-6 gap-2 shadow overflow-y-auto">
                  <div className="grid grid-cols-4 font-bold  border-b-2">
                    <div>
                      <h1>Date</h1>
                    </div>
                    <div>
                      <h1>Doctor Name</h1>
                    </div>
                    {/* <div>
                      <h1>Advice</h1>
                    </div> */}
                    <div>
                      <h1>Detail</h1>
                    </div>
                  </div>
                  {/* <div> */}
                  {reports.length > 0 ? (
                    reports.map((report) => {
                      console.log(report);
                      return (
                        <div className="grid grid-cols-4">
                          <div>
                            <h1>{convertDatetoString(report?.createdAt)}</h1>
                          </div>
                          <div className="flex">
                            <h1>Dr. </h1>
                            <h1> {report?.doctor.name.firstName}</h1>
                          </div>
                          {/* <div>
                            {report?.advice.map((advice, index) => {
                              return <h1>{advice}</h1>;
                            })}
                          </div> */}
                          <Link
                            to="/doctor/prescription"
                            onClick={() => {
                              // props.setPrescriptionID(prescription._id)
                              // props.setReportID(report[index]._id);
                              console.log("prescription._id");
                            }}
                          >
                            <div className=" grid col-start-8  h-10 ml-4  bg-secondary  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary w-[50px]">
                              <div className="flex py-2 px-4 items-center ">
                                <img
                                  src={eye}
                                  className="h-5"
                                  alt="adddiagno"
                                ></img>
                                {/* <button className="ml-2 flex  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary   ">
                                  Detail{" "}
                                </button> */}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="mx-auto mt-3">No Records Found...</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // </div>
            <div>No patient found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
