import { Message } from "@chatscope/chat-ui-kit-react";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicIcon from "@mui/icons-material/Mic";
import classNames from "classnames/bind";
import React, { useState } from "react";
import images from "../../assets/images/index";
import styles from "./ChatBot.module.scss";

const API_KEY = process.env.REACT_APP_CHAT_GPT_API_KEY;
console.log("Chat bot", API_KEY);
const systemMessage = {
  role: "system",
  content: "Chào mừng bạn đến với CadioCare",
};
const cx = classNames.bind(styles);
const ChatBot = () => {
  const [openIntroVersion, setOpenIntroVersion] = useState(false);
  const [tam, setTam] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Chào mừng bạn đến với CadioCare!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async (message) => {
    if (message === "") {
      return;
    } else {
      const newMessage = {
        message,
        direction: "outgoing",
        sender: "user",
      };

      const newMessages = [...messages, newMessage];

      setMessages(newMessages);
      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
      setTam("");
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  const handleModelOpenIntroVersion = () => {
    setOpenIntroVersion(true);
  };
  const handleModelCloseIntroVersion = () => {
    setOpenIntroVersion(false);
  };

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true; // Sử dụng chế độ nhận dạng liên tục
  recognition.lang = "vi-VN"; // Thiết lập ngôn ngữ của giọng nói
  recognition.interimResults = true; // Cho phép kết quả tạm thời

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setTam(speechToText);
    setIsRecording(false);
    recognition.stop();
  };

  const startListening = () => {
    setIsRecording(true);
    recognition.start();
  };
  const closeListening = () => {
    setIsRecording(false);
    recognition.stop();
  };
  return (
    <div className={cx("ChatBot")}>
      <FontAwesomeIcon
        className={cx("icon-chat")}
        icon={faComments}
        onClick={
          openIntroVersion === false
            ? handleModelOpenIntroVersion
            : handleModelCloseIntroVersion
        }
      />
      {openIntroVersion === true ? (
        <div className={cx("chatbox")}>
          <div className={cx("chatbox")}>
            <div className={cx("chatbox__support")}>
              <div className={cx("chatbox__header")}>
                <div className={cx("chatbox__image--header")}>
                  <img src={images.logo} alt="" />
                </div>
                <div className={cx("chatbox__content--header")}>
                  <h4 className={cx("chatbox__heading--header")}>CadioCare</h4>
                  <p className={cx("chatbox__description--header")}>
                    Tận tâm chia sẻ – vì sức khỏe của bạn
                  </p>
                </div>
              </div>
              <div className={cx("chatbox__messages")}>
                <div>
                  {messages.map((message, i) => {
                    return (
                      <div key={i}>
                        {message.sender === "ChatGPT" ? (
                          <div className={cx("messages__item")}>
                            <div className={cx("messages__item--visitor")}>
                              <Message key={i} model={message} />
                            </div>
                          </div>
                        ) : (
                          <div className={cx("messages__item--operator")}>
                            <Message key={i} model={message} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {isTyping ? (
                    <div className={cx("messages__item")}>
                      <div className={cx("messages__item--typing")}>
                        <span className={cx("messages__dot")}>
                          Đang trả lời...
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={cx("chatbox__footer")}>
                {isRecording ? (
                  <MicIcon
                    sx={{
                      fontSize: 30,
                      cursor: "pointer",
                      color: "#FFFFFF",
                    }}
                    onClick={closeListening}
                    className={cx("chatbox__mic")}
                  />
                ) : (
                  <MicIcon
                    sx={{
                      fontSize: 30,
                      cursor: "pointer",
                      color: "#FFFFFF",
                    }}
                    onClick={startListening}
                  />
                )}
                <input
                  type="text"
                  placeholder="Nhập câu hỏi..."
                  value={tam}
                  onChange={(e) => setTam(e.target.value)}
                />
                <p
                  className={cx("chatbox__send--footer")}
                  onClick={() => handleSend(tam)}
                >
                  Gửi
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBot;
