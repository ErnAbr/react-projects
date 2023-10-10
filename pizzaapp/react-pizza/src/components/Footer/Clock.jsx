import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  return <div>{time.toLocaleTimeString([], { hour12: false })}</div>;
};
