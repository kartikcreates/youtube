import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import VideoPage from "./VideoPage";
import { useContext } from "react";
// import { DarkModeContext } from "../App";

const Wrapper = styled.div`
  display: flex;
`;

export default function Home(props) {
  // const { darkMode, setdarkMode } = useContext(DarkModeContext);
  return (
    <Wrapper>
      <NavBar>
        <VideoPage type={props.type}></VideoPage>
      </NavBar>
    </Wrapper>
  );
}
