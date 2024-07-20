import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showNav, setShowNav, setExpandSong }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`z-50 fixed left-0 shadow-xl transform ${
        showNav ? "translate-x-0" : "-translate-x-full"
      } w-[60vw] sm:w-[20vw] bg-white p-5 h-screen transition-transform duration-500 ease-in-out`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="2.5rem"
        height="2.5rem"
        viewBox="0 0 30 30"
        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-100 rounded-full p-3"
        onClick={() => {
          setShowNav(false);
        }}
      >
        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
      </svg>

      <ul className="flex flex-col space-y-3 mt-5">
        <li className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="2rem"
            height="2rem"
            viewBox="0 0 50 50"
            className="p-1"
          >
            <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
          </svg>
          <p
            onClick={() => {
              navigate("/");
              setExpandSong(false);
              setShowNav(false);
            }}
            className="font-semibold"
          >
            Home
          </p>
        </li>
        <li className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer rounded-lg">
          <svg
            height="2rem"
            width="2rem"
            className="p-1"
            version="1.1"
            viewBox="0 0 20 21"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title />
            <desc />
            <defs />
            <g
              fill="none"
              fillRule="evenodd"
              id="Page-1"
              stroke="none"
              strokeWidth="1"
            >
              <g
                fill="#000000"
                id="Core"
                opacity="0.9"
                transform="translate(-464.000000, -254.000000)"
              >
                <g id="history" transform="translate(464.000000, 254.500000)">
                  <path
                    d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </g>
          </svg>
          <p
            onClick={() => {
              navigate("/history");
              setShowNav(false);
            }}
            className="font-semibold"
          >
            History
          </p>
        </li>
        <li className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer rounded-lg">
          <svg
            fill="none"
            height="2rem"
            width="2rem"
            className="p-1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <p className="font-semibold">Profile</p>
        </li>
        <li
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            navigate("/signin");
          }}
          className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer rounded-lg"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            height="2rem"
            width="2rem"
            className="p-1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="info" />
            <g id="icons">
              <g id="exit2">
                <path d="M12,10c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2s-2,0.9-2,2v4C10,9.1,10.9,10,12,10z" />
                <path d="M19.1,4.9L19.1,4.9c-0.3-0.3-0.6-0.4-1.1-0.4c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.2,0.8,0.4,1.1l0,0c0,0,0,0,0,0c0,0,0,0,0,0    c1.3,1.3,2,3,2,4.9c0,3.9-3.1,7-7,7s-7-3.1-7-7c0-1.9,0.8-3.7,2.1-4.9l0,0C7.3,6.8,7.5,6.4,7.5,6c0-0.8-0.7-1.5-1.5-1.5    c-0.4,0-0.8,0.2-1.1,0.4l0,0C3.1,6.7,2,9.2,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,9.2,20.9,6.7,19.1,4.9z" />
              </g>
            </g>
          </svg>

          <p className="font-semibold">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
