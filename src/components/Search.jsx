import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AudioPlayer from "react-h5-audio-player";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [musics, setMusics] = useState([]);
  const [audio, setAudio] = useState({});

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  async function submit(data) {
    let query = data.search;
    let res = await fetch(`${serverUrl}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    let response = await res.json();
    setMusics(response);
  }

  async function getSongData(id, thumbnailUrl) {
    let res = await fetch(`${serverUrl}/song`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    let response = await res.json();
    let audio = response[0];
    audio["thumbnailUrl"] = thumbnailUrl;
    setAudio(audio);

    console.log(response);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="container flex flex-col mt-4 mx-2 items-center relative">
        <div className="w-[45vw] flex flex-col items-center">
            <form onSubmit={handleSubmit(submit)} className="flex w-full">
              <div className="border-2 rounded-lg px-3 py-2 w-full bg-gray-200 flex items-center">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  className="outline-none bg-transparent w-full ml-2"
                  {...register("search")}
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Type song name"
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.length > 0) {
                      submit({ search: value });
                    } else {
                      setMusics([]);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-2.5 rounded-lg ml-2"
              >
                Search
              </button>
            </form>

          <div className="flex flex-col justify-center py-2 space-y-2 w-full">
            {musics.length > 0 &&
              musics.map((music, index) => (
                <div
                  onClick={() => {
                    getSongData(music.youtubeId, music.thumbnailUrl);
                  }}
                  key={index}
                  className="flex cursor-pointer hover:bg-gray-200 p-1 rounded-lg items-start w-full"
                >
                  <img
                    className="w-20 h-20 rounded-md"
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
              ))}
          </div>
        </div>
      </div>
      {audio.url && (
        <div className="sticky bottom-0 bg-white flex justify-center p-2 space-x-2 w-full">
          <img
            className="w-20 h-20 rounded-md"
            src={audio.thumbnailUrl}
            alt="Img"
          />
          <AudioPlayer
            autoPlay
            src={audio.url}
            layout="stacked"
            customVolumeControls={[]}
            style={{
              width: "50%",
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
