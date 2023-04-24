import React, { useReducer, useRef, useState } from "react";
import styles from "./QuestionTop.module.css";
import {
  CheckBox,
  CropOriginal,
  RadioButtonChecked,
  ShortText,
  Subject,
} from "@mui/icons-material";
import { MenuItem, Radio, Select, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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
import ShortTextIcon from "@mui/icons-material/ShortText";
import JoditEditor from "jodit-react";
import styled from "styled-components";

const CustomSelect = styled(Select)`
  font-size: 14px;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 200px;

  .MuiSelect-icon {
    color: #999;
  }

  .MuiSelect-select:focus {
    background-color: transparent;
    border-color: #0086b3;
    box-shadow: 0 0 0 0.1rem rgba(0, 133, 179, 0.25);
  }

  .MuiListItem-root:hover {
    background-color: #e8e8e8;
  }

  .MuiListItem-root.Mui-selected {
    background-color: #0086b3;
    color: #fff;
  }
`;

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

const QuestionTop = ({ i, ques, getFormData2 }) => {
  const formCode = useSelector((state) => state.questions.formCode);
  const editor = useRef(null);
  const [content, setContent] = useState(
    ques.questionText !== null ? ques.questionText : ""
  );

  const { required, questionType, id, questionText } = useSelector(
    (state) => state.questions.questions[i]
  );
  console.log(id, required, questionType, questionText);
  const [state, dispatch] = useReducer(reducer, {
    isQuestion: false,
    questionValue: questionText,
  });
  const [value , setValue] = useState(questionType === "radio" ? "radio" : questionType === "checkbox" ? "checkbox" : 
  "text")
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
  const questionSubmitHandler = async (getFormData2) => {
    const newQuestion = content;
    console.log(content);
    // const newQuestion = state.questionValue;
    const res = await updateQuestionAPICall(
      formCode,
      id,
      newQuestion,
      questionType,
      required
    );
    await getFormData2();
    // dispatch({ type: "setQuestionValue", value: "" });
    // dispatch({ type: "setIsQuestion", value: false });
  };
  const addQuestionType = async (i, type) => {
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
    getFormData2();
    setValue(type === "radio" ? "radio" : type === "checkbox" ? "checkbox" : 
    "text")
    dispatch({ type: "setQuestionValue", value: "" });
    dispatch({ type: "setIsQuestion", value: false });
  };

  return (
    <div className={styles.addQuestionTop}>
      {/* Change Question Field */}

      {/* <input
        type="text"
        className={styles.question}
        placeholder={ques.questionText}
        onChange={(e) => {
          changeQuestion(e.target.value, i);
        }}
      /> */}
      <JoditEditor
        ref={editor}
        value={content}
        placeholder={ques.questionText}
        tabIndex={1} // tabIndex of textarea
        onChange={(newContent) => setContent(newContent)}
      />

      {content && (
        <Button
          leftIcon={<CheckIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            questionSubmitHandler(getFormData2);
          }}
        />
      )}

      {/* Choose radio or box or paragraph field */}
      <CustomSelect
       value={value}
       style={{paddingLeft : "2px" , paddingBottom : "4px"}}
      // onChange={handleChange}
      >
        <MenuItem
          id="text"
          value="text"
          onClick={() => {
            addQuestionType(i, "text");
          }}
        >
          <div style={{display : "flex" , alignItems : "center" , gap : "4px"}}>
          <div>
          <Subject style={{ marginRight: "1px" }} />
          </div>
          <div>Paragraph</div>
          </div>
        </MenuItem>
        <MenuItem
          id="checkbox"
          value="checkbox"
          onClick={() => {
            addQuestionType(i, "checkbox");
          }}
        >
          <div style={{display : "flex" , alignItems : "center" , gap : "4px"}}>
          <div>
          <CheckBox
            style={{
              marginRight: "1px",
              color: "#70757a",
            }}
            checked
          />
          </div>
          
          
          <div>Checkbox</div>
          </div>
          
        </MenuItem>
        <MenuItem
          id="radio"
          value="radio"
          className={styles.menuItems}
          onClick={() => {
            addQuestionType(i, "radio");
          }}
        >
          <div style={{display : "flex" , alignItems : "center" , gap : "4px"}}>
          <div>
          <RadioButtonCheckedIcon
            style={{
              marginRight: "1px",
              color: "#78757a",
            }}
          />
          </div>
          
          <div>Multiple Choice</div>
          </div>
        </MenuItem>
      </CustomSelect>

      {/* <Select
        className={styles.select}
        style={{ color: "#5f6368", fontSize: "13px" , display : "flex" , justifyContent : "center" , alignItems : "center" }}
        defaultValue="Radio"
        labelId="question-type-label"
        id="question-type"
        displayEmpty
        inputProps={{ 'aria-label': 'Question Type' }}
        variant="outlined"

      >
        <MenuItem
          id="text"
          value="Text"
          onClick={() => {
            addQuestionType(i, "text");
          }}
          className={styles.menuItems}
        >
          <Subject style={{ marginRight: "1px" }} />
          Paragraph
        </MenuItem>
        <MenuItem
          id="checkbox"
          value="Checkbox"
          className={styles.menuItems}
          onClick={() => {
            addQuestionType(i, "checkbox");
          }}
        >
          <CheckBox
            style={{
              marginRight: "1px",
              color: "#70757a",
         
            }}
            checked
          />
          Checkbox
        </MenuItem>
        <MenuItem
          id="radio"
          value="Radio"
          className={styles.menuItems}
          onClick={() => {
            addQuestionType(i, "radio");
          }}
        >
          <RadioButtonCheckedIcon

            style={{
              marginRight: "1px",
              color: "#78757a",
            
            }}
          />
          Multiple Choice
        </MenuItem>
        <MenuItem
          id="shortQs"
          value="ShortQuestion"
          className={styles.menuItems}
          onClick={() => {
            addQuestionType(i, "shortquestion");
          }}
        >
          <ShortTextIcon style={{ marginRight: "1px" }} />
          Short Question
        </MenuItem>
      </Select> */}
    </div>
  );
};

export default QuestionTop;
