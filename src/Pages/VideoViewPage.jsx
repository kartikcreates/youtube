import React from "react";
import VideoUrl from "../public/samplevideo.mp4";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import UserImg from "../components/UserImg";

const ViewandTime = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 15px;
`;
const ViewsCount = styled.div``;
const UploadTime = styled.div``;
export default function VideoViewPage(props) {
  let [videodata, setvideodata] = useState({});
  let { videoid } = useParams();
  let [inputcomment, setinputcomment] = useState("");
  let [allcomments, setallcomments] = useState([]);
  console.log("video", videoid);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/video/video/" + videoid, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("sfsffasffewfew", res);

        setvideodata(res.data);
        console.log("sadsd", res.data.videourl);

        var video = document.getElementById("videoplayer");
        var source = document.createElement("source");

        source.setAttribute("src", res.data.videourl);
        source.setAttribute("type", "video/mp4");

        video.appendChild(source);
        axios
          .put("http://localhost:8001/api/video/video/view/" + videoid)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    //comments
    axios
      .get("http://localhost:8001/api/comment/getcomments/" + videoid)
      .then((res) => {
        console.log(res.data);
        setallcomments(res.data);
      });
  }, [videoid]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <video onPlay={(e) => {}} id="videoplayer" controls width="720">
            Sorry, your browser doesn't support embedded videos.
          </video>

          <h2>{videodata.title}</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ViewandTime>
              <ViewsCount>{videodata.views} views</ViewsCount> •
              <UploadTime>{format(videodata.createdAt)}</UploadTime>
            </ViewandTime>

            <div>
              {" "}
              <ThumbUpOffAltIcon></ThumbUpOffAltIcon>
              {videodata.likes ? videodata.likes.length : 0}
              <ThumbDownOffAltIcon></ThumbDownOffAltIcon>
              {videodata.dislikes ? videodata.dislikes.length : 0}
              <ShareIcon></ShareIcon>
            </div>
          </div>

          <div>{videodata.desc}</div>
          <h3>Comments</h3>
          <div>
            {" "}
            <TextField
              onChange={(e) => {
                setinputcomment(e.target.value);
              }}
              value={inputcomment}
              style={{ width: "70%" }}
              id="input-with-icon-textfield"
              label=" Add Comment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button
              variant="outlined"
              onClick={(ev) => {
                console.log(inputcomment);
                axios
                  .post(
                    "http://localhost:8001/api/comment/addcomment",
                    { videoId: videoid, desc: inputcomment },
                    { withCredentials: true }
                  )
                  .then((res) => console.log(res.data))
                  .catch((err) => {
                    console.log(err);
                  });
                setinputcomment("");
              }}
            >
              Add Comment
            </Button>
          </div>
          <br></br>
          <br></br>
          <div>
            {allcomments.map((elem) => {
              return (
                <div key={elem._id}>

                  <p><UserImg id={elem.userId}/> {elem.desc}</p>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
