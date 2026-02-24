import { useState } from "react";
import "./App.css";
import { StartPage } from "./StartPage";
import { ChatPage } from "./ChatPage";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  // const [content, setContent] = useState("");
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      {/* <button onClick={() => setIsVisible(!isVisible)}> */}
      {/*   {isVisible ? "start" : "back"} */}
      {/* </button> */}
      {/* {isVisible && <StartPage setIsVisible={setIsVisible} />} */}
      {/* {!isVisible && <ChatPage setIsVisible={setIsVisible} />} */}
      {isVisible ? (
        <StartPage setIsVisible={setIsVisible} />
      ) : (
        <ChatPage
          setIsVisible={setIsVisible}
          // content={content}
          // setContent={setContent}
        />
      )}
    </div>
  );
}

export default App;
