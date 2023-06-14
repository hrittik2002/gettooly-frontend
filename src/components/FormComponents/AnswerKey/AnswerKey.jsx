import { AccordionDetails } from "@mui/material";
import React from "react";
import styles from "./AnswerKey.module.css";
import { useDispatch } from "react-redux";
import {
  doneAnswerHandler,
  setOptionAnswerHandler,
} from "../../../redux/questionsSlice";
import { ShortTextRounded, TextSnippet } from "@mui/icons-material";
import { Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { saveAnswerKeyApiCall } from "../../../config/ApiCalls/formApiCalls";
import { useParams } from "react-router-dom";

const AnswerKey = ({ ques, i }) => {
  const dispatch = useDispatch();
  const [ansKey , setAnsKey] = useState([])
  const params = useParams();
  const formCode = params.formCode
  const updateAnswerState = (ans, qsType) => {
    if(qsType === "checkbox"){
      const ansArr = [...ansKey];
      let isAnsAlreadyExist = false;
      for(let i = 0; i < ansArr.length; i++){
        if(ansArr[i] === ans) isAnsAlreadyExist = true;
      }
      if(!isAnsAlreadyExist){
        ansArr.push(ans); 
        setAnsKey(ansArr);
      }
      console.log(ansArr)
    }
    else if(qsType === "radio"){
      const ansArr = [ans];
      setAnsKey(ansArr);
    }
    else{
      const ansArr = [ans];
      setAnsKey(ansArr);
    }

    console.log(ansKey)
  }
  const setOptionAnswer = (ans, qno) => {
    dispatch(setOptionAnswerHandler({ ans, qno }));
  };
  const doneAnswer = async(i , qsId , qsType) => {
    if(qsType === "checkbox"){
      const res = await saveAnswerKeyApiCall(formCode, qsId , ansKey)
      console.log(res)
    }
    else{
      const res = await saveAnswerKeyApiCall(formCode, qsId , ansKey[0])
      console.log(res)
    }
    
    dispatch(doneAnswerHandler({ i }));
  };
  const saveAnswer = (optionId) => {
    let tempAns = [...ansKey];
    tempAns.push(optionId);
    setAnsKey(tempAns);
  }
  return (
    <AccordionDetails className={styles.addQuestion}>
      <div className={styles.topHeader}>Choose Correct Answer</div>
      {ques.questionType === "text" ? (
        <div className={styles.textArea}>
          <Textarea
            style={{ width: "100%", height: "100%", border: "gray" }}
            onChange={(e)=>{updateAnswerState(e.target.value , ques.questionType)}}
            placeholder="text area"
          />
        </div>
      ) : (
        <>
          {ques.options.map((op, j) => (
            <div
              className={styles.addQuestionBody}
              key={j}
            >
                <div style={{ display: "flex" }}>
                  <div className={styles.formCheck}>
                    <label
                      style={{ fontSize: "18px" }}
                      onClick={() => {
                        updateAnswerState(ques.options[j].id, ques.questionType);
                      }}
                      
                    >
                      <input
                        type={ques.questionType}
                        name={ques.questionText}
                        value="option3"
                        className={styles.formCheckInput}
                        required={ques.required}
                        style={{
                          marginRight: "10px",
                          marginBottom: "10px",
                          marginTop: "5px",
                        }}
                        
                      />

                      {ques.options[j].optionText}
                    </label>
                  </div>
                </div>

            </div>
          ))}
        </>
      )}

      <div className={styles.addQuestionBottom}>
        <button
        className={styles.doneBtn}
        onClick={() => doneAnswer(i , ques.id , ques.questionType)}
        >
          Done
        </button>
      </div>
    </AccordionDetails>
  );
};

export default AnswerKey;
