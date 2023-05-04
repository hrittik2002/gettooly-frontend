import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
} from "@chakra-ui/react";
import QuestionForm from "../QuestionForm/QuestionForm";
import styles from './CentralTabs.module.css'
import { useSelector } from "react-redux";
import Response from "../Response/Response";

const CentralTabs = () => {
  const bgColor = useSelector((state) => state.questions.bgColor);
  return (
    <div>
      <Tabs position="relative" variant="unstyled" align="center" width="100%" backgroundColor="#8700f5" height="88vh">
        <TabList backgroundColor="#8700f5">
          <Tab styles={styles.tab} color="#fff">Questions</Tab>
          <Tab styles={styles.tab} color="#fff">Responses</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <Box
          height="2px"
          width="100%"
          marginTop="6px"
          marginBottom="0px"
          backgroundColor="gray"
        ></Box>
        <TabPanels width="100%" height="100%" backgroundColor={bgColor}>
          <TabPanel width="100%" height="100%" overflowY="scroll">
            <QuestionForm />
          </TabPanel>
          <TabPanel width="100%" height="100%" overflowY="scroll">
            <Response/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CentralTabs;
