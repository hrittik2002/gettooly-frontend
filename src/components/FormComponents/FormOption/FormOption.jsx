import React from "react";
import styles from "./FormOption.module.css";
import {
  Close,
  CropOriginalOutlined,
  ShortTextRounded,
} from "@mui/icons-material";
import { Button, IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  changeOptionValueHandler,
  removeOptionHandler,
  setFormDescription,
  setFormTitle,
  setQuestions,
} from "../../../redux/questionsSlice";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getFormData, updateOptionAPICall } from "../../../config/ApiCalls/formApiCalls";
import { useSelector } from "react-redux";

const FormOption = ({ i, j, ques }) => {
    const [optionBtn , setOptionBtn] = useState(false);
    const optionId = useSelector((state) => state.questions.questions[i].options[j].id);
    const formCode = useSelector((state) => state.questions.formCode);
    const [optionValue , setOptionValue] = useState("");

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
          if (res2.data.questions[i].question_type === "multiple choice")
            dummyQuestion[i].questionType = "radio";
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
    const res = await updateOptionAPICall(newOption, optionId , formCode);
    getFormData2();
    setOptionBtn(false);
    setOptionValue("");
  };
  const removeOption = (i, j) => {
    dispatch(removeOptionHandler({ i, j }));
  };
  return (
    <div className={styles.addQuestionBody} key={j}>
      {/**If question type is text then there will be short rounded icon from mui
       * else there will be input (for radio of box)
       */}
      {ques.questionType != "text" ? (
        //  If Qs type is not text
        <input type={ques.questionType} style={{ marginRight: "10px" }} />
      ) : (
        /*********  If Qs type is text *************/
        <ShortTextRounded style={{ marginRight: "10px" }} />
      )}

      {/** Input text value */}
      <div>
        <input
          type="text"
          className={styles.textInput}
          placeholder={ques.options[j].optionText}
          onChange={(e) => {
            changeOptionValue(e.target.value, i, j);
          }}
        />
        {optionBtn  &&
        <Button
        leftIcon={<CheckIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={optionSubmitHandler}
      >
        Add
      </Button>
        }
        
      </div>

      {/* Image icon */}
      <CropOriginalOutlined style={{ color: "#516368" }} />

      {/* Cross Icon */}
      <IconButton aria-label="delete">
        <Close
          onClick={() => {
            removeOption(i, j);
          }}
        />
      </IconButton>
    </div>
  );
};

export default FormOption;
