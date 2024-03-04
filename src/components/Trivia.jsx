import { useEffect, useState } from "react";



export default function Trivia({
  apiQuestion,
  setStop,
  questionNumber,
  setQuestionNumber,
  setEarned,
  moneyPyramid,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [previousAmount, setPreviousAmount] = useState("$0");

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(3000, () => {
      if (a.correct) {
        setPreviousAmount(moneyPyramid.find((m) => m.id === questionNumber).amount);
        const currentAmount = moneyPyramid.find((m) => m.id === questionNumber + 1);
        if (currentAmount) {
          setEarned(currentAmount.amount);
        } else {
          setStop(true);
        }
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });

    setTimeout(() => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    }, 2000);
  };

  useEffect(() => {
    if (apiQuestion) {
      // Shuffle the answers array to randomize their order
      const shuffledAnswers = shuffleArray([
        { text: apiQuestion.correctAnswer, correct: true },
        ...apiQuestion.incorrectAnswers.map((incorrectAnswer) => ({
          text: incorrectAnswer,
          correct: false,
        })),
      ]);

      setQuestion({
        question: apiQuestion.question.text,
        answers: shuffledAnswers,
      });
    }
  }, [apiQuestion]);

  useEffect(() => {
    setSelectedAnswer(null);
    setClassName("answer");
  }, [questionNumber]);

  return (
    <div className="trivia">
      {question && (
        <>
          <div className="question">{question.question}</div>
          <div className="answers">
            {question.answers.map((a) => (
              <div
                className={
                  selectedAnswer === a
                    ? className
                    : selectedAnswer === null
                    ? "answer"
                    : "answer"
                }
                onClick={() => !selectedAnswer && handleClick(a)}
                key={a.text}
              >
                {a.text}
              </div>
            ))}
          </div>
          {/* { <div className="previousAmount">
            Your current winning is: {previousAmount}
          </div> } */}
        </>
      )}
    </div>
  );
}
