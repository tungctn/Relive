import React, { useEffect, useState } from "react";
import icon from "../../assets/img/dashboard/add_prescription_logo.png";
import fitnessLogo from "../../assets/img/dashboard/fitness.png";
import { MdAddAlert, MdAlarm, MdWarning } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddExercise(props) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getpatient() {
      // setLoading(true);
      if (props.healthID) {
        const res = await fetch(`/searchpatient/${props.healthID}`);
        const data = await res.json();
        console.log({ patient: data.patient });

        if (data.patient.exercise) {
          setSelectedExercise(data.patient.exercise);
        }
        return data.patient.exercise;
      } else {
        return [];
      }
    }
    async function fetchExercises(patientExercise) {
      const patientExerciseId = patientExercise.map((exercise) => exercise._id);
      const res = await fetch("/getallexercise");
      const data = await res.json();
      setExercises(
        data.exercises.filter(
          (exercise) => !patientExerciseId.includes(exercise._id)
        )
      );
      console.log(data.exercises);
    }
    getpatient().then((data) => fetchExercises(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [selectedExercise, setSelectedExercise] = useState([]);

  const handleExerciseSelect = (exercise) => {
    if (selectedExercise.includes(exercise)) {
      setSelectedExercise((prev) => prev.filter((e) => e !== exercise));
    } else {
      setSelectedExercise((prev) => [...prev, exercise]);
    }
    console.log(selectedExercise);
  };

  const handleSubmit = async () => {
    console.log(props.healthID);
    const res = await fetch(`/updatepatient/${props.healthID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise: selectedExercise.map((exercise) => exercise._id),
      }),
    });
    const data = await res.json();
    if (res.status == 200) {
      toast.success("Thêm bài tập thành công");
      navigate("/doctor/dashboard");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col ml-6 mt-4 w-[78vw] overflow-y-auto">
      <h1 className="text-2xl font-plusBold w-60">Add Exercise</h1>
      <div className="w-[80vw] border-neutral-300 border-b-2">
        <div className="flex justify-between mt-6 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow rounded-lg font-plusMedium text-md px-4 py-2 border border-neutral-300 w-[32rem] focus:outline-none"
          />
          <select
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
          >
            <option value="" disabled>
              body area
            </option>
            <option value="Upper Body">Upper Body</option>
            <option value="Lower Body">Lower Body</option>
          </select>
          <select
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
            disabled={!bodyPart}
            className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
          >
            <option value="" disabled>
              body part
            </option>

            {bodyPart === "Upper Body" && (
              <>
                <option value="Neck">Neck</option>
                <option value="Shoulder">Shoulder</option>
                <option value="Arm">Arm</option>
                <option value="Chest">Chest</option>
                <option value="Elbow">Elbow</option>
                <option value="Wrist">Wrist</option>
                <option value="Upper Back">Upper Back</option>
                <option value="Hip">Hip</option>
              </>
            )}

            {bodyPart === "Lower Body" && (
              <>
                <option value="Lower Back">Lower Back</option>
                <option value="Leg">Leg</option>
                <option value="Knee">Knee</option>
                <option value="Thigh">Thigh</option>
                <option value="Ankle">Ankle</option>
                <option value="Foot">Foot</option>
              </>
            )}
          </select>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            disabled={!selectedProblem}
            className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
          >
            <option value="" disabled>
              level of pain
            </option>
            <option value="1">Mild</option>
            <option value="2">Moderate</option>
            <option value="3">Severe</option>
            <option value="4">Intense</option>
            <option value="5">Extreme</option>
          </select>
        </div>
      </div>

      <div className="w-[78vw] flex flex-col mt-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-plusBold text-xl">Added Exercises</h1>
          <div>
            <button
              onClick={handleSubmit}
              className="flex items-center bg-primary rounded-lg px-6 py-2 font-plusMedium text-md text-white focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>

        {selectedExercise.length !== 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-2">
            {selectedExercise.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => handleExerciseSelect(exercise)}
                className="mt-4 rounded-xl overflow-hidden cursor-pointer border-4 border-primary shadow-lg focus:border-secondary hover:border-secondary hover:border-6"
              >
                <div className="w-full h-[200px] flex justify-center items-center bg-neutral-800">
                  <video
                    src={exercise.video}
                    controls
                    className="w-full h-full object-contain border-b-4 border-secondary"
                  ></video>
                </div>
                <h2 className="mx-4 mt-2 font-plusBold text-[1.3rem] text-primary">
                  {exercise.title}
                </h2>

                <div className="flex flex-row gap-1 mx-4 mb-2 flex-wrap">
                  {exercise.upperproblem[0].problem !== "" &&
                    exercise.upperproblem.map((problem) => (
                      // <div className=" flex flex-col gap-1">
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <div className="flex flex-row items-center rounded-xl border-primary border-2 px-2">
                          <img
                            src={fitnessLogo}
                            className="h-3"
                            alt="bodyPartHit"
                          ></img>
                          <h2 className="ml-1 font-plusMedium text-[0.7rem]">
                            {problem.problem}
                          </h2>
                        </div>
                      </div>
                      // </div>
                    ))}
                  {exercise.lowerproblem[0].problem !== "" &&
                    exercise.lowerproblem.map((problem) => (
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <div className="flex flex-row items-center rounded-xl border-primary border-2 px-2">
                          <img
                            src={fitnessLogo}
                            className="h-3"
                            alt="bodyPartHit"
                          ></img>
                          <h2 className="ml-1 font-plusMedium text-[0.7rem]">
                            {problem.problem}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                {exercise.specialCondition !== "" && (
                  <div className=" flex flex-col gap-1 mx-4 mt-1 mb-2">
                    <div>
                      <div className="flex flex-row items-center rounded-xl border-[#c73a3a] border-2 w-fit px-2">
                        <MdWarning className="text-[#c73a3a]" />
                        <h2 className="ml-1 font-plusMedium text-[0.7rem] text-[#c73a3a]">
                          {exercise.specialCondition}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex mt-4 justify-center">
            <h1 className="font-plusMedium text-md text-neutral-500">
              No Exercises Added
            </h1>
          </div>
        )}
      </div>

      <div className="w-[78vw] flex flex-col mt-6">
        <h1 className="font-plusBold text-xl">Select Exercises</h1>
        <div className="grid grid-cols-4 gap-4 mt-2 ">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => handleExerciseSelect(exercise)}
              className="mt-4 rounded-xl overflow-hidden cursor-pointer border-4 border-primary shadow-lg focus:border-secondary hover:border-secondary hover:border-6"
            >
              <div className="w-full h-[200px] flex justify-center items-center bg-neutral-800">
                <video
                  src={exercise.video}
                  controls
                  className="w-full h-full object-contain border-b-4 border-secondary"
                ></video>
              </div>
              <h2 className="mx-4 mt-2 font-plusBold text-[1.3rem] text-primary">
                {exercise.title}
              </h2>

              <div className="flex flex-row gap-1 mt-1 mx-4 mb-2 flex-wrap">
                {exercise.upperproblem[0].problem !== "" &&
                  exercise.upperproblem.map((problem) => (
                    // <div className=" flex flex-col gap-1">
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <div className="flex flex-row items-center rounded-xl border-primary border-2 px-2">
                        <img
                          src={fitnessLogo}
                          className="h-3"
                          alt="bodyPartHit"
                        ></img>
                        <h2 className="ml-1 font-plusMedium text-[0.7rem]">
                          {problem.problem}
                        </h2>
                      </div>
                    </div>
                    // </div>
                  ))}
                {exercise.lowerproblem[0].problem !== "" &&
                  exercise.lowerproblem.map((problem) => (
                    // <div className=" flex flex-col gap-1">

                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <div className="flex flex-row items-center rounded-xl border-primary border-2 px-2">
                        <img
                          src={fitnessLogo}
                          className="h-3"
                          alt="bodyPartHit"
                        ></img>
                        <h2 className="ml-1 font-plusMedium text-[0.7rem]">
                          {problem.problem}
                        </h2>
                      </div>
                    </div>
                    // </div>
                  ))}
              </div>
              {exercise.specialCondition !== "" && (
                <div className=" flex flex-col gap-1 mx-4 mt-1 mb-2">
                  <div>
                    <div className="flex flex-row items-center rounded-xl border-[#c73a3a] border-2 w-fit px-2">
                      <MdWarning className="text-[#c73a3a]" />
                      <h2 className="ml-1 font-plusMedium text-[0.7rem] text-[#c73a3a]">
                        {exercise.specialCondition}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddExercise;
