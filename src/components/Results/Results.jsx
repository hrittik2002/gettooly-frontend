import React from "react";
import styles from "./Results.module.css";
import {
    Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getAllUserDetails } from "../../config/ApiCalls/userApiCalls";
import { publishResultApiCall } from "../../config/ApiCalls/formApiCalls";
const Results = () => {
  const userData = useSelector((state) => state.user.currentUser);
  const formId = useSelector((state) => state.questions.formId);
  const [allUserData, setAllUserData] = useState([]);

  const getResults = async () => {
    const results = await getAllUserDetails(userData.id, formId);
    if (results.data !== undefined) {
      setAllUserData(results.data);
    }
    console.log(results);
  };
  useEffect(() => {
    //console.log("hola");
    getResults();
  }, []);

  const publishResultHandler = async(publish) => {
    console.log(formId , userData.id , publish);
    const res = await publishResultApiCall(formId , userData.id , publish);
    console.log(res)
  }
  return (
    <div className={styles.parentContainer}>
      <div className={styles.content}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Result of All Applicants</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Score</Th>
                <Th>Percentage</Th>
                <Th>Total Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allUserData.map((data, idx) => (
                <Tr>
                  <Td>{data.name}</Td>
                  <Td>{data.responder_email}</Td>
                  <Td>{data.score}</Td>
                  <Td>{data.percentage}</Td>
                  <Td>{data.total_score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <div>
            <Button onClick={()=>{publishResultHandler(true)}}>Publish Result</Button>
            <Button onClick={()=>{publishResultHandler(false)}}>Unpublish Result</Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
