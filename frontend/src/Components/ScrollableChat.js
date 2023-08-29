import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { format } from "date-fns";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./miscellaneous/ProfileModal";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { set } from "mongoose";
import { CalendarIcon } from "@chakra-ui/icons";

const ScrollableChat = ({ messages, disappearingChat }) => {
  const { user } = ChatState();
  const [identifyType, setIdentifyType] = useState(0);
  var type = 0;
  const getHours = (dateObj) => {
    const date = new Date(dateObj);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours < 10) {
      return `0${hours}:`;
    } else {
      return `${hours}:`;
    }
    if (minutes < 10) {
      return `0${minutes} `;
    } else {
      return `${minutes} `;
    }
  };

  const getFileType = (extension) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const videoExtensions = ["mp4", "avi", "mov", "mkv"];
    const audioExtensions = ["mp3", "wav", "ogg"];
    const documentExtensions = ["doc", "docx", "pdf", "txt"];

    if (imageExtensions.includes(extension)) {
      return "Image";
    } else if (videoExtensions.includes(extension)) {
      return "Video";
    } else if (audioExtensions.includes(extension)) {
      return "Audio";
    } else if (documentExtensions.includes(extension)) {
      return "Document";
    } else {
      return "Unknown";
    }
  };
  const Check = (url) => {
    console.log(url);
    const urlObject = new URL(url);
    const extension = urlObject.pathname.split(".").pop();
    console.log("File extension:", extension);
    // const fileType = getFileType(extension);

    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const videoExtensions = ["mp4", "avi", "mov", "mkv"];
    const audioExtensions = ["mp3", "wav", "ogg", "m4a"];
    const documentExtensions = ["doc", "docx", "pdf", "txt"];

    if (imageExtensions.includes(extension)) {
      // setIdentifyType("Image");
      type = 1;
      return;
    } else if (videoExtensions.includes(extension)) {
      type = 2;
      // setIdentifyType("Video");
      return;
    } else if (audioExtensions.includes(extension)) {
      type = 3;
      // setIdentifyType("Audio");
      return;
    } else if (documentExtensions.includes(extension)) {
      type = 4;
      // setIdentifyType("Document");
      return;
    } else {
      type = 5;
      // setIdentifyType("Unknown");
      return;
    }
  };
  const getMins = (dateObj) => {
    const date = new Date(dateObj);
    const minutes = date.getMinutes();
    if (minutes < 10) {
      return `0${minutes} `;
    } else {
      return `${minutes} `;
    }
  };
  const printDate = (messages, m, i) => {
    const date1 = new Date(m?.createdAt);
    const date2 = new Date(messages[i - 1]?.createdAt);
    const monthName = format(date1, "MMMM");
    if (
      i == 0 ||
      date2.getDate() != date1.getDate() ||
      date2.getMonth() != date1.getMonth() ||
      date2.getFullYear() != date1.getFullYear()
    ) {
      return (
        <span className="dateStamp">
          {monthName} {date1.getDate()}, {date1.getFullYear()}
        </span>
      );
    }
  };
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div>
            {/* {(type = 0)} */}
            <p className="printDate">{printDate(messages, m, i)}</p>
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <ProfileModal user={m.sender}>
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </ProfileModal>
                </Tooltip>
              )}
              <p
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.image && Check(m.image)}
                {console.log(type)}
                {m.content}
                {m.image && type == 1 ? (
                  <Box boxSize="sm">
                    <Image src={m.image} alt="Some image" />
                  </Box>
                ) : (
                  <> </>
                )}
                {m.image && type == 2 ? (
                  <Box boxSize="sm">
                    <video controls>
                      <source src={m.image} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  </Box>
                ) : (
                  <> </>
                )}
                {m.image && type == 3 ? (
                  <Box width="100px">
                    <audio controls>
                      <source src={m.image} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                ) : (
                  <> </>
                )}
                {m.image && type == 4 ? (
                  <Box Boxsize="sm">
                    <CalendarIcon fontSize={"22px"} />
                    <a href={m.image} target="_blank" rel="noopener noreferrer">
                      Download Document
                    </a>
                  </Box>
                ) : (
                  <> </>
                )}
                {m.image && type == 5 ? (
                  <Box width="100px">Not supportable File</Box>
                ) : (
                  <> </>
                )}
                <span className="timeStamp">
                  {getHours(m.createdAt) + getMins(m.createdAt)}
                </span>
              </p>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
