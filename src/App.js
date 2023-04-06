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
import EmailVerifyPage from "./pages/EmailVerifyPage/EmailVerifyPage";
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage";
import PasswordChangePage from "./pages/PasswordChangePage/PasswordChangePage";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Payment from "./pages/Payment";

function App() {
  const userData = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const loginUserUsingCookie = async () => {
    const data = await AutomaticLogin();
    dispatch(setUserData(data));
  };
  useMemo(() => {
    if (!userData) {
      loginUserUsingCookie();
    }
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/ConductUser/:userId"
          exact
          element={userData ? <AfterLoginHomePage /> : <LoadingScreen />}
        />
        <Route
          path="/ConductUser/:userId/about"
          exact
          element={userData ? <AboutPage /> : <LoadingScreen />}
        />
        <Route
          path="/ConductUser/:userId/changePassword"
          element={<PasswordChangePage/>}
        />

        <Route path="/" exact element={<BeforeLoginHomePage />} />

        <Route
          path="/api/auth/user/email-veryfy"
          element={<EmailVerifyPage />}
        />

        <Route
          path="/api/auth/user/email/password-reset/:uibd/:token"
          element={<PasswordResetPage/>}
        />
         <Route
        path="/ConductUser/:userId/subscription"
        element={<SubscriptionPage/>}
       />

       <Route
       path="/ConductUser/:userId/payment"
       element={<PaymentPage/>}
       />
       <Route
       path="/payment"
       element={<Payment/>}
       />

        
      </Routes>
    </Router>
  );
}

export default App;
