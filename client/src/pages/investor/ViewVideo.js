import React, { useEffect, useState } from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const ViewVideo = () => {
  const { get } = useAxiosMethods();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    get("/investors/viewVideo",setVideoData);
  }, []);

  return (
    <div>
      <h1>View Video</h1>
      {videoData && (
        <video controls width="640" height="360">
        <source src={URL.createObjectURL(new Blob([videoData], { type: "video/mp4" }))} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      )}
    </div>
  );
};

export default ViewVideo;
