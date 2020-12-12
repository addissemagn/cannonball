import React, { useState } from "react";
import "./Countdown.css";

const Countdown = ({ finalDate }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  // update every second
  setInterval(() => {
    const timeLeft = calculateCountdown(finalDate);
    timeLeft ? setCountdown(timeLeft) : stopCountdown();
  }, 1000);

  const stopCountdown = () => {
      // TODO: handle this
  }

  const calculateCountdown = (endDate) => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  };

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  return (
    <div className="Countdown">
      <div className="Countdown-col">
        <h1>{addLeadingZeros(countdown.days)}</h1>
        <span>{countdown.days === 1 ? "Day" : "Days"}</span>
      </div>

      <div className="Countdown-col">
        <h1>{addLeadingZeros(countdown.hours)}</h1>
        <span>Hours</span>
      </div>

      <div className="Countdown-col">
        <h1>{addLeadingZeros(countdown.min)}</h1>
        <span>Min</span>
      </div>

      <div className="Countdown-col">
        <h1>{addLeadingZeros(countdown.sec)}</h1>
        <span>Sec</span>
      </div>
    </div>
  );
};

export default Countdown;