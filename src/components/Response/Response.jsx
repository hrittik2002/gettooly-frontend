import React, { useState } from "react";
import { useEffect } from "react";
import { getResponse } from "../../config/ApiCalls/userApiCalls";
import styles from "./Response.module.css";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

const Response = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  // const
  const [response, setResponse] = useState([]);
  const { formCode } = useParams();
  const userData = useSelector((state) => state.user.currentUser);
  const formId = useSelector((state) => state.questions.formId);
  const getAllResponseData = async () => {
    const res = await getResponse(formCode);
    console.log(res);
    console.log(res.data.data.data);
    const arr = [];
    for (let i = 0; i < res.data.data.data.length; i++) {
      let dataArr = [["Option", "Response"]];
      for (let key in res.data.data.data[i].answer) {
        //console.log(key.valueOf)
        dataArr.push([key, res.data.data.data[i].answer[key]]);
      }
      console.log(dataArr);
      arr.push({
        question: res.data.data.data[i].question,
        answer: dataArr,
        options: res.data.data.data[i].keys,
      });
    }
    //console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      for (let key in arr[i].answer) {
        //console.log(key);
      }
    }
    setResponse(arr);
    console.log(userData , formId)
    
  };
  useEffect(() => {
    //console.log("hola");
    getAllResponseData();
  }, []);
  const getResults = async() => {
    const results = await getAllResponseData(userData.id, formId) 
    console.log(results)
  }
  useEffect(() => {
    //console.log("hola");
    getResults();
  }, []);
  const options = {
    title: "Response",
    is3D: true,
  };

  return (
    <div className={styles.parentContainer}>
      {response.map((res, i) => (
        <div className={styles.qsContainer} key={i}>

          <div className={styles.innerQsContainer}>
            <div
              dangerouslySetInnerHTML={{ __html: res.question }}
              className={styles.qs}
            />
            <div className={styles.optionContainer}>
              <ul className={styles.innerOptionContainer}>
                {res.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.innerResponaeContainer}>
          <Chart
            chartType="PieChart"
            data={res.answer}
            options={options}
            width={"100%"}
            height={"100%"}
            //className={styles.chart}
          />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Response;

/*
<div className={styles.parentContainer}>
      {response.map((res, i) => (
        <div className={styles.qsContainer} key={i}>
          <div dangerouslySetInnerHTML={{ __html: res.question }} className={styles.qs}/>
          
            <Chart
              chartType="PieChart"
              data={res.answer}
              options={options}
              width={"100%"}
              height={"100%"}
              //className={styles.chart}
            />
       
        </div>
      ))}
    </div>

*/
