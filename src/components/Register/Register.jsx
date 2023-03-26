import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "./Register.module.css"
import RegisterByUser from "../RegisterByUser/RegisterByUser";
import RegisterByOrganization from "../RegisterByOrganization/RegisterByOrganization";
const Register = ({closeDialog}) => {
  return (
    <>
    <div className={styles.dialogWrapper} onClick={closeDialog}></div>
    <div className={styles.dialogContainer}>
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab>Register by User</Tab>
        <Tab>Register by Organization</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RegisterByUser/>
        </TabPanel>
        <TabPanel>
          <RegisterByOrganization/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </div>
    </>
  );
};

export default Register;
