import React, { useEffect } from "react";
import VideoBox from "../components/VideoBox";
import { Link, useLocation,useParams} from "react-router-dom";
import { useState } from "react";

export default function VideoPage(props) {
  const [Videos, setVideos] = useState([]);
  let location=useParams();
  console.log("params",location)

  
  useEffect(() => {
 
    
    
    fetch("http://localhost:8001/api/video/"+props.type,{credentials:'include'})
      .then((res) => res.json())
      .then((videos) => {
        console.log(videos);
        setVideos(videos);
      });
  }, [props.type]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {Videos.map((video) => {
        return (
          <Link key={video._id} style={{ textDecoration: "none" }} to={"/video/"+video._id}>
            <VideoBox  videodata={video}></VideoBox>

          </Link>
        );
      })}
    </div>
  );
}
