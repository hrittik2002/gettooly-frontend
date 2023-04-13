import React from "react";
import styles from "./FormOption.module.css";
import {
  Close,
  CropOriginalOutlined,
  ShortTextRounded,
} from "@mui/icons-material";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  changeOptionValueHandler,
  removeOptionHandler,
} from "../../../redux/questionsSlice";
const FormOption = ({ i, j, ques }) => {
  const dispatch = useDispatch();
  const changeOptionValue = (text, i, j) => {
    dispatch(changeOptionValueHandler({ text, i, j }));
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
          placeholder="Option"
          value={ques.options[j].optionText}
          onChange={(e) => {
            changeOptionValue(e.target.value, i, j);
          }}
        />
        {/* <Button
          leftIcon={<CheckIcon />}
          colorScheme="teal"
          variant="solid"
          //onClick={(e) => formDescSubmitHandler(e)}
        >
          Add
        </Button> */}
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
