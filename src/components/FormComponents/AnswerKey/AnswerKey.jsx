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

const AnswerKey = ({ ques, i }) => {
  const dispatch = useDispatch();
  const [ansKey , setAnsKey] = useState([])
  const setOptionAnswer = (ans, qno) => {
    dispatch(setOptionAnswerHandler({ ans, qno }));
  };
  const doneAnswer = (i) => {
    if(ques.questionType === "checkbox"){
      
    }
    else if(ques.questionType === "radio"){

    }
    else{

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
                        setOptionAnswer(ques.options[j].optionText, i);
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
        onClick={() => doneAnswer(i)}
        >
          Done
        </button>
        {/* <Button
          variant="outlined"
          color="primary"
          style={{
            textTransform: "none",
            color: "#4285f4",
            fontSize: "12px",
            marginTop: "12px",
            fontWeight: "bold",
          }}
          onClick={() => doneAnswer(i)}
        >
          Done
        </Button> */}
      </div>
    </AccordionDetails>
  );
};

export default AnswerKey;
