import React, { useState } from "react";
import styles from "./FormViewPage.module.css";
import { getFormData } from "../../config/ApiCalls/formApiCalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setBackgroundColor,
  setFormDescription,
  setFormTitle,
  setQuestions,
} from "../../redux/questionsSlice";
import { useEffect } from "react";
import { Textarea } from "@chakra-ui/react";
import { getIPAddress, submitForm } from "../../config/ApiCalls/formSubmitApiCalls";

const FormViewPage = () => {
  const [resultList, setResultList] = useState([]);
  const [formId , setFormId] = useState();
  const formCode = useSelector((state) => state.questions.formCode);
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
    setFormId(res2.data.id);
  };

  useEffect(() => {
    getFormData2();
  }, []);

  const questions = useSelector((state) => state.questions.questions);
  const formTitle = useSelector((state) => state.questions.formTitle);
  const bgColor = useSelector((state) => state.questions.bgColor);
  console.log(questions);

  const updateResult = (questionId, correctResult , questionType) => {
    console.log(questionId , correctResult , questionType)
    let resultArray = resultList;
    let foundQuestionId = false;
    for(let i = 0; i < resultArray.length; i++) {
      if(resultArray[i].questionId === questionId){
        // if checkbox
        if(resultArray[i].questionType === "checkbox"){
          foundQuestionId = true;
          resultArray[i].answer.push(correctResult);
        }
        else {
          foundQuestionId = true;
          resultArray[i].answer = correctResult;
        }
        
      }
    }

    if (foundQuestionId !== true) {
      if(questionType === "checkbox"){
        const resArr = [correctResult];
        resultArray.push({ questionId: questionId, answer: resArr , questionType : questionType });
      }
      else {
        resultArray.push({ questionId: questionId, answer: correctResult , questionType : questionType });
      }
      
    }
    setResultList(resultArray);
    console.log(resultArray);
  };
  const submitFormHandler = async (e) =>{
    e.preventDefault()
    let resultArray = [];
    for(let i = 0; i < resultList.length; i++){
      resultArray.push({question : resultList[i].questionId , answer : resultList[i].answer})
    }
    const IP = await getIPAddress();
    console.log(IP , formId , resultArray);
    const res = await submitForm(IP , resultArray , formId);
    console.log(res)
  }
  return (
    <>
      <header>
        <h1>Online Exam Panel</h1>
      </header>
      <main>
        <div className={styles.container}>
          <h2>Page 1 of 5 (20 questions)</h2>
          <form>
            {questions.map((question, i) => (
              <div className={styles.question}>
                <p>
                  Question {i + 1}:{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: question.questionText }}
                  />{" "}
                </p>
                {question.questionType === "text" ? (
                  <>
                    <Textarea
                      style={{ width: "100%", height: "100%", border: "gray" }}
                      placeholder="Here is a sample placeholder"
                      onChange={(e)=>{
                        updateResult(question.id , e.target.value , question.questionType)
                      }}
                    />
                  </>
                ) : (
                  <>
                    {question.options.map((option, j) => (
                      <>
                        <label>
                          <input
                            type={question.questionType}
                            name={question.questionType}
                            onChange={()=>{updateResult(question.id , option.optionText , question.questionType)}}
                          />
                          {option.optionText}
                        </label>
                      </>
                    ))}
                  </>
                )}
               
              </div>
            ))}

            <button onClick={(e)=>{submitFormHandler(e)}} type="submit">Submit</button>
          </form>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 Online Exam Panel</p>
      </footer>
    </>
  );
};

export default FormViewPage;
