import React from 'react'
import styles from './AfterSubmission.module.css'
import { useNavigate } from 'react-router-dom'

const AfterSubmission = ({formCode , responseCode}) => {
    const navigate = useNavigate()
    const viewResponseHandler = () => {
        console.log("holaaaaa")
        console.log(responseCode)
        navigate(`/form/${formCode}/${responseCode}/review`)
    }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Response Page</h1>
      <button className={styles.btn} id="edit-btn">Edit Response</button>
      <button className={styles.btn} id="view-btn" onClick={viewResponseHandler}>View Response</button>
    </div>
  )
}

export default AfterSubmission