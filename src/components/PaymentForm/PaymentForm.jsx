import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { handlePayment, paymentAPICall } from "../../config/apiCalls";
import styles from "./PaymentForm.module.css";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useFormik } from "formik";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "24px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const initialValues = {
    name: "",
    line1: "",
    city: "",
    postal_code: "",
    state: "",
    country: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (!error) {
          try {
            console.log(values)
            const { id } = paymentMethod;
            const data = await paymentAPICall(
              10.0,
              "price_1MtB77SJstE3ZNVNybe6QZiM",
              1,
              id,
              "card",
              values.name,
              values.line1,
              values.city,
              values.postal_code,
              values.state,
              values.country
            );
            console.log(data);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
            const result = await stripe.confirmCardPayment(data.client_secret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
            console.log(result);
            if (result.paymentIntent.status === "succeeded") {
              try {
                console.log(result.paymentIntent.id);
                const createSubscription = await handlePayment(
                  result.paymentIntent.id,
                  data.subscription_id
                );
                console.log(createSubscription);
                console.log("Successful payment");
                setSuccess(true);
              } catch (err) {
                console.log(err);
              }
            }
          } catch (error) {
            console.log("Error", error);
          }
        } else {
          console.log(error.message);
        }
      },
    });

 
  return (
    <>
      {!success ? (
        <form className={styles.form}>
          <div className={styles.formHeading}>Payment</div>

          <div className={styles.innerContainer}>
            <InputGroup>
              <InputLeftAddon children="Name" />
              <Input
                type="tel"
                placeholder="Name"
                focusBorderColor="lime"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Line1" />
              <Input
                type="tel"
                placeholder="Line1"
                focusBorderColor="lime"
                value={values.line1}
                name="line1"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="City" />
              <Input
                type="tel"
                placeholder="City"
                focusBorderColor="lime"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Postal Code" />
              <Input
                type="tel"
                placeholder="Postal Code"
                focusBorderColor="lime"
                value={values.postal_code}
                name="postal_code"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="State" />
              <Input
                type="tel"
                placeholder="State"
                focusBorderColor="lime"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Country" />
              <Input
                type="tel"
                placeholder="Country"
                focusBorderColor="lime"
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>

            <fieldset>
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>

            <button className={styles.button} onClick={handleSubmit}>Pay</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>
            You just bought a sweet spatula congrats this is the best decision
            of you're life
          </h2>
        </div>
      )}
    </>
  );
}


/*
 const handleSubmit2 = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const data = await paymentAPICall(
          10.0,
          "price_1MtB77SJstE3ZNVNybe6QZiM",
          1,
          id,
          "card"
        );
        console.log(data);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
        const result = await stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
        console.log(result);
        if (result.paymentIntent.status === "succeeded") {
          try {
            console.log(result.paymentIntent.id);
            const createSubscription = await handlePayment(
              result.paymentIntent.id,
              data.subscription_id
            );
            console.log(createSubscription);
            console.log("Successful payment");
            setSuccess(true);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };


*/