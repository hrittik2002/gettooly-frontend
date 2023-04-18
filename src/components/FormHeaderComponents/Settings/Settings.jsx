import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import styles from "./Settings.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { getFormData, updateSettingsApiCall } from "../../../config/ApiCalls/formApiCalls";
import { useDispatch } from "react-redux";
import {
  set_allow_view_score,
  set_authenticated_responder,
  set_collect_email,
  set_confirmation_message,
  set_edit_after_submit,
  set_is_quiz,
} from "../../../redux/settingsSlice";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import { Textarea } from '@chakra-ui/react'

const reducer = (state, action) => {
  switch (action.type) {
    case "set_collect_email": {
      return {
        ...state,
        collect_email: action.value,
      };
    }
    case "set_authenticated_responder": {
      return {
        ...state,
        authenticated_responder: action.value,
      };
    }
    case "set_edit_after_submit": {
      return {
        ...state,
        edit_after_submit: action.value,
      };
    }
    case "set_confirmation_message": {
      return {
        ...state,
        confirmation_message: action.value,
      };
    }
    case "set_is_quiz": {
      return {
        ...state,
        is_quiz: action.value,
      };
    }
    case "set_allow_view_score": {
      return {
        ...state,
        allow_view_score: action.value,
      };
    }
    default:
      return state;
  }
};

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formCode = useSelector((state) => state.questions.formCode);
  const dispatchRedux = useDispatch();

  const getFormData2 = async () => {
    const res2 = await getFormData(formCode);
    console.log(res2);
    // refresh the settings
    dispatchRedux(set_collect_email(res2.data.collect_email));
    dispatchRedux(
      set_authenticated_responder(res2.data.authenticated_responder)
    );
    dispatchRedux(set_edit_after_submit(res2.data.edit_after_submit));
    dispatchRedux(set_confirmation_message(res2.data.confirmation_message));
    dispatchRedux(set_is_quiz(res2.data.is_quiz));
    dispatchRedux(set_allow_view_score(res2.data.allow_view_score));
  };

  const [state, dispatch] = useReducer(reducer, {
    collect_email: useSelector((state) => state.settings.collect_email),
    authenticated_responder: useSelector(
      (state) => state.settings.authenticated_responder
    ),
    edit_after_submit: useSelector((state) => state.settings.edit_after_submit),
    confirmation_message: useSelector(
      (state) => state.settings.confirmation_message
    ),
    is_quiz: useSelector((state) => state.settings.is_quiz),
    allow_view_score: useSelector((state) => state.settings.allow_view_score),
  });

  const saveHandler = () => {
    console.log(state)
    const res = updateSettingsApiCall(formCode , state);
    onClose();
    getFormData2();
  }

  return (
    <>
      <IconButton>
        <SettingsIcon className={styles.formHeaderIcon} onClick={onOpen} />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={1.5}>
              <Checkbox
                colorScheme="green"
                defaultChecked={state.collect_email ? true : false}
                onChange={(e)=>{dispatch({ type : "set_collect_email" , value: !state.collect_email})}}
              >
                Do you want to Collect Email?
              </Checkbox>
              <Checkbox
                colorScheme="green"
                defaultChecked={state.authenticated_responder ? true : false}
                onChange={(e)=>{dispatch({ type : "set_authenticated_responder" , value: !state.authenticated_responder})}}
              >
                Authenticated Responder ?
              </Checkbox>
              <Checkbox
                colorScheme="green"
                defaultChecked={state.edit_after_submit ? true : false}
                onChange={()=>{dispatch({ type : "set_edit_after_submit" , value: !state.edit_after_submit})}}
              >
                Edit after Submit?
              </Checkbox>
              <Checkbox
                colorScheme="green"
                defaultChecked={state.is_quiz ? true : false}
                onChange={()=>{dispatch({ type : "set_is_quiz" , value: !state.is_quiz})}}
              >
                Is Quiz?
              </Checkbox>
              <Checkbox
                colorScheme="green"
                defaultChecked={state.allow_view_score ? true : false}
                onChange={()=>{dispatch({ type : "set_allow_view_score" , value: !state.allow_view_score})}}
              >
                Allow View Score ?
              </Checkbox>
              <Box>
              Confirmation Message
              <Textarea placeholder={`${state.confirmation_message}`} 
              onChange={(e)=>{dispatch({ type : "set_confirmation_message" , value: e.target.value})}}
              />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={saveHandler} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
