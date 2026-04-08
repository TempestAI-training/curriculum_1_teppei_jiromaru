import { useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClients.js";

function App() {
  const [score, setScore] = useState(0);

  const handleVote = async (choice) => {
    const { error } = await supabase.from("votes").insert([{ item: choice }]);
    if (error) {
      console.error("errror:", error);
    } else {
      console.log(`voted for ${choice}`);
    }
  };

  const handleCalculate = async () => {
    const { data, error } = await supabase.from("votes").select("*");
    if (error) {
      console.error("データ取得エラー:", error);
      return;
    }
    const aVotes = data.filter((v) => v.item === "A");
    const aScore = aVotes.length * 2;
    setScore(aScore);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>投票システム(Supabase版)</h2>
      </header>
      <div style={{ margin: 20 }}>
        <button onClick={() => handleVote("A")}>vote for A</button>
        <button onClick={() => handleVote("B")}>vote for B</button>
        <div style={{ margin: 20 }}>
          <button onClick={handleCalculate}>calculate A's score</button>
          <p>A's score: {score}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
