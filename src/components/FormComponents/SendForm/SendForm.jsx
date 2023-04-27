import { Button, useDisclosure } from '@chakra-ui/react'
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

const SendForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [link , setLink] = useState(``);
    const formCode = useSelector((state) => state.questions.formCode);
    useEffect(()=>{
        setLink(`http://localhost:3000/form/${formCode}/view`)
    },[formCode])
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
            link : {link}
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default SendForm