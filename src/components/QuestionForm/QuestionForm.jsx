import React from "react";
import styles from "./QuestionForm.module.css";
import { useState } from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DragIndicator, TextSnippet } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import {
  AddCircleOutline,
  CheckBox,
  Close,
  CropOriginal,
  CropOriginalOutlined,
  FilterNone,
  MoreVert,
  OndemandVideo,
  ShortText,
  ShortTextOutlined,
  ShortTextRounded,
  Subject,
  TextFields,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setQuestions,
  changeQuestionHandler,
  addQuestionTypeHandler,
  changeOptionValueHandler,
  removeOptionHandler,
  addOptionHandler,
  expandCloseAllHandler,
  handleExpandHandler,
  copyQuestionHandler,
  deleteQuestionHandler,
  requiredQuestionHandler,
  addAnswerHandler,
  doneAnswerHandler,
  setOptionAnswerHandler,
  setFormTitle,
  setFormDescription,
  setBackgroundColor,
} from "../../redux/questionsSlice";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  addOptionApiCall,
  addQuestionAPICall,
  getFormData,
  updateFormDescriptionAPICall,
  updateFormTitleAPICall,
} from "../../config/ApiCalls/formApiCalls";
import { useEffect } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import FormOption from "../FormComponents/FormOption/FormOption";
import QuestionTop from "../FormComponents/QuestionTop/QuestionTop";
import QuestionFooter from "../FormComponents/QuestionFooter/QuestionFooter";
import {
  set_allow_view_score,
  set_authenticated_responder,
  set_collect_email,
  set_confirmation_message,
  set_edit_after_submit,
  set_is_quiz,
} from "../../redux/settingsSlice";
import AnswerKey from "../FormComponents/AnswerKey/AnswerKey";
import AddNewQuestion from "../FormComponents/AddNewQuestion/AddNewQuestion";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.5,
      marginBottom: "1.5rem",
    },
  },
});

const QuestionForm = () => {
  const [formTitleChange, setFormTitleChange] = useState(false);
  const [formTitleValue, setFormTitleValue] = useState("");
  const [formDescChange, setFormDescChange] = useState(false);
  const [formDescValue, setFormDescValue] = useState("");

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
    console.log(dummyQuestion);
    dispatch(setQuestions(dummyQuestion));

    // Refresh Form Title
    dispatch(setFormTitle(res2.data.title));
    // Refresh Form Description
    dispatch(setFormDescription(res2.data.description));

    // refresh bg color
    dispatch(setBackgroundColor(res2.data.background_color));

    // refresh the settings
    dispatch(set_collect_email(res2.data.collect_email));
    dispatch(set_authenticated_responder(res2.data.authenticated_responder));
    dispatch(set_edit_after_submit(res2.data.edit_after_submit));
    dispatch(set_confirmation_message(res2.data.confirmation_message));
    dispatch(set_is_quiz(res2.data.is_quiz));
    dispatch(set_allow_view_score(res2.data.allow_view_score));
  };

  useEffect(() => {
    getFormData2();
  }, []);

  const questions = useSelector((state) => state.questions.questions);
  const formTitle = useSelector((state) => state.questions.formTitle);
  const bgColor = useSelector((state) => state.questions.bgColor);
  const formDescription = useSelector(
    (state) => state.questions.formDescription
  );
  const formCode = useSelector((state) => state.questions.formCode);
  console.log(formCode);
  const dispatch = useDispatch();

  const expandCloseAll = () => {
    dispatch(expandCloseAllHandler());
  };
  const handleExpand = (i) => {
    dispatch(handleExpandHandler({ i }));
  };
  const addOption = async (i) => {
    //dispatch(addOptionHandler({ i }));
    console.log(formCode);
    console.log(questions[i].id);
    const res = await addOptionApiCall(formCode, questions[i].id);
    getFormData2();
  };
  const addMoreQuestionField = async () => {
    expandCloseAll();
    const res = await addQuestionAPICall(formCode);
    console.log(res);
    getFormData2();
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    dispatch(setQuestions(itemF));
  };
  const titleChangeHandler = (e) => {
    const value = e.target.value;
    setFormTitleValue(value);
    if (value === undefined || value === null || value === "") {
      setFormTitleChange(false);
    } else {
      setFormTitleChange(true);
    }
  };
  const formTitleSubmitHandler = async (e) => {
    const newTitle = formTitleValue;
    const res = await updateFormTitleAPICall(newTitle, formCode);
    getFormData2();
    setFormTitleChange(false);
    setFormTitleValue("");
  };
  const descChangeHandler = (e) => {
    const value = e.target.value;
    setFormDescValue(value);
    if (value === undefined || value === null || value === "") {
      setFormDescChange(false);
    } else {
      setFormDescChange(true);
    }
  };
  const formDescSubmitHandler = async (e) => {
    const newDesc = formDescValue;
    const res = await updateFormDescriptionAPICall(newDesc, formCode);
    getFormData2();
    setFormDescChange(false);
    setFormDescValue("");
  };

  function questionUI() {
    console.log(questions);
    return questions.map((ques, i) => (
      <ThemeProvider theme={theme}>
        <Draggable key={1} draggableId={i + "id"} index={i}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                <div style={{ marginBottom: "0px" }}>
                  <div style={{ width: "100%", marginBottom: "0px" }}>
                    <DragIndicator
                      style={{
                        transform: "rotate(-90deg)",
                        color: "#DAE0E2",
                        position: "relative",
                        left: "300px",
                      }}
                      fontSize="small"
                    />
                  </div>
                  {/* Code Starts from here */}
                  <div>
                    <Accordion
                      expanded={questions[i].open}
                      onChange={() => {
                        handleExpand(i);
                      }}
                      styles={{ backgroundColor: "blue" , height : "400px" }}
                      className={
                        questions[i].open
                          ? `${styles.addBorder} ${styles.questionBoxContainer}`
                          : `${styles.questionBoxContainer}`
                      }
                    >
                      <AccordionSummary
                        aria-controls="panelia-content"
                        id="panelia-header"
                        elevation={1}
                        style={{ width: "100%"}}
                       // style={{backgroundColor : "red" , height : "200px"}}
                      >
                        {/* If ith qs is not open*/}
                        {!questions[i].open ? (
                          <div  className={styles.savedQuestions}>
                            <Typography
                              variant="body1"
                              style={{
                                frontSize: "18px",
                                fontWeight: "400",
                                letterSpacing: ".1px",
                                lineHeight: "24px",
                                paddingBottom: "8px",
                              }}
                            >
                              {`${i + 1} . `}
                              {questions[i].questionText}
                            </Typography>
                            {ques.options.map((op, j) => (
                              <div key={j}>
                                <div style={{ display: "flex" }}>
                                  <FormControlLabel
                                    style={{
                                      marginLeft: "5px",
                                      marginBottom: "5px",
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      textAlign: "center",

                                      width: "100%",
                                    }}
                                    disabled
                                    control={
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        backgroundColor="#fff"
                                        style={{ marginRight: "10px" }}
                                        required={ques.type}
                                      />
                                    }
                                    label={
                                      <Typography
                                        style={{
                                          fontFamily:
                                            "Roboto, Arial, sans-serif",
                                          fontSize: "16px",
                                          fontWeight: "400",
                                          letterSpacing: "0.2px",
                                          lineHeight: "20px",
                                          color: "#202124",
                                        }}
                                      >
                                        {ques.options[j].optionText}
                                      </Typography>
                                    }
                                  ></FormControlLabel>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                      </AccordionSummary>

                      {/** If qs us opened */}
                      {questions[i].open ? (
                        <div
                          className={`${styles.questionBoxes}`}
                          style={{ display: "flex" }}
                        >
                          {!questions[i].answer ? (
                            // If we dont want to put answer key
                            <AccordionDetails className={styles.addQuestion}>
                              <QuestionTop
                                i={i}
                                ques={ques}
                                getFormData2={getFormData2}
                              />

                              {/** Edit Options for Questions Field */}
                              {ques.options.map((op, j) => (
                                <FormOption i={i} j={j} ques={ques} />
                              ))}

                              {/* Footer */}
                              <QuestionFooter
                                i={i}
                                ques={ques}
                                questions={questions}
                                getFormData2={getFormData2}
                              />
                            </AccordionDetails>
                          ) : (
                            <AnswerKey ques={ques} i={i} />
                          )}
                        </div>
                      ) : (
                        " "
                      )}
                    </Accordion>
                    ;
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </ThemeProvider>
    ));
  }
  console.log(bgColor);

  return (
    <div style={{ width: "100%" }}>
      <div
        className={styles.questionForm}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <br></br>
        <div className={styles.section}>
          <div className={styles.questionTitleSection}>
            <div className={styles.questionFormTop}>
              <div className={styles.parentContainer1}>
                <input
                  type="text"
                  className={styles.questionFormTopName}
                  style={{ color: "black" }}
                  placeholder={`${formTitle}`}
                  onChange={(e) => {
                    titleChangeHandler(e);
                  }}
                />
                {formTitleChange && (
                  <Button
                    className={styles.questionFormBtn}
                    leftIcon={<CheckIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={(e) => formTitleSubmitHandler(e)}
                  >
                    Add
                  </Button>
                )}
              </div>
              <div className={styles.parentContainer1}>
                <input
                  type="text"
                  className={styles.questionFormTopDesc}
                  style={{ color: "black" }}
                  placeholder={`${formDescription}`}
                  onChange={(e) => {
                    descChangeHandler(e);
                  }}
                />
                {formDescChange && (
                  <Button
                    leftIcon={<CheckIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={(e) => formDescSubmitHandler(e)}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <AddNewQuestion
          getFormData2={getFormData2}
          formCode={formCode}
          expandCloseAll={expandCloseAll}
        />
      </div>
    </div>
  );
};

export default QuestionForm;
