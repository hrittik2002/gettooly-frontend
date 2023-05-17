import "./App.css";
import AfterLoginHomePage from "./pages/AfterLoginHomePage/AfterLoginHomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeforeLoginHomePage from "./pages/BeforeLoginHomePage/BeforeLoginHomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { useCallback, useEffect, useMemo } from "react";
import { AutomaticLogin } from "./config/automaticLogin";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
import EmailVerifyPage from "./pages/EmailVerifyPage/EmailVerifyPage";
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage";
import PasswordChangePage from "./pages/PasswordChangePage/PasswordChangePage";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import FormEditPage from "./pages/FormEditPage/FormEditPage";
import Test from "./Testing/Test";
import FormViewPage from "./pages/FormViewPage/FormViewPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewResponsePage from "./pages/ViewResponsePage/ViewResponsePage";
import SubscriptionListPage from "./pages/SubscriptionListPage/SubscriptionListPage";

function App() {
  const userData = useSelector((state) => state.user.currentUser);
  console.log(userData);
  const dispatch = useDispatch();
  const loginUserUsingCookie = useCallback(async () => {
    const data = await AutomaticLogin();
    console.log(data);
    dispatch(setUserData(data));
  }, [dispatch]);

  useEffect(() => {
    if (!userData) {
      loginUserUsingCookie();
    }
  }, [userData, loginUserUsingCookie]);

  console.log(userData);

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
          element={<PasswordChangePage />}
        />

        <Route
          path="/"
          exact
          element={<BeforeLoginHomePage userData={userData} />}
        />

        <Route
          path="/api/auth/user/email-veryfy"
          element={<EmailVerifyPage />}
        />

        <Route
          path="/api/auth/user/email/password-reset/:uibd/:token"
          element={<PasswordResetPage />}
        />
        <Route
          path="/ConductUser/:userId/subscription"
          element={<SubscriptionPage />}
        />
        <Route
          path="/ConductUser/:userId/subscription/list"
          element={<SubscriptionListPage />}
        />


        <Route path="/ConductUser/:userId/payment" element={<PaymentPage />} />

        <Route path="/form/:formCode/edit" element={<FormEditPage />} />

        <Route path="/form/:formCode/view" element={<FormViewPage />} />

        <Route
          path="/form/:formCode/:responseCode/review"
          element={<ViewResponsePage />}
        />

        <Route path="/User/:userId/dashboard" element={<Dashboard />} />

        {/* Testing */}
        <Route path="/testing" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
