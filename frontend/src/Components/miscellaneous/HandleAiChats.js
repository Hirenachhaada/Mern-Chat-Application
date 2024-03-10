import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Textarea,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const HandleAiChats = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [animatedReply, setAnimatedReply] = useState("");
  const toast = useToast();

  const textAreaRef = useRef(null);
  useEffect(() => {
    setAnimatedReply("");
  }, [reply]);
  useEffect(() => {
    // Scroll down the Textarea when animatedReply changes
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [animatedReply]);
  const displayAnimatedReply = () => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < reply.length) {
        setAnimatedReply((prev) => prev + reply[index]);
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 20);
  };
  const handleModalClose = () => {
    setMessage(""); // Clear the message state
    setReply(""); // Clear the reply state
    onClose(); // Close the modal
  };
  const GeneratingResponse = () => {
    if (message === "") {
      toast({
        title: "Please Enter a Message",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    axios
      .post("/api/message/chatbot", { message })
      .then((res) => {
        setReply(res.data.reply);
        toast({
          title: "Response Generated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        displayAnimatedReply();
      })
      .catch((err) => {
        toast({
          title: "Error Generating Response",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <div>
      <Tooltip
        label="Chat with Ai"
        fontSize="md"
        hasArrow
        placement="bottom-end"
      >
        <IconButton icon={<StarIcon />} onClick={onOpen}></IconButton>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chats Through Ai</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl style={{ marginBottom: "5px" }} id="pic">
              <Textarea
                type="text"
                p={1}
                placeholder="Enter Your Message"
                onChange={(ev) => {
                  setMessage(ev.target.value);
                }}
              />
              <Heading as="h5" size="sm">
                Response
              </Heading>
              <Textarea
                type="text"
                p={1}
                my={2}
                placeholder="Response"
                value={animatedReply}
                onChange={(ev) => {
                  setAnimatedReply(ev.target.value);
                }}
                height={200}
                ref={textAreaRef}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                GeneratingResponse();
              }}
            >
              Ask Ai
            </Button>

            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                navigator.clipboard.writeText(animatedReply);
                toast({
                  title: "Copied to Clipboard",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                });
              }}
            >
              Copy to MessageBar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HandleAiChats;
