import React, { useState } from "react";
import styles from "./QuestionForm.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  AddCircle,
  CheckBox,
  Close,
  CropOriginal,
  Remove,
  Save,
  ShortText,
  Subject,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: "Which is the capital city of West Bengal?",
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

  const AccordionHeader = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }));

  const QuestionBox = styled("div")(({ theme }) => ({
    marginBottom: "1rem",
    "& .MuiAccordion-root": {
      border: "1px solid #ddd",
      boxShadow: "none",
      "&.add": {
        border: "1px solid #4285f4",
        "& .MuiAccordionSummary-root": {
          backgroundColor: "#4285f4",
          color: "#fff",
        },
      },
    },
    "& .MuiAccordionSummary-root": {
      padding: "0 1rem",
      minHeight: "3.5rem",
      "& .MuiIconButton-root": {
        color: "#5f6368",
      },
    },
    "& .MuiAccordionDetails-root": {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: "#f1f3f4",
    },
    "& .addQuestionTop": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    "& .addQuestionBody": {
      display: "flex",
      alignItems: "center",
      marginTop: "1rem",
      "& .MuiSvgIcon-root": {
        color: "#5f6368",
      },
      "& .textInput": {
        marginLeft: "1rem",
        width: "100%",
      },
    },
  }));

  function handleQuestionTextChange(event, index) {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  }
  

  function handleQuestionTypeChange(event, index) {
    const newQuestions = [...questions];
    newQuestions[index].questionType = event.target.value;
    setQuestions(newQuestions);
  }
  const handleCharacterLimitChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].characterLimit = parseInt(event.target.value);
    setQuestions(newQuestions);
  };

  const handlePlaceholderTextChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].placeholderText = event.target.value;
    setQuestions(newQuestions);
  };
  function handleOptionTextChange(event, questionIndex, optionIndex) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].optionText =
      event.target.value;
    setQuestions(newQuestions);
  }

  function handleAddOptionClick(questionIndex) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ optionText: "" });
    setQuestions(newQuestions);
  }

  function handleAddQuestion() {
    const newQuestions = [...questions];
    newQuestions.push({
      questionText: "",
      questionType: "radio",
      options: [{ optionText: "" }, { optionText: "" }],
      open: true,
      required: false,
    });
    setQuestions(newQuestions);
  }
  const handleAddQuestionClick = () => {
    setQuestions([
      ...questions,
      { questionType: "radio", options: [{ optionText: "" }] },
    ]);
  };

  const handleRemoveOptionClick = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAccordionChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].open = !newQuestions[index].open;
    setQuestions(newQuestions);
  };

  function handleRemoveQuestion(index) {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  //   onSubmit(questions);
  //   onClose();
  };
  return (
    <ThemeProvider theme={theme}>
      <QuestionBox>
        {questions.map((question, index) => (
          <Accordion
            key={index}
            className={question.open ? "add" : ""}
            onChange={() => handleAccordionChange(index)}
          >
            <AccordionSummary expandIcon={<CropOriginal />}>
              <AccordionHeader>
                <Typography variant="body1">Question {index + 1}</Typography>
                <IconButton onClick={() => handleRemoveQuestion(index)}>
                  <Close />
                </IconButton>
              </AccordionHeader>
            </AccordionSummary>
            <AccordionDetails>
              <div className="addQuestionTop">
                <TextField
                  variant="outlined"
                  label="Question text"
                  fullWidth
                  value={question.questionText}
                  onChange={(event) => handleQuestionTextChange(event, index)}
                />
                <FormControlLabel
                  control={
                    <CheckBox
                      color="primary"
                      checked={question.required}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[index].required =
                          !newQuestions[index].required;
                        setQuestions(newQuestions);
                      }}
                    />
                  }
                  label="Required"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <CheckBox
                      color="primary"
                      checked={question.characterLimit !== -1}
                      onChange={() => {
                        const newQuestions = [...questions];
                        if (newQuestions[index].characterLimit !== -1) {
                          newQuestions[index].characterLimit = -1;
                        } else {
                          newQuestions[index].characterLimit = 100;
                        }
                        setQuestions(newQuestions);
                      }}
                    />
                  }
                  label="Character limit"
                  labelPlacement="start"
                />
              </div>
              {question.questionType === "dropdown" && (
                <>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="addQuestionBody">
                      <TextField
                        className="textInput"
                        variant="outlined"
                        label="Option text"
                        fullWidth
                        value={option.optionText}
                        onChange={(event) =>
                          handleOptionTextChange(event, index, optionIndex)
                        }
                      />
                      <IconButton
                        onClick={() =>
                          handleRemoveOptionClick(index, optionIndex)
                        }
                      >
                        <Close />
                      </IconButton>
                    </div>
                  ))}
                  <div className="addQuestionBody">
                    <IconButton onClick={() => handleAddOptionClick(index)}>
                      <Subject />
                    </IconButton>
                    <Typography
                      variant="body1"
                      onClick={() => handleAddOptionClick(index)}
                    >
                      Add option
                    </Typography>
                  </div>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <div className="addQuestionFooter">
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddQuestionClick}
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </QuestionBox>
    </ThemeProvider>
  );
};
export default QuestionForm;
