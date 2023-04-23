import React from "react";
import styles from "./AddNewQuestion.module.css";
import { AddCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { expandCloseAllHandler } from "../../../redux/questionsSlice";
import { addQuestionAPICall } from "../../../config/ApiCalls/formApiCalls";
const AddNewQuestion = ({getFormData2 , formCode , expandCloseAll}) => {
  const dispatch = useDispatch();
  const addMoreQuestionField = async () => {
    expandCloseAll();
    const res = await addQuestionAPICall(formCode);
    console.log(res);
    getFormData2();
  };
  return (
    <div className={styles.addNewQuestionBtn}>
      <AddCircleOutline
        fontSize="large"
        onClick={addMoreQuestionField}
        className={styles.edit}
      />
    </div>
  );
};

export default AddNewQuestion;
