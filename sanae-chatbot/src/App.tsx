import { useState } from "react";
import "./App.css";
import { StartPage } from "./StartPage";
import { ChatPage } from "./ChatPage";

function App() {
  const [isVisible, setIsVisible] = useState(true);
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
        <ChatPage setIsVisible={setIsVisible} />
      )}
    </div>
  );
}

export default App;
