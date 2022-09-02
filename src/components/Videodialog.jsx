import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { storage } from "../firebase";
import { Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import axios from "axios";


export default function Videodialog({ open, setOpen }) {
  const [title, settitle] = React.useState("");
  const [desc, setdesc] = React.useState("");
  const [tags, settags] = React.useState("");
  const [image, setimage] = React.useState(null);
  const [video, setvideo] = React.useState(null);
  const [progresscirc, setprogresscirc] = React.useState(0);
  const [progresscircimage, setprogresscircimage] = React.useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    if (image == null || video == null) {
      alert("required");
    } else {
      const imageref = ref(storage, uuidv4());
      const videoref = ref(storage, uuidv4());

      const uploadTaskvideo = uploadBytesResumable(videoref, video);
      const uploadTaskimage = uploadBytesResumable(imageref, image);

      uploadTaskimage.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setprogresscircimage(progress);
          console.log("image", progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTaskimage.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTaskvideo.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setprogresscirc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTaskvideo.snapshot.ref).then(
            (downloadURLvid) => {

              uploadTaskimage.on(
                'state_changed',
                null,
                null,
                function () {


                  getDownloadURL(uploadTaskimage.snapshot.ref).then(
                    (downloadURLimg) => {

                      console.log("File available at image", downloadURLimg);
                      console.log("File available at video", downloadURLvid);
                      console.log("title", title);
                      console.log("desc", desc);
                      console.log("tags", tags);

                      axios.post('http://localhost:8001/api/video/video', { "title": title, "desc": desc, "imgurl": downloadURLimg, "videourl": downloadURLvid }, { withCredentials: true }).then((val) => {
                        console.log(val)
                        setOpen(false);
                      }).catch((err) => {
                        console.log(err)
                      })
                    }
                  );
                  console.log('upload complete!');
                });


            }
          );
        }
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Video</DialogTitle>
        <DialogContent>
          <form>
            <br></br>
            <TextField
              required
              id="outlined-required"
              onChange={(e) => {
                settitle(e.target.value);
              }}
              label="Title"
            />
            <br></br>
            <br></br>
            <TextField
              multiline
              required
              id="outlined-multiline-flexible"
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              label="Description"
            />
            <br></br>
            <br></br>
            <TextField
              multiline
              required
              id="outlined-multiline-flexible"
              onChange={(e) => {
                settags(e.target.value);
              }}
              label="comma separated tags"
            />
            <br></br>
            <br></br>
            <label htmlFor="imagefile">Screenshot</label>
            <input
              type="file"
              id="imagefile"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
              accept="image/*"
            ></input>

            <div>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={progresscircimage}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {`${Math.round(progresscircimage)}%`}
                  </Typography>
                </Box>
              </Box>
            </div>
            <br></br>
            <br></br>
            <label htmlFor="videofile">Video</label>
            <input
              type="file"
              id="videofile"
              onChange={(e) => {
                setvideo(e.target.files[0]);
              }}
              accept="video/*"
            ></input>

            <div>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={progresscirc} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {`${Math.round(progresscirc)}%`}
                  </Typography>
                </Box>
              </Box>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
