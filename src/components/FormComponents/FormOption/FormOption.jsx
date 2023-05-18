import React from "react";
import styles from "./FormOption.module.css";
import {
  Close,
  CropOriginalOutlined,
  Delete,
  ShortTextRounded,
} from "@mui/icons-material";
import { Button, IconButton, Textarea } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  changeOptionValueHandler,
  removeOptionHandler,
  setBackgroundColor,
  setFormDescription,
  setFormTitle,
  setQuestions,
} from "../../../redux/questionsSlice";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  deleteOptionApiCall,
  getFormData,
  updateOptionAPICall,
} from "../../../config/ApiCalls/formApiCalls";
import { useSelector } from "react-redux";

const FormOption = ({ i, j, ques }) => {
  const [optionBtn, setOptionBtn] = useState(false);
  const optionId = useSelector(
    (state) => state.questions.questions[i].options[j].id
  );
  const formCode = useSelector((state) => state.questions.formCode);
  const [optionValue, setOptionValue] = useState("");

  const getFormData2 = async () => {
    const res2 = await getFormData(formCode);
    console.log(res2);

    // Refresh Form
    const dummyQuestion = [];
    for (let i in res2.data.questions) {
      dummyQuestion.push({});
      dummyQuestion[i].questionText = res2.data.questions[i].question;
      dummyQuestion[i].answerKey = res2.data.questions[i].answer_key;
      dummyQuestion[i].id = res2.data.questions[i].id;
      dummyQuestion[i].required = res2.data.questions[i].required;
      dummyQuestion[i].points = res2.data.questions[i].score;
      dummyQuestion[i].questionType = "radio";
      if (res2.data.questions[i].question_type === "multiple choice") {
        dummyQuestion[i].questionType = "radio";
      } else if (res2.data.questions[i].question_type === "paragraph") {
        dummyQuestion[i].questionType = "text";
      } else if (res2.data.questions[i].question_type === "checkbox") {
        dummyQuestion[i].questionType = "checkbox";
      }
      dummyQuestion[i].options = [];
      for (let j in res2.data.questions[i].choices) {
        dummyQuestion[i].options.push({});
        dummyQuestion[i].options[j].optionText =
          res2.data.questions[i].choices[j].choice;
        dummyQuestion[i].options[j].id = res2.data.questions[i].choices[j].id;
        dummyQuestion[i].options[j].isAnswer =
          res2.data.questions[i].choices[j].is_answer;
      }
    }
    dispatch(setQuestions(dummyQuestion));
    // refresh bg color
    dispatch(setBackgroundColor(res2.data.background_color));
    // Refresh Form Title
    dispatch(setFormTitle(res2.data.title));
    // Refresh Form Description
    dispatch(setFormDescription(res2.data.description));
    return dummyQuestion;
  };

  const dispatch = useDispatch();
  const changeOptionValue = (value, i, j) => {
    // dispatch(changeOptionValueHandler({ text, i, j }));
    setOptionValue(value);
    if (value === undefined || value === null || value === "") {
      setOptionBtn(false);
    } else {
      setOptionBtn(true);
    }
  };
  const optionSubmitHandler = async () => {
    const newOption = optionValue;
    const res = await updateOptionAPICall(newOption, optionId, formCode);
    getFormData2();
    setOptionBtn(false);
    setOptionValue("");
  };
  const removeOption = async (i, j) => {
    console.log(i, j, ques.options[j].id);
    const optId = ques.options[j].id;
    const res = await deleteOptionApiCall(formCode, optId);
    getFormData2();
    setOptionBtn(false);
    setOptionValue("");
  };
  return (
    <div className={styles.addQuestionBody} key={j}>
      <input type={ques.questionType} style={{ marginRight: "10px" }} />

      <div>
        <input
          type="text"
          className={styles.textInput}
          placeholder={ques.options[j].optionText}
          onChange={(e) => {
            changeOptionValue(e.target.value, i, j);
          }}
        />
      </div>

      {optionBtn && (
        <button className={styles.addOption} onClick={optionSubmitHandler}>
          Update
        </button>
      )}

      {/* Cross Icon */}
      <IconButton
        aria-label="delete"
        onClick={() => {
          removeOption(i, j);
        }}
      >
        <Delete style={{ color: "red" }} />
      </IconButton>
    </div>
  );
};

export default FormOption;
