import React from "react";
import SideNavbar2 from "../components/SideNavbar2/SideNavbar2";
import styles from "./Test.module.css";
const Test = () => {
  return (
    <>
      <SideNavbar2 />
      <div className={styles.saasSubscriptionCard}>
        <div className={styles.saasSubscriptionCardHeader}>
          <h2>Get Started</h2>
          <p>Choose a plan that works for you</p>
        </div>
        <div className={styles.saasSubscriptionCardBody}>
        <div className={styles.saasSubscriptionCardPlan}>
            <h3>Pro</h3>
            <p className={styles.saasSubscriptionCardPrice}>$49/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>5 Users</li>
              <li>20 GB Storage</li>
              <li>Email and Phone Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Pro</h3>
            <p className={styles.saasSubscriptionCardPrice}>$49/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>5 Users</li>
              <li>20 GB Storage</li>
              <li>Email and Phone Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Enterprise</h3>
            <p className={styles.saasSubscriptionCardPrice}>$99/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>Unlimited Users</li>
              <li>50 GB Storage</li>
              <li>Email, Phone, and Chat Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta}>
              Choose Plan
            </button>
          </div>
          <div className={styles.saasSubscriptionCardPlan}>
            <h3>Enterprise</h3>
            <p className={styles.saasSubscriptionCardPrice}>$99/month</p>
            <ul className={styles.saasSubscriptionCardFeatures}>
              <li>Unlimited Users</li>
              <li>50 GB Storage</li>
              <li>Email, Phone, and Chat Support</li>
            </ul>
            <button className={styles.saasSubscriptionCardCta}>
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
