import { Delete, FilterNone, MoreVert, NorthEast } from "@mui/icons-material";
import { Button, IconButton, Switch } from "@mui/material";
import React from "react";
import styles from "./QuestionFooter.module.css"
import { useDispatch } from "react-redux";
import { addAnswerHandler, copyQuestionHandler, deleteQuestionHandler, expandCloseAllHandler, requiredQuestionHandler } from "../../../redux/questionsSlice";
import { useSelector } from "react-redux";
import { updateQuestionAPICall } from "../../../config/ApiCalls/formApiCalls";
const QuestionFooter = ({i , questions , getFormData2}) => {
    const formCode = useSelector((state) => state.questions.formCode);
    const {questionText , questionType , id , required} = questions[i];
    console.log(id, required, questionType, questionText);
    const dispatch = useDispatch();
    const addAnswer = (i) => {
        dispatch(addAnswerHandler({ i }));
      };
      const copyQuestion = (i) => {
        dispatch(expandCloseAllHandler());
        dispatch(copyQuestionHandler({ i }));
      };
      const deleteQuestion = (i) => {
        console.log("hii");
        dispatch(deleteQuestionHandler({ i }));
      };
      const requiredQuestion = async(i) => {
        // console.log("hiii");
        // dispatch(requiredQuestionHandler({ i }));
        const res = await updateQuestionAPICall(
            formCode,
            id,
            questionText,
            questionType,
            !required
          );
          //console.log(res);
          getFormData2()
      };
      const getRequiredOrNot = (i) => {
        let reqQuestion = [...questions];
        return reqQuestion[i].required;
      };
  return (
    <div className={styles.addFooter}>
      {/* Answer key button */}
      <div className={styles.addQuestionBottomLeft}>
        <Button
          size="small"
          style={{
            textTransform: "none",
            color: "#4285f4",
            fontSize: "13px",
            fontWeight: "600",
          }}
          onClick={() => {
            addAnswer(i);
          }}
        >
          <NorthEast
            style={{
              border: "2px solid #42854",
              padding: "2px",
              marginRight: "8px",
            }}
          />
          Answer key
        </Button>
      </div>

      {/* Icons at bottom right */}
      <div className={styles.addQuestionBottom}>
        {/* Copy qs icon */}
        <IconButton
          aria-label="Copy"
          onClick={() => {
            copyQuestion(i);
          }}
        >
          <FilterNone />
        </IconButton>

        {/* delete qs icon */}
        <IconButton
          aria-label="delete"
          onClick={() => {
            deleteQuestion(i);
          }}
        >
          <Delete />
        </IconButton>

        {/* IS required or not switch */}
        <span
          style={{
            color: "#5f6368",
            fontSize: "13px",
          }}
        >
          Required
        </span>

        <Switch
          name="checked"
          color="primary"
          onClick={() => {
            requiredQuestion(i);
          }}
          checked={getRequiredOrNot(i)}
        />

        {/* more icon */}
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>
  );
};

export default QuestionFooter;
