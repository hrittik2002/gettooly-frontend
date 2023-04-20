import { AccordionDetails } from "@mui/material";
import React from "react";
import styles from './AnswerKey.module.css'
import { useDispatch } from "react-redux";
import { doneAnswerHandler, setOptionAnswerHandler } from "../../../redux/questionsSlice";
import { ShortTextRounded, TextSnippet } from "@mui/icons-material";
import { Button } from "@chakra-ui/react";
const AnswerKey = ({ ques , i }) => {
    const dispatch = useDispatch();
    const setOptionAnswer = (ans, qno) => {
        dispatch(setOptionAnswerHandler({ ans, qno }));
      };
      const doneAnswer = (i) => {
        dispatch(doneAnswerHandler({ i }));
      };
  return (
    <AccordionDetails className={styles.addQuestion}>
      <div className={styles.topHeader}>Choose Correct Answer</div>
      {ques.options.map((op, j) => (
        <div
          className={styles.addQuestionBody}
          key={j}
          style={{
            marginLeft: "8px",
            marginBottom: "10px",
            marginTop: "5px",
          }}
        >
          <div key={j}>
            <div style={{ display: "flex" }} className="">
              <div className={styles.formCheck}>
                <label
                  style={{ fontSize: "13px" }}
                  onClick={() => {
                    setOptionAnswer(ques.options[j].optionText, i);
                  }}
                >
                  {ques.questionType !== "text" ? (
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
                  ) : (
                    <ShortTextRounded style={{ marginRight: "10px" }} />
                  )}
                  {ques.options[j].optionText}
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.addQuestionBody}>
        <Button
          size="small"
          style={{
            textTransform: "none",
            color: "#4285f4",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          <TextSnippet
            style={{
              fontSize: "20px",
              marginRight: "8px",
            }}
          />
          Add Answer Feedback
        </Button>
      </div>
      <div className={styles.addQuestionBottom}>
        <Button
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
        </Button>
      </div>
    </AccordionDetails>
  );
};

export default AnswerKey;
