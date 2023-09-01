import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import AudioRecorder from "../Components/miscellaneous/AudioRecorder";
import { makeStyles } from "@material-ui/core/styles";
import VideoChat from "../Components/VideoChat";

const useStyles = makeStyles((theme) => ({}));

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chat");
    }
  }, [history]);
  return (
    <Container maxWidth="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        textAlign={"center"}
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width={"50%"}>Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <AudioRecorder />
      </Box>
    </Container>
  );
};

export default HomePage;
