import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const History = () => {
  const navigate = useNavigate();
  const [musics, setMusics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    let res = await api.post(
      "/api/history/getSongs",
      { email: localStorage.getItem("email") },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    let response = res.data;
    let { data } = response;
    setMusics(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Nav bar */}
      <div className="sticky top-0 flex w-full bg-white px-4 py-3 items-center h-[9vh] sm:h-[10vh] shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          id="left-arrow"
          className="hover:cursor-pointer sm:hover:bg-gray-200 hover:rounded-lg h-[2.6rem] w-[2.6rem] p-2.5 active:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <path d="M27 14H9.83l6.58-6.59a2 2 0 0 0-2.82-2.82l-10 10a1.79 1.79 0 0 0-.25.31 1.19 1.19 0 0 0-.09.15l-.1.2-.06.2a.84.84 0 0 0 0 .17 2 2 0 0 0 0 .78.84.84 0 0 0 0 .17l.06.2c0 .07.07.13.1.2a1.19 1.19 0 0 0 .09.15 1.79 1.79 0 0 0 .25.31l10 10a2 2 0 0 0 2.82-2.82L9.83 18H27a2 2 0 0 0 0-4Z"></path>
        </svg>
        <h1 className="text-[1.3rem] font-bold ml-1 sm:text-[1.4rem]">
          History
        </h1>
      </div>
      {isLoading ? (
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-10 h-10 me-4 mt-4 text-blue-500 animate-spin dark:text-blue-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#bbbbbb"
          />
        </svg>
      ) : (
        <div className="flex flex-col justify-center py-4 px-5 space-y-2 w-full">
          {musics.length > 0 ? (
            musics.map((music, index) => (
              <div
                onClick={() => {
                  navigate("/", { state: { music } });
                }}
                key={index}
                className="flex cursor-pointer hover:bg-gray-200 p-1 rounded-lg items-start w-full"
              >
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md"
                  src={music.thumbnailUrl}
                  alt="Img"
                />
                <div className="ml-2 w-full">
                  <p className="w-full font-semibold line-clamp-1">
                    {music.title}
                  </p>
                  <p className="text-sm line-clamp-1">
                    {music.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No history found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
