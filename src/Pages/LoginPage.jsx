import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginFail, logout, loginSucces } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  height: 500px;
  width: 350px;
  background-color: #f3ffe3;
  color: black;
  margin: auto;
  text-align: center;
  margin: 50px;
  border-radius: 30px;
`;
export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setloading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function login(e) {
    dispatch(loginStart());
    e.preventDefault();
    setloading(true);
    console.log(email, password);

    const loginendpoint = "http://localhost:8001/api/auth/signin";
    axios
      .post(
        loginendpoint,
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "no user") {
          dispatch(loginFail());
        } else {
          dispatch(loginSucces(res.data));
        }
        setloading(false);
      })
      .catch((err) => {
        dispatch(loginFail());
        console.log(err);
      });
  }

  async function googlesignin() {
dispatch(loginStart())
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);

      axios.post('http://localhost:8001/api/auth/google',result,{withCredentials:true}).then((res)=>{
        console.log(res.data)
        dispatch(loginSucces(res.data))
      })
    })
    .catch((err)=>{
      dispatch(loginFail())
      console.log(err);
    })
  }

  return (
    <div>
      <Container>
        {isloading ? (
          <>loading....</>
        ) : (
          <div>
            <form>
              Email:{" "}
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              ></input>
              <br></br>
              Password:
              <input
                type="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              ></input>
              <br></br>
              <input
                type="submit"
                onClick={(e) => {
                  login(e);
                }}
              ></input>
            </form>
            <div>
              <button onClick={googlesignin}>Signin with google</button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
