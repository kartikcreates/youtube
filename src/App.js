import React, { useState } from "react";
import NavBar from "./components/NavBar";
// import Menu from "./components/Menu";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { darktheme, lighttheme } from "./utils/Theme";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import VideoViewPage from "./Pages/VideoViewPage";
import LoginPage from "./Pages/LoginPage";
import { Provider } from "react-redux";
import { store, persistor } from './redux/store'
import { SignupForm } from "./Pages/SignupForm";
import { PersistGate } from 'redux-persist/integration/react';
import GlobalChat from "./Pages/GlobalChat";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  color:${({ theme }) => theme.text}
  font-size:14px;
`;
const Wrapper = styled.div``;

function App() {
  const [darkMode, setdarkMode] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={darkMode ? darktheme : lighttheme}>
            <Container>
              {/* <Menu darkMode={darkMode} setdarkMode={setdarkMode} /> */}
              <Main>
                {/* <NavBar></NavBar> */}
                <Wrapper>
                  <Routes>
                    <Route path='/'>
                      <Route index element={<Home type="random" />}></Route>

                      <Route path="trending" element={<Home type="trending" />}></Route>

                      <Route path="subscribed" element={<Home type="subscribed" />}></Route>

                      <Route path="video/:videoid" element={<VideoViewPage />}></Route>
                      <Route path="login" element={<LoginPage />}></Route>
                      <Route path="signup" element={<SignupForm />}></Route>

                    </Route>
                  </Routes>
                </Wrapper>
              </Main>
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
