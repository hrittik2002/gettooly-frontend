import React from "react";
import styles from "./FormHeader.module.css";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FolderIcon from "@mui/icons-material/Folder";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getFormData,
  updateBgColorApiCall,
} from "../../config/ApiCalls/formApiCalls";
import { useSelector } from "react-redux";
import {
  setBackgroundColor,
  setFormTitle,
  setQuestions,
} from "../../redux/questionsSlice";
import ColorPicker from "../FormHeaderComponents/ColorPicker/ColorPicker";
import Settings from "../FormHeaderComponents/Settings/Settings";
import SendForm from "../FormComponents/SendForm/SendForm";

const FormHeader = () => {
  const [color, setColor] = useState("#fff");
  const formCode = useSelector((state) => state.questions.formCode);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const getFormData2 = async () => {
    const res2 = await getFormData(formCode);
    console.log(res2);
    dispatch(setBackgroundColor(res2.data.background_color));
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const saveColor = () => {
    console.log(color);
    const res = updateBgColorApiCall(formCode, color);
    onClose();
    getFormData2();
  };

  return (
    <div className={styles.formHeader}>
      <div className={styles.formHeaderLeft}>
        <img
          src="https://e7.pngegg.com/pngimages/709/627/png-clipart-google-docs-form-google-purple-violet.png"
          height="50px"
          width="50px"
        />
        <input
          type="text"
          placeholder="Untitled form"
          className={styles.formName}
        />
      </div>
      <div className={styles.formHeaderRight}>
        <ColorPicker />

        <Settings />

        <SendForm />
      </div>
    </div>
  );
};

export default FormHeader;
