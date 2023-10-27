import React, {useState} from "react";
import icon from "../../assets/img/dashboard/add_prescription_logo.png";

function AddExercise () {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProblem, setSelectedProblem] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [selectedVideo, setSelectedVideo] = useState([]);

    const handleVideoSelect = (exercise) => {
        if (selectedVideo.includes(exercise)) {
            setSelectedVideo(prev => prev.filter(e => e !== exercise));
        } else {
            setSelectedVideo(prev => [...prev, exercise]);
        }
    };

    
    return (
        <div className="flex flex-col ml-6 mt-4">
            <h1 className="text-2xl font-plusBold w-60">Add Exercise</h1>
            <div className="w-[80vw] border-neutral-300 border-b-2">
                <div className="flex justify-between mt-6 mb-4">
                    <input 
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="flex-grow rounded-lg font-plusMedium text-md px-4 py-2 border border-neutral-300 w-[32rem] focus:outline-none"
                    />
                    <select
                        value={bodyPart}
                        onChange={e => setBodyPart(e.target.value)}
                        className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
                    >
                        <option value="" disabled>body area</option>
                        <option value="Upper Body">Upper Body</option>
                        <option value="Lower Body">Lower Body</option>
                    </select>
                    <select
                        value={selectedProblem}
                        onChange={e => setSelectedProblem(e.target.value)}
                        disabled={!bodyPart}
                        className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
                    >
                        <option value="" disabled>body part</option>

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
                        onChange={e => setSelectedLevel(e.target.value)}
                        disabled={!selectedProblem}
                        className="w-76 rounded-lg ml-4 font-plusMedium text-md py-2 px-4 border border-solid border-neutral-300 focus:outline-none"
                    >
                        <option value="" disabled>level of pain</option>
                        <option value="1">Mild</option>
                        <option value="2">Moderate</option>
                        <option value="3">Severe</option>
                        <option value="4">Intense</option>
                        <option value="5">Extreme</option>
                    </select>
                    
                </div>
            </div>
            
            <div className="w-[78vw] flex flex-col mt-4">
                <h1 className="font-plusBold text-lg">Added Exercises</h1>
                {selectedVideo.length !== 0 ? (
                    <div className="grid grid-cols-4 gap-4 mt-2">
                        {selectedVideo.map(exercise => (
                            <div key={exercise.id} className="mt-4 rounded-xl overflow-hidden cursor-pointer border-4 border-primary shadow-lg focus:border-secondary hover:border-secondary hover:border-6">
                                <video src={exercise.videoPath} controls className="w-full border-b-4 border-primary"></video>
                                <div className="mt-2 mx-4 mb-3 flex flex-col gap-1">
                                    <h2 className="font-plusBold text-[1.1rem]">Exercise A {exercise.title}</h2>
                                    <div>
                                        <div className="flex flex-row items-center rounded-xl border-primary border-2 w-fit px-2">
                                            <img
                                                src={icon}
                                                className="h-2"
                                                alt="bodyPartHit"
                                            >
                                            </img>
                                            <h2 className="ml-1 font-plusMedium text-[0.7rem]">Lower Back</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex mt-4 justify-center">
                        <h1 className="font-plusMedium text-md text-neutral-500">No Exercises Added</h1>
                    </div>
                )}

            </div>

            <div className="w-[78vw] flex flex-col mt-6">
                <h1 className="font-plusBold text-lg">Select Exercises</h1>
                <div className="grid grid-cols-4 gap-4 mt-2 ">
                    {[1, 2, 3, 4, 5].map(exercise => (
                        <div 
                            key={exercise.id} 
                            onClick={() => handleVideoSelect(exercise)}
                            className="mt-4 rounded-xl overflow-hidden cursor-pointer border-4 border-primary shadow-lg focus:border-secondary hover:border-secondary hover:border-6"
                        >
                            <video src={exercise.videoPath} controls className="w-full border-b-4 border-primary"></video>
                            <div className="mt-2 mx-4 mb-3 flex flex-col gap-1">
                                <h2 className="font-plusBold text-[1.1rem]">Exercise A {exercise.title}</h2>
                                <div>
                                    <div className="flex flex-row items-center rounded-xl border-primary border-2 w-fit px-2">
                                        <img
                                            src={icon}
                                            className="h-2"
                                            alt="bodyPartHit"
                                        >
                                        </img>
                                        <h2 className="ml-1 font-plusMedium text-[0.7rem]">Lower Back</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
};

export default AddExercise;