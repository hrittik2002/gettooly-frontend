import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import styles from "./ColorPicker.module.css";
import { Button, useDisclosure } from "@chakra-ui/react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getFormData,
  updateBgColorApiCall,
} from "../../../config/ApiCalls/formApiCalls";
import { setBackgroundColor } from "../../../redux/questionsSlice";
import { SketchPicker } from "react-color";
const ColorPicker = () => {
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
  }; // #8700f5
  return (
    <>
        <ColorLensIcon
         color="#fff"
         fontSize="large"
          onClick={onOpen}
          className={styles.formHeaderIcon}
        />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Color Picker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack >
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                saveColor();
              }}
              colorScheme="green"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ColorPicker;
