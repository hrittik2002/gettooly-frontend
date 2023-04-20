import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import styles from './PaymentPage.module.css'
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import SideNavbar2 from '../../components/SideNavbar2/SideNavbar2';
const PUBLIC_KEY = 'pk_test_51LKc43SJstE3ZNVNvpQbpexOaZoP5AIAWjLjYZvoxgd8QaangvHVcDkiGxtIDlyYuJJUoLYvHGtrxpeEeugiQ3TA00VljRnnX9';
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const PaymentPage = () => {
  return (
    <div >
      <SideNavbar2 />
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>
    </Elements>
    </div>
  )
}

export default PaymentPage