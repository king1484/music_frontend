import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";
import Player from "./Player";

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [searchMusics, setsearchMusics] = useState([]);
  const [audio, setAudio] = useState({});
  const [showSearchList, setShowSearchList] = useState(false);
  const inputRef = useRef(null);
  const [homeMusics, setHomeMusics] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const [expandSong, setExpandSong] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  const homeMusicsQueries = [
    "Trending telugu songs",
    "Trending hindi songs",
    "Trending english songs",
  ];
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    document.addEventListener("mousedown", handleClickOutside);
    loadHomeMusics();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function playMusicFromHistory(music) {
    await fetch(`${serverUrl}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        music: music,
        youtubeId: music.youtubeId,
        email: localStorage.getItem("email"),
      }),
    });
    navigate(location.pathname, { replace: true });
    loadSuggestions(music);
  }

  useEffect(() => {
    if (location.state && location.state.music) {
      playMusicFromHistory(location.state.music);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (searchIconClicked) {
      inputRef.current[0].focus();
    }
  }, [searchIconClicked]);

  const handleClickOutside = (event) => {
    if (event.target.id != "search" && !event.target.closest("#search-box")) {
      setShowSearchList(false);
    }
  };

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  async function submit(data) {
    if (data.search.length == 0) {
      return;
    }
    let query = data.search;
    let res = await fetch(`${serverUrl}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    let response = await res.json();
    setShowSearchList(true);
    setsearchMusics(response);
  }

  const [suggestions, setSuggestions] = useState([]);

  async function loadSuggestions(music) {
    setAudio({});
    setSearchIconClicked(false);
    setShowSearchList(false);
    setMusicLoading(true);
    const res = await fetch(`${serverUrl}/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId: music.youtubeId }),
    });
    const data = await res.json();
    setSuggestions(data);
    getSongData(data[0]);
  }

  async function getSongData(music) {
    setAudio({});
    setSearchIconClicked(false);
    setShowSearchList(false);
    setMusicLoading(true);

    let audio = {};
    audio["thumbnailUrl"] = music.thumbnailUrl;
    audio["artists"] = music.artists;
    audio["title"] = music.title;
    audio["youtubeId"] = music.youtubeId;

    await fetch(`${serverUrl}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        music: audio,
        youtubeId: music.youtubeId,
        email: localStorage.getItem("email"),
      }),
    });

    navigator.mediaSession.metadata = new MediaMetadata({
      title: audio.title,
      artist: audio.artists.map((artist) => artist.name).join(", "),
      artwork: [{ src: music.thumbnailUrl, sizes: "512x512" }],
    });

    setMusicLoading(false);
    setAudio(audio);
  }

  async function handleNext() {
    let index = suggestions.findIndex(
      (suggestion) => suggestion.youtubeId == audio.youtubeId
    );
    if (index == suggestions.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    getSongData(suggestions[index]);
  }

  async function handlePrev() {
    let index = suggestions.findIndex(
      (suggestion) => suggestion.youtubeId == audio.youtubeId
    );
    if (index == 0) {
      index = suggestions.length - 1;
    } else {
      index -= 1;
    }
    getSongData(suggestions[index]);
  }

  async function loadHomeMusics() {
    const fetchPromises = homeMusicsQueries.map(async (query) => {
      const res = await fetch(`${serverUrl}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const response = await res.json();
      return { query, musics: response };
    });

    const results = await Promise.all(fetchPromises);
    setHomeMusics(results);
  }

  return (
    <div
      style={{ height: window.innerHeight }}
      className="flex flex-col items-center"
    >
      <div
        className={`w-full flex flex-col mx-2 pt-[9vh] sm:pt-[10vh] items-center ${
          expandSong ? "pb-0" : audio.youtubeId ? "pb-[4.3rem]" : "pb-0"
        }`}
      >
        <div className="z-10 fixed top-0 flex flex-col w-full items-center">
          {/* Nav bar */}
          <div className="flex w-full justify-between bg-white px-4 py-3 items-center h-[9vh] sm:h-[10vh] shadow-sm">
            <div className="flex items-center">
              {/* Menu icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                className={`
                  ${searchIconClicked ? "hidden" : "block"}
                  hover:cursor-pointer sm:hover:bg-gray-200 hover:rounded-lg h-[2.6rem] w-[2.6rem] p-2.5 active:bg-gray-200`}
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
              </svg>
              <p
                className={`${
                  searchIconClicked ? "hidden" : "block text-[1.3rem] ml-1"
                } "text-2xl font-semibold ml-4"`}
                style={{ fontFamily: "Francois One" }}
              >
                Music Fusion
              </p>
            </div>

            <div
              className={`${
                searchIconClicked ? "w-[90vw]" : null
              } sm:w-[45vw] flex flex-col items-center`}
            >
              {/* Search icon */}
              {searchIconClicked === false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="2rem"
                  width="2rem"
                  onClick={() => {
                    setSearchIconClicked(true);
                  }}
                  className="sm:hidden hover:cursor-pointer hover:bg-gray-200 p-0.5 rounded-sm"
                >
                  <g>
                    <path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path>
                  </g>
                </svg>
              ) : null}

              {/* Search form */}
              <form
                ref={inputRef}
                onSubmit={handleSubmit(submit)}
                className={`${
                  searchIconClicked ? "flex" : "hidden"
                } sm:flex w-full`}
              >
                <div className="border-2 rounded-lg px-3 py-2 w-full bg-gray-200 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <input
                    autoFocus={true}
                    className="outline-none bg-transparent w-full ml-2"
                    {...register("search")}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Type song name"
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.length != "") {
                        submit({ search: value });
                      } else {
                        setsearchMusics([]);
                        setShowSearchList(false);
                      }
                    }}
                  />
                  {/* Cancel icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 30 30"
                    className={`
                    sm:${
                      inputRef.current
                        ? inputRef.current[0].value.length > 0
                          ? "block"
                          : "hidden"
                        : "hidden"
                    }
                    min-w-[1.6rem] h-[1.6rem] hover:cursor-pointer hover:bg-gray-300 bg-gray-100 rounded-full p-1`}
                    onClick={() => {
                      inputRef.current[0].value = "";
                      setSearchIconClicked(false);
                      setsearchMusics([]);
                    }}
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </div>
                <button
                  type="submit"
                  className="hidden sm:block bg-blue-600 text-white px-2.5 rounded-lg ml-2"
                >
                  Search
                </button>
              </form>

              {showSearchList && (
                <div className="absolute top-14 mt-1 w-[90vw] sm:w-[45vw] h-[45vh] justify-center py-2 px-1 space-y-2 bg-white overflow-auto">
                  {searchMusics.map((music, index) => (
                    <div
                      id="search-box"
                      onClick={() => {
                        loadSuggestions(music);
                      }}
                      key={index}
                      className="flex cursor-pointer sm:hover:bg-gray-200 active:bg-gray-200 p-1 rounded-lg items-start w-full"
                    >
                      <img
                        className="w-12 h-12 sm:w-20 sm:h-20 rounded-sm"
                        src={music.thumbnailUrl}
                        alt="Img"
                      />
                      <div className="ml-2 w-full">
                        <p className="w-full font-semibold line-clamp-1 tracking-tight sm:tracking-normal">
                          {music.title}
                        </p>
                        <p className="text-sm line-clamp-1 tracking-tight sm:tracking-normal">
                          {music.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:block"></div>
          </div>
        </div>

        {/* Content */}
        {expandSong == false ? (
          homeMusics.length > 0 ? (
            homeMusics.map((homeMusic, index) => (
              <div
                key={index}
                className="flex flex-col w-full px-5 py-4 space-y-3.5 border-b-2"
              >
                <p className="text-xl font-semibold tracking-tight sm:tracking-normal">
                  {homeMusic.query}
                </p>
                <div className="flex space-x-3 overflow-x-auto w-full">
                  {homeMusic.musics.map((music, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        loadSuggestions(music);
                      }}
                      className="flex flex-col sm:hover:bg-gray-200 min-w-32 active:bg-gray-200 p-1 rounded-lg cursor-pointer"
                    >
                      <img
                        className="w-full h-32 rounded-md"
                        src={music.thumbnailUrl}
                        alt="Img"
                      />
                      <p className="text-[15px] tracking-tight sm:tracking-normal sm:text-base font-semibold mt-1 line-clamp-2 leading-5">
                        {music.title}
                      </p>
                      <p className="text-sm tracking-tight sm:tracking-normal leading-5 line-clamp-1">
                        {music.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-10 h-10 me-3 text-gray-300 animate-spin dark:text-gray-200 mt-[40vh]"
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
                fill="#2563EB"
              />
            </svg>
          )
        ) : null}
      </div>
      {/* Side bar */}
      <Sidebar
        showNav={showNav}
        setShowNav={setShowNav}
        setExpandSong={setExpandSong}
      />

      {/* Player */}
      <Player
        audio={audio}
        setAudio={setAudio}
        expandSong={expandSong}
        setExpandSong={setExpandSong}
        musicLoading={musicLoading}
        suggestions={suggestions}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default Home;
