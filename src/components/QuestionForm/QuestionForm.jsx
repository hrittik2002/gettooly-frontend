import React from "react";
import styles from "./QuestionForm.module.css";
import { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { CheckBox, CropOriginal, Subject } from "@mui/icons-material";

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
      open: true,
      required: false,
    },
  ]);
  function questionUI() {
    return questions.map((ques, i) => (
      <ThemeProvider theme={theme}>
        <div>
          {/* <Typography variant="body1">
          Hello, world!
        </Typography> */}
          <Accordion
            variant="body1"
            expanded={questions[i].open}
            className={questions[i].open ? "add border" : ""}
          >
            <AccordionSummary
              variant="body1"
              aria-controls="panelia-content"
              id="panelia-header"
              elevation={1}
              style={{ width: "100%" }}
            >
              {questions[i].open ? (
                <div className="saved_questions">
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
                    "idk"
                  </Typography>
                  {ques.options.map((op, j) => (
                    <div key={j}>
                      <div style={{ display: "flex" }}>
                        <FormControlLabel
                          variant="body1"
                          style={{ marginLeft: "5px", marginBottom: "5px" }}
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
                            variant="body1"
                              style={{
                                fontFamily: "Roboto, Arial, sans-serif",
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

            <div className="question boxes">
              <AccordionDetails variant="body1" className="add_question">
                <div className="add_question_top">
                  <input
                    type="text"
                    className="question"
                    placeholder="Question"
                    value={ques.questionText}
                  />
                  <CropOriginal style={{ color: "#5f6368" }} />
                  <select
                    className="select"
                    style={{ color: "#5f6368", fontSize: "13px" }}
                  >
                    <option id="text" value="Text">
                      <Subject style={{ marginRight: "10px" }} />
                      Paragraph
                    </option>
                    <option id="checkbox" value="checkbox">
                      <CheckBox
                        style={{ marginRight: "10px", color: "#70757a" }}
                        checked
                      />
                      Checkbox
                    </option>
                    <option id="radio" value="Radio">
                      <Radio
                        style={{ marginRight: "10px", color: "#78757a" }}
                        checked
                      />
                      Multiple Choice
                    </option>
                  </select>
                </div>
                
              </AccordionDetails>
            </div>
          </Accordion>
          ;
        </div>
      </ThemeProvider>
    ));
  }
  /**
   *  <Accordion
        expanded={questions[i].open}
        className={questions[i].open ? "add border" : ""}
      >
        <AccordionSummary
          aria-controls="panelia-content"
          id="panelia-header"
          elevation={1}
          style={{ width: "100%" }}
        >
          {questions[i].open ? (
            <div className="saved_questions">
              <Typography
                style={{
                  frontSize: "15px",
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                }}
              ></Typography>
              {ques.options.map((op, j) => (
                <div key={j} >
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    style={{ marginLeft: "5px", marginBottom: "5px" }}
                    disabled
                    control={<input type={ques.questionType} color="primary" style={{marginRight:"3px"}} required={ques.type}/>}
                    label={
                      <Typography
                      style={{
                        fontFamily:"Roboto,Arial,sans-serif",
                        fontSize:"13px",
                        fontWeight:"400",
                        letterSpacing:"0.2px",
                        letterHeight:"20px",
                        color:"#202124",}}
                      >
                        {ques.options[i].optionText}
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
      </Accordion>;
   */
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
          {questionUI()}
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
