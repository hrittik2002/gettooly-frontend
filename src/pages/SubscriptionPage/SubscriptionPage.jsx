import React, { useState } from "react";
import styles from "./SubscriptionPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import { Button, ButtonGroup } from "@chakra-ui/react";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.currentUser);
  const [currency , setCurrency] = useState('usd');

  const basicPayHandler = () => {
    console.log(userData);
    navigate(`/ConductUser/${userData.id}/payment`);
  };
  const paymentHandler = (plan) => {
    console.log(userData);
    navigate(`/ConductUser/${userData.id}/payment` , { state : { plan : plan , currency : currency }});
  }

  return (
    <div>
      <SideNavbar2 />
      <div className={styles.saasSubscriptionCard}>
        <div className={styles.saasSubscriptionCardHeader}>
          <h2>Get Started</h2>
          <p>Choose a plan that works for you</p>
          <ButtonGroup size='sm' isAttached variant='outline'>
            <Button _hover={{ bg: '#ebedf0' }} onClick={()=>{setCurrency('usd')}}>USD</Button>
            <Button _hover={{ bg: '#ebedf0' }} onClick={()=>{setCurrency('inr')}}>INR</Button>
          </ButtonGroup>
        </div>
        <div className={styles.saasSubscriptionCardBody}>
        <div className={styles.saasSubscriptionCardPlan}>
            <h3>Pro</h3>
            <p className={styles.saasSubscriptionCardPrice}>{currency === 'usd' ? '$1' : '₹1'}/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>10k Users</li>
              <li>20 GB Storage</li>
              <li>Email and Phone Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta} onClick={()=>{paymentHandler(1)}}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Pro</h3>
            <p className={styles.saasSubscriptionCardPrice}>{currency === 'usd' ? '$2' : '₹2'}/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>50k Users</li>
              <li>20 GB Storage</li>
              <li>Email and Phone Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta} onClick={()=>{paymentHandler(2)}}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Enterprise</h3>
            <p className={styles.saasSubscriptionCardPrice}>{currency === 'usd' ? '$3' : '₹3'}/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>Unlimited Users</li>
              <li>150 GB Storage</li>
              <li>Email, Phone, and Chat Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta} onClick={()=>{paymentHandler(3)}}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Enterprise</h3>
            <p className={styles.saasSubscriptionCardPrice}>{currency === 'usd' ? '$4' : '₹4'}/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>Unlimited Users</li>
              <li>50 GB Storage</li>
              <li>Email, Phone, and Chat Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta} onClick={()=>{paymentHandler(4)}}>
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
