import { useEffect, useState } from "react";

const DATE = new Date("07/05/2025 00:00:00");

export default function Countdown() {
  const [remainingTime, setRemainingTime] = useState(countdown(DATE));

  function countdown(date) {
    let now = new Date().getTime();
    let timeLeft = date.getTime() - now;

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(countdown(DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="counter">
      <div className="time-section">
        <span>{String(remainingTime.days).padStart(2, "0")}</span>
        <p>Zile</p>
      </div>
      <span>:</span>
      <div className="time-section">
        <span>{String(remainingTime.hours).padStart(2, "0")}</span>
        <p>Ore</p>
      </div>
      <span>:</span>
      <div className="time-section">
        <span>{String(remainingTime.minutes).padStart(2, "0")}</span>
        <p>Minute</p>
      </div>
      <span>:</span>
      <div className="time-section">
        <span>{String(remainingTime.seconds).padStart(2, "0")}</span>
        <p>Secunde</p>
      </div>
    </div>
  );
}
