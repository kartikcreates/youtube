import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
export default function Subscribebutton({ currentuser, userId }) {
  if (!currentuser) {
    return "login";
  } else {
    if (
      currentuser.user.subscribedusers.find((elem) => {
        return elem === userId;
      })
    ) {
      console.log("unsubsrcibe");
      return (
        <Button
          variant="contained"
          style={{ backgroundColor: "grey" }}
          onClick={(e) => {
            if (e.target.innerText === "SUBSCRIBE") {
              e.target.style["background-color"] = "grey";
              e.target.innerText = "unsubscribe";

              axios
                .put(
                  "http://localhost:8001/api/user/sub/" + userId,
                  {},
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res.data);
                });
            } else if (e.target.innerText === "UNSUBSCRIBE") {
              e.target.style["background-color"] = "red";
              e.target.innerText = "subscribe";

              axios
                .put(
                  "http://localhost:8001/api/user/unsub/" + userId,
                  {},
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res.data);
                });
            }
          }}
        >
          unsubscribe
        </Button>
      );
    } 
    
    else {
      return (
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={(e) => {
            if (e.target.innerText === "SUBSCRIBE") {
              e.target.style["background-color"] = "grey";
              e.target.innerText = "unsubscribe";

              axios
                .put(
                  "http://localhost:8001/api/user/sub/" + userId,
                  {},
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res.data);
                });
            } else if (e.target.innerText === "UNSUBSCRIBE") {
              e.target.style["background-color"] = "red";
              e.target.innerText = "subscribe";

              axios
                .put(
                  "http://localhost:8001/api/user/unsub/" + userId,
                  {},
                  { withCredentials: true }
                )
                .then((res) => {
                  console.log(res.data);
                });
            }
          }}
        >
          subscribe
        </Button>
      );
    }
  }
}
