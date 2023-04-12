import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {  setFormTitle, setQuestions } from '../redux/questionsSlice';
// state . <reodx slice name> . < object name>
const Test = () => {
  const question = useSelector((state)=>state.questions.questions)
  const dispatch = useDispatch();
  const title = useSelector((state)=>state.questions.formTitle)
  const formCode = useSelector((state)=>state);
  console.log(formCode);
  console.log(question[0].questionText);
  const handleClick = () =>{
    // console.log("hii")
    // let q = [...question];
    // let p = q;
    // console.log(p[0].questionText);
    // p[0].questionText = "idk";
    // console.log(p , title)
    // dispatch(setQuestions(p))
    let text = "idk";
    let i = 0;
    //dispatch(changeQuestions({text , i}))
  }
  // const changeQuestion = (text, i) => {
  //   let newQuestion = [...questions];
  //   newQuestion[i].questionText = text;
  //   dispatch(setQuestions(newQuestion))
  //   console.log(newQuestion);
  // };
 
  return (
    <>
    <h1>{question[0].questionText}</h1>
    <button onClick={handleClick}>click</button>
    </>
  )
}

export default Test