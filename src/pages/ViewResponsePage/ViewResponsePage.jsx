import React, { useEffect, useMemo, useState } from "react";
import styles from "./ViewResponsePage.module.css";
import { Button, Textarea } from "@chakra-ui/react";
import { getFormData } from "../../config/ApiCalls/formApiCalls";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setBackgroundColor,
  setFormDescription,
  setFormTitle,
  setQuestions,
} from "../../redux/questionsSlice";
import { useSelector } from "react-redux";
import { viewResponseAPICall } from "../../config/ApiCalls/formSubmitApiCalls";
const ViewResponsePage = () => {
  const [formId, setFormId] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [resultList, setResultList] = useState([]);
  const { formCode, responseCode } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);

  // const initialiseList = async () => {
  //   const res = await viewResponseAPICall(formCode, responseCode);
  //   console.log(res);
  //   const resultArray = [...resultList];
  //   const responseArray = res.data.response.response;
  //   //console.log(responseArray)
  //   // iterate through all the responses
  //   for (let i = 0; i < responseArray.length; i++) {
  //     // iterate through all the questions
  //     for (let j = 0; j < questions.length; j++) {
  //       if (questions[j].id === responseArray[i].answer_to) {
  //         // iterate through all the options
  //         for (let k = 0; k < questions[j].options.length; k++) {
  //           if (
  //             questions[j].options[k].optionText === responseArray[i].answer
  //           ) {
  //             //resultArray
  //             if (questions[j].questionType === "checkbox") {
  //               let alreadyContains = false;
  //               for (let l = 0; l < resultArray.length; l++) {
  //                 if (
  //                   resultArray[l].questionId === responseArray[i].answer_to
  //                 ) {
  //                   alreadyContains = true;
  //                   resultArray[l].answer.push({
  //                     optionId: questions[j].options[k].id,
  //                     optionText: questions[j].options[k].optionText,
  //                   });
  //                 }
  //               }
  //               if (alreadyContains == false) {
  //                 resultArray.push({
  //                   questionId: questions[j].id,
  //                   questionType: questions[j].questionType,
  //                   answer: [
  //                     {
  //                       optionId: questions[j].options[k].id,
  //                       optionText: questions[j].options[k].optionText,
  //                     },
  //                   ],
  //                 });
  //               }
  //             } else {
  //               resultArray.push({
  //                 questionId: questions[j].id,
  //                 questionType: questions[j].questionType,
  //                 answer: {
  //                   optionId: questions[j].options[k].id,
  //                   optionText: questions[j].options[k].optionText,
  //                 },
  //               });
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   //console.log(resultArray)
  //   setResultList(resultArray);
  // };
  // useMemo(() => {
  //   initialiseList();
  // }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const initialiseList = async () => {
        const res = await viewResponseAPICall(formCode, responseCode);
        console.log(res);
        const resultArray = [];
        const responseArray = res.data.response.response;
        // iterate through all the responses
        for (let i = 0; i < responseArray.length; i++) {
          // iterate through all the questions
          for (let j = 0; j < questions.length; j++) {
            if (questions[j].id === responseArray[i].answer_to) {
              // iterate through all the options
              for (let k = 0; k < questions[j].options.length; k++) {
                if (
                  questions[j].options[k].optionText === responseArray[i].answer
                ) {
                  //resultArray
                  if (questions[j].questionType === "checkbox") {
                    let alreadyContains = false;
                    for (let l = 0; l < resultArray.length; l++) {
                      if (
                        resultArray[l].questionId === responseArray[i].answer_to
                      ) {
                        alreadyContains = true;
                        resultArray[l].answer.push({
                          optionId: questions[j].options[k].id,
                          optionText: questions[j].options[k].optionText,
                        });
                      }
                    }
                    if (alreadyContains == false) {
                      resultArray.push({
                        questionId: questions[j].id,
                        questionType: questions[j].questionType,
                        answer: [
                          {
                            optionId: questions[j].options[k].id,
                            optionText: questions[j].options[k].optionText,
                          },
                        ],
                      });
                    }
                  } else {
                    resultArray.push({
                      questionId: questions[j].id,
                      questionType: questions[j].questionType,
                      answer: {
                        optionId: questions[j].options[k].id,
                        optionText: questions[j].options[k].optionText,
                      },
                    });
                  }
                }
              }
            }
          }
        }
        setResultList(resultArray);
      };
      initialiseList();
    }, 0);
  }, []);

  const defaultValueHandler = (questionId, optionId) => {
   // console.log("aaaaaaaaaaaaaaaaaaa")
    //console.log(resultList)
    const question = questions.find((q) => q.id === questionId);
    if (question.questionType === "checkbox") {
      const questionObject = resultList.find(
        (q) => q.questionId === questionId
      );
      if (!questionObject) {
        return false;
      }
      const answerObject = questionObject.answer.find(
        (a) => a.optionId === optionId
      );
      return answerObject ? true : false;
    } else {
      const questionObject = resultList.find(
        (q) => q.questionId === questionId
      );
      if (!questionObject) {
        return false;
      }
      return questionObject.answer.optionId === optionId;
    }
  };

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
  const showIthQuestion = (i) => {
    setCurrentQuestion(i);
    console.log(i);
  };
  const perviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.Navbar}>
        <div className={styles.logoContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRScMKIKJdXoPYQqNQdH0B_-lnCRv5dplBOKw&usqp=CAU"
            alt=""
          />
        </div>
        {/* <div className={styles.TimerContainer}>
          <Countdown date={Date.now() + 10000} />
        </div> */}
        <div className={styles.SubmitBtnContainer}>
          <Button>Back</Button>
        </div>
      </div>
      <div className={styles.midContainer}>
        <div className={styles.sideNav}>
          {questions.map((question, i) => (
            <div
              key={i}
              className={styles.sideNavItems}
              onClick={() => {
                showIthQuestion(i);
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <main className={styles.contentContainer}>
          <div className={styles.questionTop}>
            <div className={styles.questionNo}>
              {`Question ${currentQuestion + 1}`}
            </div>
            <div className={styles.marks}>Marks : 5</div>
          </div>

          <div className={styles.questionMid}>
            <div className={styles.questionText}>
              <span
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestion].questionText,
                }}
              />
            </div>
            <div className={styles.optionContainer}>
              {questions[currentQuestion].options.map((option, i) =>
                questions[currentQuestion].questionType === "text" ? (
                  <>
                    <Textarea
                      style={{ width: "100%", height: "100%", border: "gray" }}
                      placeholder="Write Your Answer Here"
                      // defaultValue={}
                      // onChange={(e) => {
                      //   updateResult(
                      //     questions[currentQuestion].id,
                      //     e.target.value,
                      //     questions[currentQuestion].questionType,
                      //     option.id
                      //   );
                      // }}
                    />
                  </>
                ) : (
                  <div key={i} className={styles.optionItem}>
                    <input
                      type={questions[currentQuestion].questionType}
                      backgroundColor="#fff"
                      required={questions[currentQuestion].type}
                      defaultChecked={defaultValueHandler(
                        questions[currentQuestion].id,
                        option.id
                      )}
                      disabled

                      // onChange={() => {
                      //   updateResult(
                      //     questions[currentQuestion].id,
                      //     option.optionText,
                      //     questions[currentQuestion].questionType,
                      //     option.id
                      //   );
                      // }}
                      key={option.id} // make sure each option has a unique key
                    />

                    <div className={styles.optionText}>{option.optionText}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.questionBottom}>
            <div
              className={styles.questionBottomBtn}
              onClick={() => {
                perviousQuestion();
              }}
            >
              {currentQuestion === 0 ? "" : `< Previous Question`}
            </div>
            <div
              className={styles.questionBottomBtn}
              onClick={() => {
                nextQuestion();
              }}
            >
              {" "}
              {currentQuestion === questions.length - 1
                ? ""
                : `Next Question >`}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewResponsePage;
