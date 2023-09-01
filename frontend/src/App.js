import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import VideoChat from "./Components/VideoChat";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chat" component={ChatPage} />
      <Route path="/videochat" component={VideoChat} />
    </div>
  );
}

export default App;
