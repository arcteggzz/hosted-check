import React, { useEffect, useRef } from "react";

const DataControl: React.FC = () => {
  // Ref to store the timer ID
  const timerRef = useRef<number | null>(null);

  const timeAmount = import.meta.env.VITE_INACTIVITY_TIMER_IN_MINUTES;
  const timeAmountInSeconds = timeAmount * 60000;

  // Function to handle user inactivity (logs "logging out" to the console)
  const handleInactivity = () => {
    localStorage.clear();
    console.log("inactive from  the logout tracketr TEGA");
  };

  // Function to reset the timer whenever user activity is detected
  const resetTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    // Set the timer to trigger inactivity after 1 minute (60000ms)
    timerRef.current = window.setTimeout(handleInactivity, timeAmountInSeconds);
  };

  useEffect(() => {
    // List of events to track for user activity
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    // Attach event listeners for each event
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start the initial timer
    resetTimer();

    // Cleanup function to remove event listeners and clear the timer
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default DataControl;
