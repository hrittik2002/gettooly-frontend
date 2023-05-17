import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./PaymentPage.module.css";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const PUBLIC_KEY =
  "pk_test_51LKc43SJstE3ZNVNvpQbpexOaZoP5AIAWjLjYZvoxgd8QaangvHVcDkiGxtIDlyYuJJUoLYvHGtrxpeEeugiQ3TA00VljRnnX9";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const PaymentPage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <SideNavbar2 />
      <Elements stripe={stripeTestPromise}>
        <PaymentForm plan={state.plan} currency={state.currency} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
