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
    const userMessage: Message = { text: input, sender: "user" };
    const botMessage: Message = { text: "hoge", sender: "bot" };
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
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: 20,
            border: "1px solid #61dafb",
            marginTop: 20,
            width: 300,
          }}
        >
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              border: "1px solid #aaaaaa",
            }}
          >
            <div>
              {messages.map((el, index) => (
                <div key={index}>{el.text}</div>
              ))}
            </div>
          </div>

          <label>
            chat
            <textarea
              // value={content}
              // onChange={(e) => setContent(e.target.value)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="input message..."
            ></textarea>
          </label>
          <button onClick={send}>send</button>
          <button onClick={() => setIsVisible(true)}>back</button>
        </div>
      </div>
    </>
  );
};
