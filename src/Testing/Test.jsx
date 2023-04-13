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
    let text = "idk";
    let i = 0;
    //dispatch(changeQuestions({text , i}))
  }
 
  return (
    <>
    <h1>{question[0].questionText}</h1>
    <button onClick={handleClick}>click</button>
    </>
  )
}

export default Test