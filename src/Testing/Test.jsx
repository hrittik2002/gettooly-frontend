import React from "react";
import { htmlToText } from "html-to-text";
import SideNavbar2 from "../components/SideNavbar2/SideNavbar2";
import styles from "./Test.module.css";
const Test = () => {
  const html = `<strong>This text is important!</strong>`
  const text = htmlToText(html,  {
    wordwrap : 130
  });
  console.log(text)
  return (
    <>
      
    </>
  );
};

export default Test;
