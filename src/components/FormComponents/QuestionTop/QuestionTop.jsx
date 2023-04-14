import React, { useReducer } from "react";
import styles from "./QuestionTop.module.css";
import { CheckBox, CropOriginal, Subject } from "@mui/icons-material";
import { MenuItem, Radio, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addQuestionTypeHandler,
  changeQuestionHandler,
  setFormDescription,
  setFormTitle,
  setQuestions,
} from "../../../redux/questionsSlice";
import { Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import {
  getFormData,
  updateQuestionAPICall,
} from "../../../config/ApiCalls/formApiCalls";
import { getQuestion } from "../../../Helper/getQuestion";

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsQuestion": {
      return {
        ...state,
        isQuestion: action.value,
      };
    }
    case "setQuestionValue": {
      return {
        ...state,
        questionValue: action.value,
      };
    }
    default:
      return state;
  }
};

const QuestionTop = ({ i, ques , getFormData2 }) => {
  const formCode = useSelector((state) => state.questions.formCode);
  const { required, questionType, id, questionText } = useSelector(
    (state) => state.questions.questions[i]
  );
  console.log(id, required, questionType, questionText);
  const [state, dispatch] = useReducer(reducer, {
    isQuestion: false,
    questionValue: questionText,
  });

  const dispatchRedux = useDispatch();

  

  const changeQuestion = (value, i) => {
    //dispatchRedux(changeQuestionHandler({ text, i }));
    dispatch({ type: "setQuestionValue", value: value });
    if (value === undefined || value === null || value === "") {
      dispatch({ type: "setIsQuestion", value: false });
    } else {
      dispatch({ type: "setIsQuestion", value: true });
    }
    console.log(state.isQuestion, state.questionValue);
  };
  const questionSubmitHandler = async () => {
    const newQuestion = state.questionValue;
    const res = await updateQuestionAPICall(
      formCode,
      id,
      newQuestion,
      questionType,
      required
    );
    console.log(res);
    getFormData2()
    dispatch({ type: "setQuestionValue", value: "" });
    dispatch({ type: "setIsQuestion", value: false });
  };
  const addQuestionType = async(i, type) => {
    //dispatchRedux(addQuestionTypeHandler({ i, type }));
    const newQuestion = state.questionValue;
    const res = await updateQuestionAPICall(
      formCode,
      id,
      newQuestion,
      type,
      required
    );
    console.log(res);
    getFormData2()
    dispatch({ type: "setQuestionValue", value: "" });
    dispatch({ type: "setIsQuestion", value: false });
  };

  return (
    <div className={styles.addQuestionTop}>
      {/* Change Question Field */}

      <input
        type="text"
        className={styles.question}
        placeholder={ques.questionText}
        onChange={(e) => {
          changeQuestion(e.target.value, i);
        }}
      />
      {state.isQuestion && (
        <Button
          leftIcon={<CheckIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={questionSubmitHandler}
        />
      )}

      {/* Image */}
      <CropOriginal style={{ color: "#5f6368" }} />

      {/* Choose radio or box or paragraph field */}
      <Select
        className={styles.select}
        style={{ color: "#5f6368", fontSize: "13px" }}
      >
        <MenuItem
          id="text"
          value="Text"
          onClick={() => {
            addQuestionType(i, "text");
          }}
        >
          <Subject style={{ marginRight: "10px" }} />
          Paragraph
        </MenuItem>
        <MenuItem
          id="checkbox"
          value="Checkbox"
          onClick={() => {
            addQuestionType(i, "checkbox");
          }}
        >
          <CheckBox
            style={{
              marginRight: "10px",
              color: "#70757a",
            }}
            checked
          />
          Checkbox
        </MenuItem>
        <MenuItem
          id="radio"
          value="Radio"
          onClick={() => {
            addQuestionType(i, "radio");
          }}
        >
          <Radio
            style={{
              marginRight: "10px",
              color: "#78757a",
            }}
            checked
          />
          Multiple Choice
        </MenuItem>
      </Select>
    </div>
  );
};

export default QuestionTop;
