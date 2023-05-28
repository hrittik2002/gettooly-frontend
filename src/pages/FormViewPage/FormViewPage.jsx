import React, { useCallback, useMemo, useState } from "react";
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
import { Button, EditableTextarea, Textarea, useToast } from "@chakra-ui/react";
import {
  getIPAddress,
  sendDetails,
  submitForm,
  viewResponseAPICall,
} from "../../config/ApiCalls/formSubmitApiCalls";
//import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AfterSubmission from "../../components/AfterSubmission/AfterSubmission";

const FormViewPage = () => {
  const params = useParams();
  const toast = useToast();
  const location = useLocation();
  console.log(location)
  const [resultList, setResultList] = useState([]);
  const navigate = useNavigate();
  const [resulst, setResults] = useState([...resultList]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responseCode , setResponseCode] = useState('');
  const [formSubmited , setFormSubmited] = useState(false);
  const [formId, setFormId] = useState();
  const userData = useSelector((state) => state.user.currentUser);
  const formCode = params.formCode
  const dispatch = useDispatch();
  //const params = useParams();
  const checkUser = () =>{
    //console.log(params)
    console.log(userData)
    if(!userData){
      // navigate to login page
      console.log("bbbbbbbbbbbbbbbbbbbbb")
      navigate("/" , { state : {
        from : "formViewPage", 
        formCode : params.formCode
       }})
    }
    else{
      if(!userData.type || userData.type === 1){
        console.log("ccccccccccccccccccccccccc")
        // navigate to login page
        navigate("/" , { state : {
           from : "formViewPage", 
           formCode : params.formCode 
          }})
      }
      
    }
  }
  useMemo(()=>{
    

      checkUser()

    
    
  },[userData])
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

  const updateResult = (questionId, optionText, questionType, optionId) => {
    let found = false;
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i].questionId === questionId) {
        found = true;
        if (questionType === "checkbox") {
          let answerIndex = -1;
          for (let j = 0; j < resultList[i].answer.length; j++) {
            if (resultList[i].answer[j].optionId === optionId) {
              answerIndex = j;
              break;
            }
          }
          if (answerIndex > -1) {
            resultList[i].answer.splice(answerIndex, 1);
          } else {
            resultList[i].answer.push({ optionId, optionText });
          }
        } else if (questionType === "radio") {
          resultList[i].answer = { optionId, optionText };
        }
        break;
      }
    }
    if (!found) {
      if (questionType === "checkbox") {
        resultList.push({
          questionId,
          questionType,
          answer: [{ optionId, optionText }],
        });
      } else if (questionType === "radio") {
        resultList.push({
          questionId,
          questionType,
          answer: { optionId, optionText },
        });
      }
    }
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    let resultArray = [];
    for (let i = 0; i < resultList.length; i++) {
      if(resultList[i].questionType === 'checkbox'){
        let ansArr = []
        for(let j = 0; j < resultList[i].answer.length; j++) {
          ansArr.push(resultList[i].answer[j].optionText);
        }
        resultArray.push({
          question: resultList[i].questionId,
          answer: ansArr
        });
      }
      else{
        resultArray.push({
          question: resultList[i].questionId,
          answer: resultList[i].answer.optionText
        });
      }
    }
    const IP = await getIPAddress();
    const res_email = location.state.email;
    console.log(IP, formId, resultArray , resultList , res_email);
    const res = await submitForm(IP, resultArray, formId , res_email);
    console.log(res);
    if(res && res.status && res.status === 200){
      setFormSubmited(true);
      setResponseCode(res.data.data.response_code);
      console.log(res.data)
      toast({
        title: 'Successfully Submited',
        description: "Your Response has been successfully submitted",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      const details = await viewResponseAPICall(formCode, res.data.data.response_code);
      console.log(details)
      let percentage = (details.data.score / details.data.total_score) * 100;
      const sendUserDetails = await sendDetails(
        details.data.response.id,
        details.data.response.response_code,
        details.data.response.responder_email,
        userData.first_name,
        details.data.score,
        details.data.total_score,
        percentage,
        false,
        details.data.response.response_to,
        details.data.response.responder
        )
        console.log(sendUserDetails)
    }
  };
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
  
  const defaultValueHandler = (questionId, optionId) => {
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
  return (
    <>
    {
      formSubmited === true ?

      <AfterSubmission formCode={formCode} responseCode={responseCode}/>

      :
    
    <div className={styles.parentContainer}>
      <div className={styles.Navbar}>
        <div className={styles.logoContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRScMKIKJdXoPYQqNQdH0B_-lnCRv5dplBOKw&usqp=CAU"
            alt=""
          />
        </div>
        <div className={styles.TimerContainer}>
          {/* <Countdown date={Date.now() + 10000} /> */}
          <Countdown date={Date.now() + 10000} />
        </div>
        <div className={styles.SubmitBtnContainer}>
          <Button
          onClick={(e) => {
            submitFormHandler(e);
          }}
          >Submit</Button>
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
                      onChange={(e) => {
                        updateResult(
                          questions[currentQuestion].id,
                          e.target.value,
                          questions[currentQuestion].questionType,
                          option.id
                        );
                      }}
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
                      onChange={() => {
                        updateResult(
                          questions[currentQuestion].id,
                          option.optionText,
                          questions[currentQuestion].questionType,
                          option.id
                        );
                      }}
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
    }
    
    </>
  );
};

export default FormViewPage;

