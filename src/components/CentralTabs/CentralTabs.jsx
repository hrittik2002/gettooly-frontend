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
import Results from "../Results/Results";

const CentralTabs = () => {
  const bgColor = useSelector((state) => state.questions.bgColor);
  return (
    <div>
      <Tabs position="relative" variant="unstyled" align="center" width="100%" height="88vh"
      className={styles.tabs}
      >
        <TabList className={styles.tabList}>
          <Tab styles={styles.tab} color="#fff">Questions</Tab>
          <Tab styles={styles.tab} color="#fff">Responses</Tab>
          <Tab styles={styles.tab} color="#fff">Results</Tab>
        </TabList>
        <TabIndicator
          className={styles.tabIndicator}
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
          <TabPanel width="100%" height="100%" overflowY="scroll">
            <Results/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CentralTabs;
