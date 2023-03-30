import "./App.css";
import Login from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import AfterLoginHomePage from "./pages/AfterLoginHomePage/AfterLoginHomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeforeLoginHomePage from "./pages/BeforeLoginHomePage/BeforeLoginHomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, getUserId } from "./config/Cookie";
import { setUserData } from "./redux/userSlice";
import { getCoductUserData } from "./config/apiCalls";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { AutomaticLogin } from "./config/automaticLogin";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";




function App() {
  const userData = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const loginUserUsingCookie = async () => {
    const data = await AutomaticLogin();
    dispatch(setUserData(data));
  };
  useMemo(() => {
    if(!userData){
      loginUserUsingCookie();

    }

  });

  return (
    <Router>
      <Routes>
        <Route
          path="/ConductUser/:userId"
          exact
          element={ userData ? <AfterLoginHomePage /> : <LoadingScreen />}
        />
        <Route
          path="/ConductUser/:userId/about"
          exact
          element={userData ? <AboutPage /> : <LoadingScreen />}
        />

        <Route path="/" exact element={<BeforeLoginHomePage />} />

       
      </Routes>
    </Router>
  );
}

export default App;
