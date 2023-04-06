// React.js frontend code
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCookie } from "../config/Cookie";
const stripe = loadStripe("pk_test_51LKc43SJstE3ZNVNvpQbpexOaZoP5AIAWjLjYZvoxgd8QaangvHVcDkiGxtIDlyYuJJUoLYvHGtrxpeEeugiQ3TA00VljRnnX9");
const schema = Yup.object().shape({
  amount: Yup.number().min(1).required(),
  plan: Yup.string().max(100).required(),
  duration: Yup.number().min(1).max(12).required(),
  cardNumber: Yup.string().required(),
  cardExpiry: Yup.string().required(),
  cardCvc: Yup.string().required(),
});

const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  

  const formik = useFormik({
    initialValues: {
      amount: "",
      plan: "",
      duration: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const paymentMethod = await stripe.createPaymentMethod({
          type: "card",
          card: {
            number: values.cardNumber,
            exp_month: parseInt(values.cardExpiry.split("/")[0]),
            exp_year: parseInt(values.cardExpiry.split("/")[1]),
            cvc: values.cardCvc,
          },
        });
        const response = await fetch("http://127.0.0.1:8000/api/payment/payment-intent/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
        },
          body: JSON.stringify({
            amount: values.amount,
            plan: values.plan,
            duration: values.duration,
            payment_method_id: paymentMethod.id,
            payment_method_type: paymentMethod.type,
          }),
        });
        const paymentIntent = await response.json();
        const result = await stripe.confirmCardPayment(
          paymentIntent.client_secret,
          {
            payment_method: paymentMethod.id,
          }
        );
        if (result.error) {
          // Payment failed
          console.error(result.error);
        } else {
          // Payment successful
          console.log(result.paymentIntent);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.amount && formik.errors.amount ? (
        <div>{formik.errors.amount}</div>
      ) : null}
      <label htmlFor="plan">Plan</label>
      <input
        id="plan"
        name="plan"
        type="text"
        value={formik.values.plan}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.plan && formik.errors.plan ? (
        <div>{formik.errors.plan}</div>
      ) : null}
      <label htmlFor="duration">Duration (in months)</label>
      <input
        id="duration"
        name="duration"
        type="number"
        value={formik.values.duration}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.duration && formik.errors.duration ? (
        <div>{formik.errors.duration}</div>
      ) : null}
      <label htmlFor="cardNumber">Card Number</label>
      <input
        id="cardNumber"
        name="cardNumber"
        type="text"
        value={formik.values.cardNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.cardNumber && formik.errors.cardNumber ? (
        <div>{formik.errors.cardNumber}</div>
      ) : null}
      <label htmlFor="cardExpiry">Card Expiry (MM/YY)</label>
      <input
        id="cardExpiry"
        name="cardExpiry"
        type="text"
        value={formik.values.cardExpiry}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.cardExpiry && formik.errors.cardExpiry ? (
        <div>{formik.errors.cardExpiry}</div>
      ) : null}
      <label htmlFor="cardCvc">Card CVC</label>
      <input
        id="cardCvc"
        name="cardCvc"
        type="text"
        value={formik.values.cardCvc}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.cardCvc && formik.errors.cardCvc ? (
        <div>{formik.errors.cardCvc}</div>
      ) : null}
      <button type="submit" onClick={formik.handleSubmit} disabled={isLoading}>
        Pay
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripe}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
