import React, { useEffect, useState } from "react";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import styles from "./SubscriptionListPage.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { cancelSubscription, deleteStripeCustomerId, getSubscriptionList } from "../../config/ApiCalls/subscriptionApiCalls";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const SubscriptionListPage = () => {
  const { userId } = useParams();
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAllSubscriptions = async () => {
    const res = await getSubscriptionList(userId);
    console.log(res);
    setSubscriptions(res);
  };
  const cancelPlanBtnHandler = async(subId) => {
    alert('Do you really want to cancel your subscription')
    const res = await cancelSubscription(subId);
    window.location.reload(true) 
  };

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  const viewDetailsBtnHandler = (idx) => {
    console.log(idx);
    setCurrentActive(idx);
    onOpen();
  };
  const deleteCustomerIdHandler = async() => {
    const res = await deleteStripeCustomerId(userId);
    console.log(res)
  }
  return (
    <div>
      <SideNavbar2 />
      <div className={styles.parentContainer}>
        <div>Your Subscriptions</div>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Plan</Th>
                <Th>Amount</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
            </Thead>
            <Tbody className={styles.Tbody}>
              {subscriptions.map((subscription, idx) => (
                <Tr key={idx}>
                  <Td>{subscription.plan}</Td>
                  <Td>{subscription.amount / 100}</Td>
                  <Td>
                    {subscription.active === true ? (
                      <CheckCircleOutlineRoundedIcon style={{color : "green"}}/>
                    ) : (
                      <CancelRoundedIcon style={{color : "red"}}/>
                    )}
                  </Td>
                  <Td>
                    <button
                      className={styles.viewButton}
                      onClick={() => {
                        viewDetailsBtnHandler(idx);
                      }}
                    >
                      View Details
                    </button>
                  </Td>
                  <Td>
                  {subscription.active === true ?
                    <button
                      className={styles.cancelBtn}
                      onClick={() => {
                        cancelPlanBtnHandler(subscription.id);
                      }}
                    >
                      Cancel Plan
                    </button>
                    :
                    ""
                    }
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

       
        <div className={styles.container}>
        <div className={styles.text}>
            If You want to change your payment currency then this button delete your stripe customer id. Do you want to delete the stripe customer Id? 
        </div>
        <button className={styles.cancelBtn} onClick={deleteCustomerIdHandler}>
            Cancel Customer Id
        </button>
        </div>

        {subscriptions[currentActive] && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{subscriptions[currentActive].plan}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  Activation Status :{" "}
                  {subscriptions[currentActive].active ? "TRUE" : "FALSE"}
                </div>
                <div>amount : {subscriptions[currentActive].amount / 100}</div>
                <div>
                  created At : {subscriptions[currentActive].created_at}
                </div>
                <div>
                  expires At : {subscriptions[currentActive].expires_at}
                </div>
              </ModalBody>

              <ModalFooter>
                <button className={styles.cancelBtn} onClick={onClose}>
                  Cancel
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SubscriptionListPage;
