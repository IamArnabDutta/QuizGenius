import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Time";
import Start from "./components/Start";


const moneyPyramidData = [
  { id: 1, amount: "$0" },
  { id: 2, amount: "$100" }, 
  { id: 3, amount: "$200" }, 
  { id: 4, amount: "$300" }, 
  { id: 5, amount: "$500" },
  { id: 6, amount: "$1,000" },
  { id: 7, amount: "$2,000" },
  { id: 8, amount: "$4,000" },
  { id: 9, amount: "$8,000" },
  { id: 10, amount: "$16,000" },
  { id: 11, amount: "$32,000" },
  { id: 12, amount: "$64,000" },
  { id: 13, amount: "$125,000" },
  { id: 14, amount: "$250,000" },
  { id: 15, amount: "$500,000" },
  { id: 16, amount: "$1,000,000" },
].reverse();

function App() {
  const [username, setUsername] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState(0);
  const [apiQuestions, setApiQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const apiUrl = "https://the-trivia-api.com/v2/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setApiQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const maxLevel = 15;

  // Check if the user has reached the end of the money pyramid
  const hasEarnedAllMoney = questionNumber > maxLevel;

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">
                 {hasEarnedAllMoney
                  ? `  ${earned} Congratulations , you've earned all the money  `
                  : `You earned : ${earned}`}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber}
                      apiQuestion={apiQuestions[questionNumber - 1]}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    apiQuestion={apiQuestions[questionNumber - 1]}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setEarned={setEarned}
                    moneyPyramid={moneyPyramidData}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramidData.map((m) => (
                <li
                  className={
                    questionNumber === m.id ? "moneyList active" : "moneyListItem"
                  }
                  key={m.id}
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
