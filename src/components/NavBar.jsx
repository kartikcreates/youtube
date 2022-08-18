import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { IconButton } from "@mui/material";
import Videodialog from "./Videodialog";

const Container = styled.div`
  display: flex;
  padding: 10px 20px;
  gap: 30px;
  justify-content: center;
  position: sticky;
  top: 0;
`;
const LoginButton = styled.button`
  height: 30px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border: 3px solid black;
  cursor: pointer;
  flex: 1;
`;
const SearchBar = styled.input`
  height: 25px;
  border-radius: 4px;
  flex: 4;
`;
const Item = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  flex: 0.5;
`;
export default function NavBar() {
  const currentuser = useSelector((state) => state.user.currentuser);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Container>
      <SearchBar type="text" placeholder="Search......"></SearchBar>
      <Item>
        <SearchIcon></SearchIcon>
      </Item>{" "}

      <IconButton onClick={handleClickOpen}><VideoCallIcon></VideoCallIcon></IconButton>
      {currentuser ? (
        currentuser.user.name
      ) : (
        <Link to="/login">
          <LoginButton>Login</LoginButton>
        </Link>
      )}

      <Videodialog open={open} setOpen={setOpen}></Videodialog>
    </Container>
  );
}
