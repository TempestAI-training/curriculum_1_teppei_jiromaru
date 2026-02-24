import { useState } from "react";

type ChatPageProps = {
  setIsVisible: (value: boolean) => void;
  // content: string;
  // setContent: (value: string) => void;
};

interface Message {
  text: string;
  sender: "bot" | "user";
}

export const ChatPage = ({
  setIsVisible,
  // content,
  // setContent,
}: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input) {
      return;
    }
    const userMessage: Message = { text: input, sender: "user" };
    const botMessage: Message = {
      text: "高市さんは日本の総理大臣です。",
      sender: "bot",
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#edf4f5",
        }}
      >
        <div
          style={{
            backgroundColor: "#fdfdfd",
            padding: 20,
            marginTop: 20,
            width: 300,
            height: "380px",
            borderRadius: "10px",
          }}
        >
          <button
            onClick={() => setIsVisible(true)}
            style={{
              margin: "5px",
              height: "29px",
              backgroundColor: "#0939d6",
              color: "#ffffff",
              borderRadius: "20px",
              border: "none",
              padding: "4px 10px 4px 10px",
            }}
          >
            back
          </button>
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              backgroundColor: "#f9f9fc",
            }}
          >
            <div>
              {messages.map((el, index) => (
                <div
                  key={index}
                  style={{
                    margin: "3px 3px 3px 0px",
                    display: "flex",
                    justifyContent:
                      el.sender === "bot" ? "flex-star" : "flex-end",
                    textAlign: el.sender === "bot" ? "left" : "right",
                  }}
                >
                  <div
                    style={{
                      margin: "1% 0 1% 5px",
                      backgroundColor:
                        el.sender === "bot" ? "#91bdeb" : "#b2d6db",
                      padding: "3px 7px 3px 7px",
                      borderRadius: "3px",
                      maxWidth: "200px",
                    }}
                  >
                    {el.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              padding: "1px",
              borderRadius: "20px",
              backgroundColor: "#edf4f5",
            }}
          >
            <textarea
              // value={content}
              // onChange={(e) => setContent(e.target.value)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="input message..."
              style={{
                height: "25px",
                width: "220px",
                backgroundColor: "#edf4f5",
                border: "none",
                outline: "none",
                resize: "none",
              }}
            ></textarea>
            <button
              onClick={send}
              style={{
                height: "29px",
                backgroundColor: "#0939d6",
                color: "#ffffff",
                borderRadius: "20px",
                border: "none",
              }}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
