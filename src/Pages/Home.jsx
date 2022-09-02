import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import VideoPage from "./VideoPage";

const Wrapper = styled.div`
  display: flex;
`;

export default function Home(props) {
  return (
    <Wrapper>
      <NavBar>
        <VideoPage type={props.type}></VideoPage>
      </NavBar>
    </Wrapper>
  );
} 