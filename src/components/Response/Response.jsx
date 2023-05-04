import React, { useState } from "react";
import { useEffect } from "react";
import { getResponse } from "../../config/ApiCalls/userApiCalls";
import styles from "./Response.module.css";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";

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
      });
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      for (let key in arr[i].answer) {
        console.log(key);
      }
    }
    setResponse(arr);
  };
  useEffect(() => {
    console.log("hola");
    getAllResponseData();
  }, []);
  const options = {
    title: "Response",
    is3D: true,
  };

  return (
    <div className={styles.parentContainer}>
      {response.map((res, i) => (
        <div className={styles.qsContainer} key={i}>
          <div className={styles.qs}>{res.question}</div>
          
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
  );
};

export default Response;
