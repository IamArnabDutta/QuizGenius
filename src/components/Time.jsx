import { useEffect, useState } from "react";



export default function Timer({ setStop, questionNumber, apiQuestion }) {
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    if (timer === 0) {
      setStop(true); // Stop the game when the timer reaches 0
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setStop, timer]);

  useEffect(() => {
    if (apiQuestion && apiQuestion.timerDurationInSeconds) {
      setTimer(apiQuestion.timerDurationInSeconds);
    } else {
      
      setTimer(20);
    }
  }, [questionNumber, apiQuestion]);

  return timer;
}
