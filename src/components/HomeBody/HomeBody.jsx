import React, { useEffect } from "react";
import Template from "../Template/Template";
import styles from "./HomeBody.module.css";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getAllFormsByUserId, getFormData } from "../../config/ApiCalls/formApiCalls";
import { useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormCode, setFormCreator, setFormDescription, setFormTitle, setQuestions } from "../../redux/questionsSlice";

const HomeBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.currentUser);
  const [formList, setFormList] = useState([]);
  const getAllFormsOfCurrentUser = async () => {
    const res = await getAllFormsByUserId(userData.id);
    console.log(res.data);
    setFormList(res.data);
  };
  useMemo(async () => {
    getAllFormsOfCurrentUser();
  }, [userData.id]);


  const openFormHandler = async(code) => {
    const res2 = await getFormData(code);
     /* Store all data in redux */
     dispatch(setFormCode(res2.data.code));
     dispatch(setFormCreator(res2.data.creator));
     dispatch(setFormTitle(res2.data.title));
     dispatch(setFormDescription(res2.data.description));
     const dummyQuestion = [];
     for(let i in res2.data.questions){
         dummyQuestion.push({});
         dummyQuestion[i].questionText = res2.data.questions[i].question;
         dummyQuestion[i].answerKey = res2.data.questions[i].answer_key;
         dummyQuestion[i].required = res2.data.questions[i].required;
         dummyQuestion[i].id = res2.data.questions[i].id;
         dummyQuestion[i].points = res2.data.questions[i].score;
       
         if(res2.data.questions[i].question_type === "multiple choice") dummyQuestion[i].questionType = "radio"; 
         dummyQuestion[i].options = [];
         for(let j in res2.data.questions[i].choices){
             dummyQuestion[i].options.push({});
             dummyQuestion[i].options[j].optionText = res2.data.questions[i].choices[j].choice;
             dummyQuestion[i].options[j].id = res2.data.questions[i].choices[j].id;
             dummyQuestion[i].options[j].isAnswer = res2.data.questions[i].choices[j].is_answer;
         }
     }
     console.log(dummyQuestion);
     dispatch(setQuestions(dummyQuestion));

    navigate(`/form/${code}/edit` , {formCode :code});
  }
  return (
    <div className={styles.parentContainer}>
      <div className={styles.heading}>Form Own by You</div>
      <div className={styles.innerContainer}>
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Form Title</Th>
                <Th>Created At</Th>
                <Th>Last Updated</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formList.length !== 0 ? (
                formList.map((formItem) => {
                  return (
                    <Tr onClick={()=>{openFormHandler(formItem.code)}}>
                      <Td>{formItem.title}</Td>
                      <Td>{formItem.createdAt}</Td>
                      <Td>{formItem.updatedAt}</Td>
                    </Tr>
                  );
                })
              ) : (
                <>No form Created</>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeBody;
