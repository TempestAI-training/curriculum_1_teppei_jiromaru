import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // auto scrolll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input) {
      return;
    }
    // user
    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    // bot
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://finalbackendj-cpb9cgcrfvgmfjgj.japanwest-01.azurewebsites.net/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // FastAPI側の ChatRequest が期待している {"message": "..."} の形にする
          body: JSON.stringify({ message: currentInput }),
        },
      );
      // //backendからのレスポンス
      // const data = await response.json();
      // // main.pyではreturn {"reply": ai_message}としているので、data.replyでアクセスできる
      //
      // const botMessage: Message = {
      //   text: data.reply,
      //   sender: "bot",
      // };
      // setIsLoading(false);
      // setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      // AI用の空っぽのメッセージを1つ画面に追加する（ここに文字を足していきます）
      setMessages((prev) => [...prev, { text: "", sender: "bot" }]);

      // 3. データを受け取る「パイプ（reader）」と「翻訳機（decoder）」を用意
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) throw new Error("ストリームが読み込めません");

      // 4. データが届き終わるまで、無限ループで受け取り続ける
      while (true) {
        // パイプから「次のデータの塊（chunk）」を受け取る
        const { done, value } = await reader.read();

        // AIがしゃべり終わったら（doneがtrueになったら）ループを抜ける
        if (done) break;

        // 届いた暗号みたいなバイナリデータを、読める日本語（文字列）に翻訳
        const chunkText = decoder.decode(value, { stream: true });

        // 5. 画面の「一番最後に追加したAIのメッセージ」に、今届いた文字を継ぎ足す！
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;

          // 最後のメッセージの text に、新しく届いた chunkText を合体させる
          newMessages[lastIndex] = {
            ...newMessages[lastIndex], // 一度スプレッド構文ですべて展開
            text: newMessages[lastIndex].text + chunkText, // textのところだけ上書き
          };

          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        text: "===a communication error has occured===",
        sender: "bot",
      };
      setIsLoading(false);
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  // try{
  //     const response = await fetch("http://localhost:8000/chat/history", {
  //       method: "GET",
  //     });
  //     //backendからのレスポンス
  //     const data = await response.json();
  //       data.history
  //   } catch (error) {
  //     console.error(error);
  //   }
  useEffect(() => {
    // useEffectの中では直接asyncを使えないので、中に関数を作って呼び出します
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://finalbackendj-cpb9cgcrfvgmfjgj.japanwest-01.azurewebsites.net/chat/history",
          {
            method: "GET",
          },
        );

        if (!response.ok) throw new Error("faild to get history");

        const data = await response.json();

        // 1. バックエンドのデータをフロントエンドの Message 型に変換する
        // ※システムプロンプト（role: "system"）は画面に表示したくないので filter で除外します
        const formattedHistory: Message[] = data.history
          .filter((msg: any) => msg.role !== "system") // systemを除外
          .map((msg: any) => ({
            text: msg.content,
            sender: msg.role === "user" ? "user" : "bot", // roleがuserならuser、それ以外(assistant)ならbot
          }));

        // 2. 変換したデータをReactのステートにセットして画面に表示！
        setMessages(formattedHistory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []); // 👈 この空の配列 [] が「最初の1回だけ実行する」という超重要な魔法です！

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
                    // textAlign: el.sender === "bot" ? "left" : "right",
                    textAlign: "left",
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
            {isLoading && <div>高市さんが回答中...</div>}
            <div ref={messagesEndRef} style={{ height: "0px" }}></div>
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
