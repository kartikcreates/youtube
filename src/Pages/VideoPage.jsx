import React, { useEffect } from "react";
import VideoBox from "../components/VideoBox";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function VideoPage(props) {
  const [Videos, setVideos] = useState([]);
  let location = useParams();
  console.log("params", location)
  let navigate=useNavigate();

  useEffect(() => {

    console.log("type of prop", props.type, props.searchterm)
    if (props.searchterm === '' || props.searchterm === undefined) {



      fetch("http://localhost:8001/api/video/" + props.type, { credentials: 'include' })
        .then((res) => res.json())
        .then((videos) => {
          console.log("here is message",videos);
          if(videos==="not authenticated"){
           return navigate('/login');
          }
          setVideos(videos);
        }).catch((err)=>{
          console.log("errrrroooor",err)

        });


    } else {



    }
  }, [props.type]);
  useEffect(() => {
    fetch("http://localhost:8001/api/video/search?q=" + props.search, { credentials: 'include' })
      .then((res) => res.json())
      .then((videos) => {
        console.log(videos);
        setVideos(videos);
      });
  }, [props.search])
  console.log("videos are this: ", Videos)

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
          <Link key={video._id} style={{ textDecoration: "none" }} to={"/video/" + video._id}>
            <VideoBox videodata={video}></VideoBox>
          </Link>
        );
      })}
    </div>
  );
}