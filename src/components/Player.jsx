import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useNavigate } from "react-router-dom";

const Player = ({
  audio,
  expandSong,
  setExpandSong,
  musicLoading,
  handleNext,
  handlePrev,
  suggestions,
}) => {
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handleBackButton = (event) => {
      event.preventDefault();
      setExpandSong(false);
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [expandSong]);

  return (
    <>
      {(musicLoading || audio.youtubeId) && (
        <div
          className={`
            ${musicLoading ? "justify-center" : "justify-between"}
            ${
              expandSong
                ? "flex flex-col items-center justify-between p-[3.5vh]"
                : "fixed bottom-0 h-[10vh] sm:h-[15vh] flex sm:justify-center items-center px-2 sm:px-4 py-2.5 sm:space-x-2"
            }
             bg-white w-full`}
        >
          {musicLoading ? (
            <svg
              aria-hidden="true"
              role="status"
              className={`
                ${expandSong ? "my-[38vh]" : "my-1"}
                inline w-8 h-8 sm-w-10 sm-h-10 text-blue-500 animate-spin dark:text-blue-300"`}
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
            <>
              <div
                className={`
            ${
              expandSong
                ? "flex flex-col items-center justify-between"
                : "fixed bottom-0 h-[10vh] sm:h-[15vh] flex sm:justify-center items-center"
            }
             w-full`}
                style={{
                  height: expandSong
                    ? `calc(${window.innerHeight}px - 15vh)`
                    : null,
                  maxHeight: expandSong
                    ? `calc(${window.innerHeight}px - 15vh)`
                    : null,
                }}
              >
                <div
                  onClick={() => {
                    setExpandSong(true);
                  }}
                  className={`
            ${
              expandSong
                ? "block"
                : "cursor-pointer sm:absolute sm:left-4 flex sm:space-x-2 items-center max-w-[20vw]"
            }
            `}
                >
                  <img
                    className={`
                ${
                  expandSong
                    ? "w-60 h-60 rounded-md"
                    : "min-w-12 h-12 object-cover sm:w-20 sm:h-20 rounded-sm"
                }`}
                    src={audio.thumbnailUrl}
                    alt="Img"
                  />
                  <div
                    className={`
              ${
                expandSong
                  ? "flex flex-col mt-2 max-w-60"
                  : "hidden sm:flex sm:flex-col"
              }
              `}
                  >
                    <p
                      className={`${
                        expandSong
                          ? "text-[1.2rem] tracking-tight sm:tracking-normal line-clamp-2"
                          : "line-clamp-1"
                      } font-semibold`}
                    >
                      {audio.title}
                    </p>
                    <p
                      className={`${
                        expandSong ? "line-clamp-2" : "line-clamp-1"
                      } text-sm line-clamp-1 tracking-tight sm:tracking-normal`}
                    >
                      {audio.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
                <AudioPlayer
                  autoPlay
                  src={serverUrl + "/api/song/stream/?id=" + audio.youtubeId}
                  layout="stacked"
                  customVolumeControls={[]}
                  showJumpControls={false}
                  showSkipControls={true}
                  defaultCurrentTime="00:00"
                  defaultDuration="00:00"
                  onClickNext={handleNext}
                  onClickPrevious={handlePrev}
                  onEnded={handleNext}
                  className={`
              ${expandSong ? "song-expanded" : "song-collapsed"}
               w-[90vw] sm:w-1/2 bg-transparent border-none shadow-none m-0 p-0`}
                />

                {/* Expand icon */}
                <svg
                  enableBackground="new 0 0 32 32"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 32 32"
                  className={`
              ${expandSong ? "block" : "sm:absolute sm:right-4"}
              ${
                expandSong
                  ? "w-11 min-h-11 p-2"
                  : "min-w-8 h-8 sm:w-10 sm:h-10 max-w-[25vw] p-1.5"
              }
                p-1 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer ${
                  expandSong ? "rotate-180" : "rotate-0 mr-4 sm:mr-0"
                } `}
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  onClick={() => {
                    setExpandSong(!expandSong);
                  }}
                >
                  <path
                    d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"
                    fill="#000"
                  />
                </svg>
              </div>
              {expandSong && (
                <div className="pt-[3vh] flex flex-col self-start w-full">
                  <p className="text-xl font-semibold">Suggestions</p>
                  <div className="flex flex-col justify-center space-y-2 w-full mt-3">
                    {suggestions.map((music, index) => {
                      if (music.youtubeId === audio.youtubeId) return null;
                      return (
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
                              {music.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Player;
