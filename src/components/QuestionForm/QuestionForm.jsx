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
} from "../../redux/questionsSlice";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  addQuestionAPICall,
  getFormData,
  updateFormDescriptionAPICall,
  updateFormTitleAPICall,
} from "../../config/ApiCalls/formApiCalls";
import { useEffect } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import FormOption from "../FormComponents/FormOption/FormOption";

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
  const questions = useSelector((state) => state.questions.questions);
  const formTitle = useSelector((state) => state.questions.formTitle);
  const formDescription = useSelector(
    (state) => state.questions.formDescription
  );
  const formCode = useSelector((state) => state.questions.formCode);
  console.log(formCode);
  const dispatch = useDispatch();

  const getFormData2 = async () => {
    const res2 = await getFormData(formCode);
    console.log(res2);

    // Refresh Form
    const dummyQuestion = [];
    for (let i in res2.data.questions) {
      dummyQuestion.push({});
      dummyQuestion[i].questionText = res2.data.questions[i].question;
      dummyQuestion[i].answerKey = res2.data.questions[i].answer_key;
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
  //getFormData();
  useEffect(() => {
    // console.log(formCode);
    // const getFormData = async()=>{
    //   const formDetails = await getFormData(formCode);
    //   console.log(formDetails);
    //   return formDetails;
    // }
    getFormData2();
  }, []);
  const expandCloseAll = () => {
    dispatch(expandCloseAllHandler());
  };
  const handleExpand = (i) => {
    dispatch(handleExpandHandler({ i }));
  };
  const changeQuestion = (text, i) => {
    dispatch(changeQuestionHandler({ text, i }));
  };
  const addQuestionType = (i, type) => {
    dispatch(addQuestionTypeHandler({ i, type }));
  };
  const changeOptionValue = (text, i, j) => {
    dispatch(changeOptionValueHandler({ text, i, j }));
  };
  const removeOption = (i, j) => {
    dispatch(removeOptionHandler({ i, j }));
  };
  const addOption = (i) => {
    dispatch(addOptionHandler({ i }));
  };
  const copyQuestion = (i) => {
    dispatch(expandCloseAllHandler());
    dispatch(copyQuestionHandler({ i }));
  };
  const deleteQuestion = (i) => {
    console.log("hii");
    dispatch(deleteQuestionHandler({ i }));
  };
  const requiredQuestion = (i) => {
    console.log("hiii");
    dispatch(requiredQuestionHandler({ i }));
  };
  const getRequiredOrNot = (i) => {
    let reqQuestion = [...questions];
    return reqQuestion[i].required;
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
  const setOptionAnswer = (ans, qno) => {
    dispatch(setOptionAnswerHandler({ ans, qno }));
  };
  const setOptionPoints = (points, qno) => {
    let Question = [...questions];
    Question[qno].points = points;
    dispatch(setQuestions(Question));
    console.log(qno + " " + points);
  };
  const doneAnswer = (i) => {
    dispatch(doneAnswerHandler({ i }));
  };
  const addAnswer = (i) => {
    dispatch(addAnswerHandler({ i }));
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
                      className={questions[i].open ? `${styles.addBorder}` : ""}
                    >
                      <AccordionSummary
                        aria-controls="panelia-content"
                        id="panelia-header"
                        elevation={1}
                        style={{ width: "100%" }}
                      >
                        {/* If ith qs is not open*/}
                        {!questions[i].open ? (
                          <div className={styles.savedQuestions}>
                            <Typography
                              variant="body1"
                              style={{
                                frontSize: "15px",
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
                                    }}
                                    disabled
                                    control={
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        style={{ marginRight: "3px" }}
                                        required={ques.type}
                                      />
                                    }
                                    label={
                                      <Typography
                                        style={{
                                          fontFamily:
                                            "Roboto, Arial, sans-serif",
                                          fontSize: "13px",
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
                          {" "}
                          {!questions[i].answer ? (
                            // If we dont want to put answer key
                            <AccordionDetails className={styles.addQuestion}>
                              <div className={styles.addQuestionTop}>
                                {/* Change Question Field */}
                                <input
                                  type="text"
                                  className={styles.question}
                                  placeholder="Question"
                                  value={ques.questionText}
                                  onChange={(e) => {
                                    changeQuestion(e.target.value, i);
                                  }}
                                />

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

                              {/** Edit Options for Questions Field */}
                              {ques.options.map((op, j) => (
                                <FormOption i={i} j={j} ques={ques}/>
                                // <div className={styles.addQuestionBody} key={j}>
                                //   {/**If question type is text then there will be short rounded icon from mui
                                //    * else there will be input (for radio of box)
                                //    */}
                                //   {ques.questionType != "text" ? (
                                //     //  If Qs type is not text
                                //     <input
                                //       type={ques.questionType}
                                //       style={{ marginRight: "10px" }}
                                //     />
                                //   ) : (
                                //     /*********  If Qs type is text *************/
                                //     <ShortTextRounded
                                //       style={{ marginRight: "10px" }}
                                //     />
                                //   )}

                                //   {/** Input text value */}
                                //   <div>
                                //     <input
                                //       type="text"
                                //       className={styles.textInput}
                                //       placeholder="Option"
                                //       value={ques.options[j].optionText}
                                //       onChange={(e) => {
                                //         changeOptionValue(e.target.value, i, j);
                                //       }}
                                //     />
                                //     <Button
                                //           leftIcon={<CheckIcon />}
                                //           colorScheme="teal"
                                //           variant="solid"
                                //           //onClick={(e) => formDescSubmitHandler(e)}
                                //       >
                                //               Add
                                //       </Button>
                                //   </div>

                                //   {/* Image icon */}
                                //   <CropOriginalOutlined
                                //     style={{ color: "#516368" }}
                                //   />

                                //   {/* Cross Icon */}
                                //   <IconButton aria-label="delete">
                                //     <Close
                                //       onClick={() => {
                                //         removeOption(i, j);
                                //       }}
                                //     />
                                //   </IconButton>
                                // </div>
                              ))}

                              {/** If there are more than equal 5 option then dont show add more option button
                               * else show add more option button.
                               */}
                              {ques.options.length < 5 ? (
                                // If no of options is less than 5
                                <div className={styles.addQuestionBody}>
                                  <FormControlLabel
                                    disabled
                                    control={
                                      ques.questionType != "text" ? (
                                        // if not text then input field
                                        <input
                                          type={ques.questionType}
                                          color="primary"
                                          inputProps={{
                                            "aria-label": "secondary checkbox",
                                          }}
                                          style={{
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                          }}
                                          disabled
                                        />
                                      ) : (
                                        // if text then short text icon
                                        <ShortTextRounded
                                          style={{
                                            marginRight: 10,
                                            marginLeft: "10px",
                                          }}
                                        />
                                      )
                                    }
                                    label={
                                      <div>
                                        {/* add new option input */}
                                        <input
                                          type="text"
                                          className={styles.textInput}
                                          style={{
                                            fontSize: "13px",
                                            width: "60px",
                                          }}
                                          placeholder="Add other"
                                        />
                                        {/* Add new option button */}
                                        <Button
                                          size="small"
                                          onClick={() => {
                                            addOption(i);
                                          }}
                                          style={{
                                            textTransform: "none",
                                            color: "#4285f4",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                          }}
                                        >
                                          Add Option
                                        </Button>
                                      </div>
                                    }
                                  />
                                </div>
                              ) : (
                                // if no of options > 5 dont show any options
                                ""
                              )}

                              {/* Footer */}
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
                                    <NorthEastIcon
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
                                    <DeleteIcon />
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
                            </AccordionDetails>
                          ) : (
                            // If we want to put ans key
                            <AccordionDetails className={styles.addQuestion}>
                              <div className={styles.topHeader}>
                                Choose Correct Answer
                              </div>
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
                                    <div
                                      style={{ display: "flex" }}
                                      className=""
                                    >
                                      <div className={styles.formCheck}>
                                        <label
                                          style={{ fontSize: "13px" }}
                                          onClick={() => {
                                            setOptionAnswer(
                                              ques.options[j].optionText,
                                              i
                                            );
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
                                            <ShortTextRounded
                                              style={{ marginRight: "10px" }}
                                            />
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
                          )}
                          {/* options at right side */}
                          {!ques.answer ? (
                            <div className={styles.questionEdit}>
                              <AddCircleOutline
                                onClick={addMoreQuestionField}
                                className={styles.edit}
                              />
                              <OndemandVideo className={styles.edit} />
                              <CropOriginal className={styles.edit} />
                              <TextFields className={styles.edit} />
                            </div>
                          ) : (
                            " "
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

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.questionForm}>
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
      </div>
    </div>
  );
};

export default QuestionForm;
