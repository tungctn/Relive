import React, { useState, useRef } from "react";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Rings } from "react-loader-spinner";
import axios from "axios";

SwiperCore.use([Navigation]);
const VideoUpload = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [specialCondition, setSpecialCondition] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);
  const [isShowUpper, setIsShowUpper] = useState(false);
  const [isShowLower, setIsShowLower] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [angles, setAngles] = useState([]);
  const [angleIndex, setAngleIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleToleranceChange = (index, newValue) => {
    const updatedData = [...angles];
    updatedData.map((_, dataIndex) => {
      updatedData[dataIndex].tolerance[index] = Number(newValue);
    });
    setAngles(updatedData);
  };
  const [upperproblemlist, setupperproblemlist] = useState([
    { problem: "", startLevel: "", endLevel: "" },
  ]);
  const [lowerproblemlist, setlowerproblemlist] = useState([
    { problem: "", startLevel: "", endLevel: "" },
  ]);

  const addupperproblem = () => {
    const upperproblemlist1 = [...upperproblemlist];
    upperproblemlist1.push({ problem: "", level: "" });
    setupperproblemlist(upperproblemlist1);
  };

  const addlowerproblem = () => {
    const lowerproblemlist1 = [...lowerproblemlist];
    lowerproblemlist1.push({ problem: "", level: "" });
    setlowerproblemlist(lowerproblemlist1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://116.103.226.45:4000/upload-video",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );
    const data = response.data;
    if (response.status === 200) {
      setIsLoadingImages(true);
      console.log("Video uploaded successfully. URL:", data.videoUrl);
      const responseLandmark = await axios.get(
        `http://116.103.226.45:8000/landmark-prediction/${data.filePath}?o=${data.fileOutput}`,
        {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded);
            console.log(progressEvent.total);
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      const dataLandmark = responseLandmark.data;

      console.log(
        dataLandmark.angles.map((angle) => {
          return {
            ...angle,
            tolerance: Object.keys(angle).map((_) => 10),
            isCheck: Object.keys(angle).map((_) => false),
          };
        })
      );
      if (responseLandmark.status == 200) {
        setImages(dataLandmark.images);
        setAngles(
          dataLandmark.angles.map((angle) => {
            return {
              ...angle,
              tolerance: Object.keys(angle).map((_) => 10),
              isCheck: Object.keys(angle).map((_) => false),
            };
          })
        );
        console.log(
          `http://117.1.29.174:8000/file/${dataLandmark.output_video_path}`
        );
        setVideoSrc(
          `http://117.1.29.174:8000/file/${dataLandmark.output_video_path}`
        );
        setIsLoadingImages(false);
      } else {
        toast.error("Lỗi khi xử lý video");
      }
    } else {
      toast.error("Lỗi khi upload video");
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("video/")) {
      uploadVideo(file);
    } else {
      alert("Vui lòng chọn một file video.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    console.log({
      videoSrc,
      title,
      specialCondition,
      upperproblemlist,
      lowerproblemlist,
      images,
      equipment,
      description,
      angles: angles,
    });
    const res = await fetch("/addexercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video: videoSrc,
        title,
        specialCondition,
        upperproblem: upperproblemlist,
        lowerproblem: lowerproblemlist,
        image: images,
        angles,
        equipment: equipment,
        description: description,
      }),
    });
    const data = await res.json();
    console.log({ data });
    console.log(res.status);
    if (res.status === 200) {
      toast.success("Thêm bài tập thành công");
      navigate("/doctor/dashboard");
    }
  };

  const handleSlideChange = (swiper) => {
    setAngleIndex(swiper.realIndex);
  };

  return (
    <div className="w-[100%] mx-[3vw] flex flex-col mb-[100px]">
      <h1 className="font-plusBold text-2xl mt-4">Video Upload</h1>
      <div className="overflow-y-auto mt-6">
        <div className="flex">
          <div className="w-[50%]">
            <h1 className="text-xl font-plusBold">Add Exercise</h1>
          </div>
          <div className="w-[50%]">
            <h1 className="text-xl font-plusBold">Information</h1>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="video/*"
        />
        <div className="flex">
          <div
            className="mt-4 w-[45%] h-[45vh] border-2 border-dashed border-gray-400 relative flex justify-center items-center mb-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {videoSrc ? (
              <video
                className="w-full h-full object-contain font-plusMedium"
                controls
              >
                <source src={videoSrc} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            ) : isLoadingImages ? (
              <div className="flex flex-col justify-center items-center">
                <Rings color="#00BFFF" height={80} width={80} />
                <h1 className="font-plusMedium">{`Loading pose images...(${uploadProgress}%)`}</h1>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <p className="font-plusMedium mt-1">
                  Kéo và thả video của bạn vào đây hoặc
                </p>
                <div className="font-plusMedium text-3xl ml-2 cursor-pointer">
                  +
                </div>
              </div>
            )}
          </div>
          <div className="w-[5%]"></div>
          <div className="w-[45%]">
            <div className="mt-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 px-4 py-2 w-full mb-4 rounded-lg font-plusMedium"
              />
              <div className="flex flex-row justify-between font-plusMedium ml-4">
                <div>
                  <input
                    type="checkbox"
                    id="upperCheckbox"
                    name="upperCheckbox"
                    value="upperValue"
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(e.target.checked);
                      setIsShowUpper(e.target.checked);
                    }}
                  />
                  <label for="upperCheckbox" className="ml-2">
                    {" "}
                    Upper
                  </label>
                </div>

                <div className="mr-[30%]">
                  <input
                    type="checkbox"
                    id="lowerCheckbox"
                    name="lowerCheckbox"
                    value="lowerValue"
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(e.target.checked);
                      setIsShowLower(e.target.checked);
                    }}
                  />
                  <label for="lowerCheckbox" className="ml-2">
                    {" "}
                    Lower
                  </label>
                </div>
              </div>

              {isShowUpper && (
                <div className="lg:grid lg:grid-cols-10 gap-2 mt-2 mr-4">
                  <div className="col-span-3">
                    <label className="font-plusMedium text-md pl-4 grid col-start-1 col-span-3 py-2">
                      Upper problem
                    </label>
                  </div>
                  <div className="col-span-6">
                    {upperproblemlist.map((problem, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-1 col-span-1"
                        >
                          <div className="grid grid-cols-7">
                            <select
                              className="font-plus text-sm col-span-7 rounded-lg h-8 pl-2 ml-4 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={upperproblemlist.problem}
                              onChange={(e) => {
                                // console.log(e.target.value);

                                let upperproblemlist1 = [...upperproblemlist];
                                upperproblemlist1[index].problem =
                                  e.target.value;
                                setupperproblemlist(upperproblemlist1);
                                // let temppatient = { ...patient };
                                // temppatient.upperProblems = upperproblemlist;
                              }}
                            >
                              <option value="">body part</option>
                              <option value="neck">Neck</option>
                              <option value="shoulder">Shoulder</option>
                              <option value="arm">Arm</option>
                              <option value="chest">Chest</option>
                              <option value="elbow">Elbow</option>
                              <option value="wrist">Wrist</option>
                              <option value="upperBack">Upper Back</option>
                              <option value="hip">Hip</option>
                            </select>
                          </div>

                          {/* start level */}
                          <div className="grid grid-cols-7">
                            {/* end level */}
                            <select
                              className="font-plus text-sm col-span-3 rounded-lg h-8 pl-2 ml-2 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={upperproblemlist.level}
                              onChange={(e) => {
                                let upperproblemlist1 = [...upperproblemlist];
                                upperproblemlist1[index].startLevel =
                                  e.target.value;
                                setupperproblemlist(upperproblemlist1);
                                // let temppatient = { ...patient };
                                // temppatient.upperProblem = upperproblemlist;
                                // setPatient(temppatient);
                              }}
                            >
                              <option value="">level of pain</option>
                              <option value="1">Mild</option>
                              <option value="2">Moderate</option>
                              <option value="3">Severe</option>
                              <option value="4">Intense</option>
                              <option value="5">Extreme</option>
                            </select>
                            <label className="font-plusMedium text-md pl-4 py-2">
                              to
                            </label>
                            <select
                              className="font-plus text-sm col-span-3 rounded-lg h-8 pl-2 ml-2 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={upperproblemlist.level}
                              onChange={(e) => {
                                let upperproblemlist1 = [...upperproblemlist];
                                upperproblemlist1[index].endLevel =
                                  e.target.value;
                                setupperproblemlist(upperproblemlist1);
                                // let temppatient = { ...patient };
                                // temppatient.upperProblem = upperproblemlist;
                                // setPatient(temppatient);
                              }}
                            >
                              <option value="">level of pain</option>
                              <option value="1">Mild</option>
                              <option value="2">Moderate</option>
                              <option value="3">Severe</option>
                              <option value="4">Intense</option>
                              <option value="5">Extreme</option>
                            </select>
                            <div
                              className="pl-3 mt-2"
                              onClick={() => {
                                if (upperproblemlist.length > 1) {
                                  let upperproblemlist1 = [...upperproblemlist];
                                  upperproblemlist1.splice(index, 1);
                                  // let temppatient = { ...patient };
                                  // temppatient.upperProblem = upperproblemlist1;
                                  // setPatient(temppatient);
                                  setupperproblemlist(upperproblemlist1);
                                }
                              }}
                            >
                              <img
                                src={minus_logo}
                                alt=""
                                className="h-6 w-6"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div onClick={addupperproblem} className="col-span-1 mt-2">
                    <img src={plus_logo} alt="" className="h-6 w-6" />
                  </div>
                </div>
              )}

              {isShowLower && (
                <div className="lg:grid lg:grid-cols-10 gap-2 mt-2 mr-4">
                  <div className="col-span-3">
                    <label className="font-plusMedium text-md pl-4 grid col-start-1 col-span-3 py-2">
                      Lower problem
                    </label>
                  </div>
                  <div className="col-span-6">
                    {lowerproblemlist.map((problem, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-1 col-span-1"
                        >
                          {/* Body Part Select */}
                          <div className="grid grid-cols-7">
                            <select
                              className="font-plus text-sm col-span-7 rounded-lg h-8 pl-2 ml-4 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={lowerproblemlist.problem}
                              onChange={(e) => {
                                let lowerproblemlist1 = [...lowerproblemlist];
                                lowerproblemlist1[index].problem =
                                  e.target.value;
                                setlowerproblemlist(lowerproblemlist1);
                              }}
                            >
                              {/* ...options */}
                              <option value="">body part</option>
                              <option value="lowerBack">Lower Back</option>
                              <option value="leg">Leg</option>
                              <option value="knee">Knee</option>
                              <option value="thigh">Thigh</option>
                              <option value="ankle">Ankle</option>
                              <option value="foot">Foot</option>
                            </select>
                          </div>

                          {/* Start Level and End Level Select */}
                          <div className="grid grid-cols-7">
                            <select
                              className="font-plus text-sm col-span-3 rounded-lg h-8 pl-2 ml-2 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={lowerproblemlist.level}
                              onChange={(e) => {
                                let lowerproblemlist1 = [...lowerproblemlist];
                                lowerproblemlist1[index].startLevel =
                                  e.target.value;
                                setlowerproblemlist(lowerproblemlist1);
                              }}
                            >
                              {/* ...options */}
                              <option value="">level of pain</option>
                              <option value="1">Mild</option>
                              <option value="2">Moderate</option>
                              <option value="3">Severe</option>
                              <option value="4">Intense</option>
                              <option value="5">Extreme</option>
                            </select>
                            <label className="font-plusMedium text-md pl-4 py-2">
                              to
                            </label>
                            <select
                              className="font-plus text-sm col-span-3 rounded-lg h-8 pl-2 ml-2 mt-1 border-2 border-neutral-200"
                              name="level"
                              value={lowerproblemlist.level}
                              onChange={(e) => {
                                let lowerproblemlist1 = [...lowerproblemlist];
                                lowerproblemlist1[index].endLevel =
                                  e.target.value;
                                setlowerproblemlist(lowerproblemlist1);
                              }}
                            >
                              {/* ...options */}
                              <option value="">level of pain</option>
                              <option value="1">Mild</option>
                              <option value="2">Moderate</option>
                              <option value="3">Severe</option>
                              <option value="4">Intense</option>
                              <option value="5">Extreme</option>
                            </select>
                          </div>

                          {/* Minus Logo */}
                          <div
                            className="col-span-1 pl-3 mt-2"
                            onClick={() => {
                              if (lowerproblemlist.length > 1) {
                                let lowerproblemlist1 = [...lowerproblemlist];
                                lowerproblemlist1.splice(index, 1);
                                setlowerproblemlist(lowerproblemlist1);
                              }
                            }}
                          >
                            <img src={minus_logo} alt="" className="h-6 w-6" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div onClick={addlowerproblem} className="col-span-1 mt-2">
                    <img src={plus_logo} alt="" className="h-6 w-6" />
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder={
                  "Necessary Equipment (Example: chair, dumbbell, etc.)"
                }
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="border-2 px-4 py-2 w-full mt-4 rounded-lg font-plusMedium"
              />
              <input
                type="text"
                placeholder={"Special Condition"}
                value={specialCondition}
                onChange={(e) => setSpecialCondition(e.target.value)}
                className="border-2 px-4 py-2 w-full mt-4 rounded-lg font-plusMedium"
              />
              <textarea
                placeholder="Describe the exercise (Example:
                - First, stand straight and raise arms horizontally to your shoulders
                - Second, bend your elbows and raise your hands to your head
                - Third, return to the original position)"
                className="border-2 px-4 py-2 w-full mt-4 h-[18vh] rounded-lg font-plusMedium"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-[78vw] border border-neutral-300 my-4"></div>

        <div className="flex min-h-full">
          <div className="w-[45%] overflow-y-auto">
            <h1 className="text-xl font-plusBold mb-4">{`Pose image (${
              images.length == 0
                ? 0
                : typeof angleIndex == "number"
                ? angleIndex + 1
                : 0
            }/${images.length})`}</h1>
            {isLoadingImages ? (
              // <div>Loading pose images...</div>
              <div className="flex flex-col justify-center items-center">
                <Rings color="#00BFFF" height={80} width={80} />
                <h1 className="font-plusMedium">{`Loading pose images...(${uploadProgress}%)`}</h1>
              </div>
            ) : (
              <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                loop={true}
                onSlideChange={handleSlideChange}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="grid justify-items-stretch">
                      <div className="justify-self-center">
                        <img
                          src={image}
                          alt={`Slide ${index}`}
                          className="h-[400px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-[5%]"></div>
          <div className="w-[40%]">
            <h1 className="text-xl font-plusBold ">Angle table</h1>
            <table className="w-[100%] border-collapse border border-gray-400 mt-4 font-plus">
              <thead>
                <tr className="bg-slate-200">
                  <th className="border border-gray-400 p-2">Sel.</th>
                  <th className="border border-gray-400 p-2">Body part</th>
                  <th className="border border-gray-400 p-2">Angle</th>
                  <th className="border border-gray-400 p-2">Tol (%)</th>
                </tr>
              </thead>
              <tbody className="font-plus">
                {angles.length > 0 &&
                  typeof angles[angleIndex] === "object" &&
                  Object.keys(angles[angleIndex])?.map((item, index) => {
                    if (item != "tolerance" && item != "isCheck")
                      return (
                        <tr key={index}>
                          <td className="border border-gray-400 py-2 px-4">
                            <input
                              type="checkbox"
                              checked={angles[angleIndex].isCheck[index]}
                              onChange={(e) => {
                                console.log(e.target.value);
                                console.log(e.target.checked);
                                let updatedData = [...angles];
                                // updatedData[angleIndex][item] = e.target.checked;
                                updatedData[angleIndex].isCheck[index] =
                                  e.target.checked;
                                setAngles(updatedData);
                              }}
                            />
                          </td>
                          <td className="border border-gray-400 p-2">{item}</td>
                          <td className="border border-gray-400 p-2">
                            {angles[angleIndex][item].toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-2 flex justify-center">
                            <input
                              type="number"
                              value={angles[angleIndex].tolerance[index]}
                              onChange={(e) =>
                                handleToleranceChange(index, e.target.value)
                              }
                              className="border-2 p-2 w-[5vw]"
                            />
                          </td>
                        </tr>
                      );
                  })}
              </tbody>
            </table>
          </div>
          <div className="w-[10%]"></div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 mb-2 mr-[4vw]">
        <div
          className="items-center bg-secondary rounded-lg shadow-sm  my-5"
          onClick={handleSubmit}
        >
          <div className="flex py-2 px-12 items-center ">
            <button className="rounded-lg font-plusBold text-lg shadow-sm hover:bg-bgsecondary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
