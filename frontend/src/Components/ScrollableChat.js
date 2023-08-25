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

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
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
  // var crnt = new Date();
  // var crntDate = crnt.getDate();
  // var crntMonth = crnt.getMonth() + 1;
  // var crntYear = crnt.getFullYear();
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
            <p className="printDate">{printDate(messages, m, i)}</p>
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
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
                {m.content}
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
