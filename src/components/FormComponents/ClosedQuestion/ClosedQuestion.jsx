import { FormControlLabel, Typography } from "@mui/material";
import React from "react";
import styles from "./ClosedQuestion.module.css";
import { Text } from "@chakra-ui/react";
const ClosedQuestion = ({ ques, i, questions }) => {
  return (
    <div className={styles.savedQuestions}>
      <Typography variant="body1" className={styles.question}>
        {`${i + 1} . `}
        <div dangerouslySetInnerHTML={{ __html: questions[i].questionText }} />
      </Typography>

      {ques.options.map((op, j) => (
        <div key={j}>
          <div className={styles.optionContainer}>
            <input
              type={ques.questionType}
              backgroundColor="#fff"
              required={ques.type}
            />
            <Text className={styles.optionText} style={{ overflowWrap: 'break-word', maxWidth: '400px' }}>
              {ques.options[j].optionText}
            </Text>
            {/* <FormControlLabel
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
          ></FormControlLabel> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClosedQuestion;
