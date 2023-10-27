import React, { useState, useRef } from "react";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Rings } from "react-loader-spinner";

const images = [
  "https://picsum.photos/id/1018/1000/600/",
  "https://picsum.photos/id/1015/1000/600/",
  "https://picsum.photos/id/1019/1000/600/",
];

SwiperCore.use([Navigation]);
const VideoUpload = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [specialCondition, setSpecialCondition] = useState("");
  const fileInputRef = useRef(null);
  const [isShowUpper, setIsShowUpper] = useState(false);
  const [isShowLower, setIsShowLower] = useState(false);
  const [loadPose, setLoadPose] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const initialData = [
    { stt: 1, bodyPart: "Part 1", angle: 45, tolerance: 0.1 },
    { stt: 2, bodyPart: "Part 2", angle: 60, tolerance: 0.2 },
    { stt: 3, bodyPart: "Part 3", angle: 30, tolerance: 0.05 },
    { stt: 4, bodyPart: "Part 4", angle: 75, tolerance: 0.15 },
    { stt: 5, bodyPart: "Part 5", angle: 90, tolerance: 0.3 },
  ];

  const [data, setData] = useState(initialData);
  const [angles, setAngles] = useState([]);
  const [angleIndex, setAngleIndex] = useState(0);

  const handleToleranceChange = (index, newValue) => {
    const updatedData = [...angles];
    updatedData[angleIndex].tolerance[index] = Number(newValue);
    setAngles(updatedData);
  };
  const [upperproblemlist, setupperproblemlist] = useState([
    { problem: "", level: "" },
  ]);
  const [lowerproblemlist, setlowerproblemlist] = useState([
    { problem: "", level: "" },
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

  const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://117.1.29.174:4000/upload-video", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video uploaded successfully. URL:", data.videoUrl);
        setVideoSrc(data.videoUrl);
        setIsLoadingImages(true);
        fetch(
          `http://117.1.29.174:8000/landmark-prediction/${data.filePath}?o=${data.fileOutput}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(
              data.angles.map((angle) => {
                return {
                  ...angle,
                  tolerance: Object.keys(angle).map((_) => 10),
                  isCheck: Object.keys(angle).map((_) => false),
                };
              })
            );
            setImages(data.images);
            setAngles(
              data.angles.map((angle) => {
                return {
                  ...angle,
                  tolerance: Object.keys(angle).map((_) => 10),
                  isCheck: Object.keys(angle).map((_) => false),
                };
              })
            );
            setIsLoadingImages(false);
          });
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
      uploadVideo(file); // Gọi hàm upload video
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
    console.log("Current Slide Index:", swiper.realIndex);
    setAngleIndex(swiper.realIndex);
  };

  return (
    <div className="w-[1100px] mx-[100px] mt-[100px] overflow-y-auto">
      <div className="flex">
        <div className="w-[50%]">
          <h1 className="text-2xl font-plusBold p-2">Add Exercise</h1>
        </div>
        <div className="w-[50%]">
          <h1 className="text-2xl font-plusBold p-2">Disease</h1>
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
          className="w-[45%] h-[300px] border-2 border-dashed border-gray-400 relative flex justify-center items-center mb-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {videoSrc ? (
            <video className="w-full h-full object-contain" controls>
              <source src={videoSrc} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          ) : (
            <>
              <p>Kéo và thả video của bạn vào đây hoặc</p>
              <div className="text-4xl ml-2 cursor-pointer">+</div>
            </>
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
              className="border-2 p-2 w-full mb-5"
            />
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
            <label for="upperCheckbox"> Upper</label>
            <br />
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
            <label for="lowerCheckbox"> Lower</label>
            {isShowUpper && (
              <div className="lg:grid lg:grid-cols-10 gap-2 mt-5 mr-4">
                <div className="col-span-3">
                  <label className=" text-base font-bold px-4 grid col-start-1 col-span-3 pt-2">
                    Upper problem
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
                            // console.log(e.target.value);
                            let upperproblemlist1 = [...upperproblemlist];
                            upperproblemlist1[index].problem = e.target.value;
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

                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={upperproblemlist.level}
                          onChange={(e) => {
                            let upperproblemlist1 = [...upperproblemlist];
                            upperproblemlist1[index].level = e.target.value;
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
                          className="col-span-1 pl-3 mt-2"
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
            )}

            {isShowLower && (
              <div className="lg:grid lg:grid-cols-10 gap-2 mt-4 mr-4">
                <div className="col-span-3">
                  <label className=" text-base font-bold px-4 grid col-start-1 col-span-3 pt-2">
                    Lower problem
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
                            lowerproblemlist1[index].problem = e.target.value;
                            setlowerproblemlist(lowerproblemlist1);
                            // let temppatient = { ...patient };
                            // temppatient.lowerProblem = lowerproblemlist;
                            // setPatient(temppatient);
                          }}
                        >
                          <option value="">Body part</option>
                          <option value="lowerBack">Lower Back</option>
                          <option value="leg">Leg</option>
                          <option value="knee">Knee</option>
                          <option value="thigh">Thigh</option>
                          <option value="ankle">Ankle</option>
                          <option value="foot">Foot</option>
                        </select>

                        <select
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2 ml-4"
                          name="level"
                          value={lowerproblemlist.level}
                          onChange={(e) => {
                            let lowerproblemlist1 = [...lowerproblemlist];
                            lowerproblemlist1[index].level = e.target.value;
                            setlowerproblemlist(lowerproblemlist1);
                            // let temppatient = { ...patient };
                            // temppatient.lowerProblem = lowerproblemlist;
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
                          className="col-span-1 pl-3 mt-2"
                          onClick={() => {
                            if (lowerproblemlist.length > 1) {
                              let lowerproblemlist1 = [...lowerproblemlist];
                              lowerproblemlist1.splice(index, 1);
                              // let temppatient = { ...patient };
                              // temppatient.lowerProblems = lowerproblemlist1;
                              // setPatient(temppatient);
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
            )}

            <input
              type="text"
              placeholder="Special Condition"
              value={specialCondition}
              onChange={(e) => setSpecialCondition(e.target.value)}
              className="border-2 p-2 w-full my-4"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-[45%]">
          <h1 className="text-2xl font-plusBold p-2 ">{`Pose image (${images.length})`}</h1>
          {isLoadingImages ? (
            // <div>Loading pose images...</div>
            <Rings color="#00BFFF" height={80} width={80} />
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
        <div className="w-2/5">
          <h1 className="text-2xl font-plusBold p-2 ">Angle table</h1>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-gray-400 p-2">Sel.</th>
                <th className="border border-gray-400 p-2">Body part</th>
                <th className="border border-gray-400 p-2">Angle</th>
                <th className="border border-gray-400 p-2">Tolerance (%)</th>
              </tr>
            </thead>
            <tbody>
              {angles.length > 0 &&
                Object.keys(angles[angleIndex])?.map((item, index) => {
                  if (item != "tolerance" && item != "isCheck")
                    return (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2">
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
                        <td className="border border-gray-400 p-2">
                          <input
                            type="number"
                            value={angles[angleIndex].tolerance[index]}
                            onChange={(e) =>
                              handleToleranceChange(index, e.target.value)
                            }
                            className="border-2 p-2 w-full"
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
      <div className="flex justify-center">
        <div
          className="items-center grid col-start-8 h-10 bg-secondary rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary w-[100px] my-5"
          onClick={handleSubmit}
        >
          <div className="flex py-2 px-4 items-center ">
            <button className="ml-2 flex  rounded-lg font-semibold font-plus shadow-sm hover:bg-bgsecondary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
