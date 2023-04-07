
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from 'react'
import { paymentAPICall } from "../../config/apiCalls"
import styles from "./PaymentForm.module.css"


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
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}




export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const data = await paymentAPICall(10.00 , "price_1MtB77SJstE3ZNVNybe6QZiM" , 1 , id , 'card');
                // (amount: 1000,
                // plan : 'B',
                // duration : 1,
                // payment_method_id : id,
                // payment_method_type : 'card')
                console.log(data)
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
                const result = await stripe.confirmCardPayment(data.client_secret , {
                  payment_method: {
                    card: elements.getElement(CardElement)
                  }
                })
                console.log(result)
                console.log(result)
                // if(paymentIntent.status === "require_action"){
                //   try{
                //     console.log("bbbbbbbbbbbbbbbbbb")
                //     const res = await stripe.handleCardAction(data.client_secret)
                //     return res;
                //   }
                //   catch(err){
                //     console.log(err)
                //   }
                  
                // }
                // const res = await stripe.handleCardAction(data.client_secret)
                // console.log(res.status)
                // if(res.error){
                //   console.log("Error", error)
                // }
                // else{
                //   //submitPaymentIntent(res.paymentIntent.id);
                // }
                if(data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
return (
    <>
      {!success ? 
      <form onSubmit={handleSubmit} style={{
        backgroundColor:"white",
        width: "100%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        padding: "20px"
      }}>
        <div style={{
          width: "80%",
        }}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <button style={{ width:"100%" ,  backgroundColor: "#0078e7", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", fontSize: "16px", marginTop: "20px" }}>Pay</button>
        </div>
      </form>
      :
     <div>
         <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
     </div> 
      }
          
    </>
  )
    }