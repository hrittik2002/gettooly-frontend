import { FormControlLabel, Typography } from "@mui/material";
import React from "react";
import styles from "./ClosedQuestion.module.css";
import { Text, Textarea } from "@chakra-ui/react";
const ClosedQuestion = ({ ques, i, questions }) => {
  console.log(ques.questionType)
  return (
    <div className={styles.savedQuestions}>
      <Typography variant="body1" className={styles.question}>
        {`${i + 1} . `}
        <div dangerouslySetInnerHTML={{ __html: questions[i].questionText }} />
      </Typography>
      {
        ques.questionType === "text" ? 
        (
          <>
          <Textarea style={{width:"100%" , height:"100%" , border:"gray"}} placeholder='Here is a sample placeholder' />
          </>
        )
        :
        (
          <>
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
          </div>
        </div>
      ))}
          </>
        )
      }
      
      
    </div>
  );
};

export default ClosedQuestion;
