import { Button } from "@chakra-ui/react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import VideoChat from "./Components/VideoChat";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import { ChakraProvider } from "@chakra-ui/react";
import ResetPassword from "./Components/Authentication/ResetPassword";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={HomePage} exact />
        <Route path="/chat" component={ChatPage} />
        <Route path="/videochat" component={VideoChat} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route
          path="/resetForgotPassword/:userId/:token"
          component={ResetPassword}
        />
        <ChakraProvider>
          <Route path="/login" component={Login} />
        </ChakraProvider>
      </Router>
    </div>
  );
}

export default App;
