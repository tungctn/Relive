import React, {useState} from "react";
import {useLocation} from "react-router-dom";

function AddExercise () {
    const location = useLocation();
    const problem = location.state?.problem;
    const level = location.state?.level;
    const problemType = location.state?.problemType;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProblem, setSelectedProblem] = useState(problem || "");
    const [selectedLevel, setSelectedLevel] = useState(level || "");

    
    return (
        <div className="flex flex-col ml-6 mt-4">
            <h1 className="text-2xl font-plusBold w-60">Add Exercise</h1>
            <div className="flex flex-row justify-between items-center mt-6">
                <input 
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow rounded-lg font-plusMedium text-md px-4 py-2 border w-[32rem] focus:outline-none"
                />
                <select
                    value={selectedProblem}
                    onChange={e => setSelectedProblem(e.target.value)}
                    className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-200 focus:outline-none"
                >
                    <option value="" disabled>body part</option>

                    {problemType === "upperProblem" && (
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

                    {problemType === "lowerProblem" && (
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
                    onChange={e => setSelectedLevel(e.target.value)}
                    className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-200 focus:outline-none"
                >
                    <option value="" disabled>level of pain</option>
                    <option value="1">Mild</option>
                    <option value="2">Moderate</option>
                    <option value="3">Severe</option>
                    <option value="4">Intense</option>
                    <option value="5">Extreme</option>
                </select>
                
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {[1, 2, 3, 4].map(exercise => (
                    <div key={exercise.id} className="rounded overflow-hidden shadow-lg p-4">
                        <video src={exercise.videoPath} controls className="w-full"></video>
                        <h2 className="mt-2">{exercise.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AddExercise;