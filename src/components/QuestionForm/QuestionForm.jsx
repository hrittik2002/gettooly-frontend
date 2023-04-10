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
  Button,
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
  const [questions, setQuestions] = useState([
    {
      questionText: "Which is the capital city of West Bengal ? ",
      questionType: "radio",
      options: [
        { optionText: "Bangaluru" },
        { optionText: "Kolkata" },
        { optionText: "Mumbai" },
        { optionText: "Delhi" },
      ],
      answer: false,
      answerKey: "",
      points: 0,
      open: true,
      required: false,
    },
  ]);
  const expandCloseAll = () => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  };
  const handleExpand = (i) => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs.open = false;
      }
    }
    setQuestions(qs);
  };

  const changeQuestion = (text, i) => {
    const newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  };
  const addQuestionType = (i, type) => {
    //console.log(type)
    let qs = [...questions];
    //console.log(type)
    qs[i].questionType = type;
    setQuestions(qs);
  };
  const changeOptionValue = (text, i, j) => {
    //console.log(text)
    let optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
  };
  const removeOption = (i, j) => {
    let RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
      //console.log(i , j);
    }
  };
  const addOption = (i) => {
    let optionOfQuestion = [...questions];
    if (optionOfQuestion[i].options.length < 5) {
      optionOfQuestion[i].options.push({
        optionText: "Option " + (optionOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Max 5 options");
    }
    setQuestions(optionOfQuestion);
  };
  const copyQuestion = (i) => {
    expandCloseAll();
    let qs = [...questions];
    let newQuestion = { ...qs[i] };
    setQuestions([...questions, newQuestion]);
  };
  const deleteQuestion = (i) => {
    console.log("hii");
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  };
  const requiredQuestion = (i) => {
    let reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    console.log(reqQuestion[i].required + " " + i);
    setQuestions(reqQuestion);
  };
  const getRequiredOrNot = (i) => {
    let reqQuestion = [...questions];
    return reqQuestion[i].required;
  };
  const addMoreQuestionField = () => {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
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
    setQuestions(itemF);
  };
  const setOptionAnswer = (ans, qno) => {
    let Question = [...questions];
    Question[qno].answerKey = ans;
    setQuestions(Question);
    console.log(qno + " " + ans);
  };

  const setOptionPoints = (points, qno) => {
    let Question = [...questions];
    Question[qno].points = points;
    setQuestions(Question);
    console.log(qno + " " + points);
  };
  const doneAnswer = (i) => {
    let answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  };
  const addAnswer = (i) => {
    let answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
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

                      {questions[i].open ? (
                        <div
                          className={`${styles.questionBoxes}`}
                          style={{ display: "flex" }}
                        >
                          {" "}
                          {!questions[i].answer ? (
                            <AccordionDetails className={styles.addQuestion}>
                              <div className={styles.addQuestionTop}>
                                <input
                                  type="text"
                                  className={styles.question}
                                  placeholder="Question"
                                  value={ques.questionText}
                                  onChange={(e) => {
                                    changeQuestion(e.target.value, i);
                                  }}
                                />
                                <CropOriginal style={{ color: "#5f6368" }} />
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
                              {ques.options.map((op, j) => (
                                <div className={styles.addQuestionBody} key={j}>
                                  {ques.questionType != "text" ? (
                                    <input
                                      type={ques.questionType}
                                      style={{ marginRight: "10px" }}
                                    />
                                  ) : (
                                    <ShortTextRounded
                                      style={{ marginRight: "10px" }}
                                    />
                                  )}
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
                                  </div>
                                  <CropOriginalOutlined
                                    style={{ color: "#516368" }}
                                  />
                                  <IconButton aria-label="delete">
                                    <Close
                                      onClick={() => {
                                        removeOption(i, j);
                                      }}
                                    />
                                  </IconButton>
                                </div>
                              ))}

                              {ques.options.length < 5 ? (
                                <div className={styles.addQuestionBody}>
                                  <FormControlLabel
                                    disabled
                                    control={
                                      ques.questionType != "text" ? (
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
                                        <input
                                          type="text"
                                          className={styles.textInput}
                                          style={{
                                            fontSize: "13px",
                                            width: "60px",
                                          }}
                                          placeholder="Add other"
                                        />
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
                                ""
                              )}
                              <div className={styles.addFooter}>
                                <div className={styles.addQuestionBottomLeft}>
                                  <Button
                                    size="small"
                                    style={{
                                      textTransform: "none",
                                      color: "#4285f4",
                                      fontSize: "13px",
                                      fontWeight: "600",
                                    }}
                                    onClick={()=>{addAnswer(i)}}
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

                                <div className={styles.addQuestionBottom}>
                                  <IconButton
                                    aria-label="Copy"
                                    onClick={() => {
                                      copyQuestion(i);
                                    }}
                                  >
                                    <FilterNone />
                                  </IconButton>

                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      deleteQuestion(i);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>

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

                                  <IconButton>
                                    <MoreVert />
                                  </IconButton>
                                </div>
                              </div>
                            </AccordionDetails>
                          ) : (
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
              <input
                type="text"
                className={styles.questionFormTopName}
                style={{ color: "black" }}
                placeholder="Untitled Document"
              />
              <input
                type="text"
                className={styles.questionFormTopDesc}
                style={{ color: "black" }}
                placeholder="Form Description"
              />
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
