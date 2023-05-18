import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { ContentCopy } from '@mui/icons-material';
import styles from './SendForm.module.css'

const SendForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [link , setLink] = useState(``);
    const formCode = useSelector((state) => state.questions.formCode);
    const toast = useToast();
    useEffect(()=>{
        setLink(`http://localhost:3000/form/${formCode}/view`)
    },[formCode])
    const showToast = (title, status) => {
      toast({
        title: title,
        status: status,
        isClosable: true,
      });
    };

    const copyTextToClipboard = async(text) =>{
      if('clipboard' in navigator){
        return await navigator.clipboard.writeText(text);
      }
      else{
        return document.execCommand('copy', true, text);
      }
    }
    const handleCopyClick = async() =>{
      try{
        await copyTextToClipboard(link)
        showToast("copied!" , "info")
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <div>
        <Button colorScheme="blue" href="#contained-button" onClick={onOpen}>
          Send
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.inputContainer}>
            <input type="text" id="fileURL" readOnly value={link} />
            <ContentCopy onClick={handleCopyClick} fontSize="30px" className={styles.icon} />
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default SendForm