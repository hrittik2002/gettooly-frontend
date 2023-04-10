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

const CentralTabs = () => {
  return (
    <div>
      <Tabs position="relative" variant="unstyled" align="center" width="100%">
        <TabList>
          <Tab>Questions</Tab>
          <Tab>Responses</Tab>
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
          marginBottom="3px"
          backgroundColor="gray"
        ></Box>
        <TabPanels width="100%" backgroundColor="#F4F4F9">
          <TabPanel width="100%">
            <QuestionForm />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CentralTabs;
