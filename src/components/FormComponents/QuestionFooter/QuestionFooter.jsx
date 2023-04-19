import { Delete, FilterNone, MoreVert, NorthEast } from "@mui/icons-material";
import { Button, IconButton, Switch } from "@mui/material";
import React, { useState } from "react";
import styles from "./QuestionFooter.module.css";
import { useDispatch } from "react-redux";
import {
  addAnswerHandler,
  copyQuestionHandler,
  deleteQuestionHandler,
  expandCloseAllHandler,
  requiredQuestionHandler,
} from "../../../redux/questionsSlice";
import { useSelector } from "react-redux";
import {  deleteQuestionAPICall, updateQuestionAPICall, updateScoreAPICall } from "../../../config/ApiCalls/formApiCalls";
import { Box, NumberInput, NumberInputField } from "@chakra-ui/react";
import { getCookie } from "../../../config/Cookie";

const QuestionFooter = ({ i, questions, getFormData2 }) => {
  const points = useSelector((state)=>state.questions.questions[i].points);
  const [score , setScore] = useState(points);
  const formCode = useSelector((state) => state.questions.formCode);
  const is_quiz = useSelector((state) => state.settings.is_quiz);
  const { questionText, questionType, id, required } = questions[i];
  console.log(id, required, questionType, questionText);
  const dispatch = useDispatch();
  const addAnswer = (i) => {
    dispatch(addAnswerHandler({ i }));
  };
  const copyQuestion = (i) => {
    dispatch(expandCloseAllHandler());
    dispatch(copyQuestionHandler({ i }));
  };
  const deleteQuestion = async (i) => {
   // console.log("hii");
    //dispatch(deleteQuestionHandler({ i }));
    const token = getCookie("access_token")
    console.log(token)
    const res = await deleteQuestionAPICall(formCode , id);
    console.log(res);
    getFormData2();
  };
  const requiredQuestion = async (i) => {
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
    getFormData2();
  };
  const getRequiredOrNot = (i) => {
    let reqQuestion = [...questions];
    return reqQuestion[i].required;
  };
  const addScoreHandler = async () => {
    const res = await updateScoreAPICall(formCode , id , score);
   // console.log(res)
    getFormData2();
  }
  console.log(points)
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

      {
        is_quiz && 
        (
          <Box 
      width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="7px"
      >
        Score
        <NumberInput size='md' defaultValue={points} width="20%" onChange={(value)=>{setScore(value)}}>
          <NumberInputField />
        </NumberInput>
        <Button onClick={addScoreHandler}>Add Score</Button>
      </Box>
        )
      }
      

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
