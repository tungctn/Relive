import logo from "../../assets/img/landingPage/ReliveLogo.png";
import logoutimg from "../../assets/img/dashboard/logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdUpload } from "react-icons/md";
import { useState } from "react";
const DashboardSidebar = (props) => {
  const navigate = useNavigate();
  const logout = async () => {
    await fetch("/logout");
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/");
  };

  const [Toggle, setToggle] = useState("Dashboard");
  return (
    <div className="fixed h-[100vh] w-screen grid grid-cols-12">
      <div className="side_bar bg-white shadow-md col-span-2 relative">
        <div className="flex m-2 mt-4 ">
          <div className="logo m-2  ">
            <img src={logo} className="w-16" alt="logo"></img>
          </div>
          <div className="heading font-plusBold text-xl ">
            <Link to="/">
              <h1>Relive Health Management</h1>
            </Link>
          </div>
        </div>
        <nav>
          <Link
            to="/doctor/dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  ">
                <MdDashboard size={24} />
              </div>
              <div className="font-plusBold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>
          <Link
            to="/doctor/videoUpload"
            onClick={() => setToggle("Video_upload")}
            className={
              Toggle === "Video_upload" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-6">
              <div className="w-6 ml-4">
                <MdUpload size={26} />
              </div>

              <h1 className="font-plusBold ml-4">Upload Exercise</h1>
            </div>
          </Link>
        </nav>

        <div className=" mx-auto py-2  flex justify-center  bg-secondary  rounded-xl font-plusBold  shadow-sm hover:bg-bgsecondary w-4/5 absolute bottom-2.5 left-1/2 transform -translate-x-1/2">
          <button className="flex items-center" onClick={logout}>
            <img src={logoutimg} className="h-4 px-2 " alt="logout"></img>Logout
          </button>
        </div>
      </div>
      <div className="col-span-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardSidebar;
