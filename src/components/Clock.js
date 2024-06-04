"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  //Difference between status and mode changes is that status refers within the same mode. As in active mode but paused / working.
  //Mode refers to changes between active and resting (each have its own timers);
  const [clockParameters, setClockParameters] = useState({
    activeMode: 59,
    restMode: 10,
  });
  const [timer, setTimer] = useState(clockParameters.activeMode); // Countdown
  const [displayTime, setDisplayTime] = useState();
  const [active, setActive] = useState(false); // Is it running
  const [intervalId, setIntervalId] = useState(null); // Stores interval ID so it can be paused
  const [mode, setMode] = useState("activeMode");
  const [styles, setStyles] = useState({backgroundColor: 'green'});

  const changeStatus = () => {
    //Only works if there's time left or the status change is for a pause
    if (timer > 0 || active) {
      setActive((prevActive) => !prevActive);
    }
  };

  const updateTimer = () => {
    //Called by setInterval
    setTimer((prevTimer) => prevTimer - 1);
  };

  const refreshTimer = (newMode) => {
    setTimer(clockParameters[newMode]);
  };

  const changeMode = () => {
    //Changes modes between active learning / resting
    const newMode = mode === "activeMode" ? "restMode" : "activeMode";
    const newStyles = mode === "activeMode" ? {backgroundColor: "purple"} : {backgroundColor: "green"};
    setMode(newMode);
    setStyles(newStyles);
    refreshTimer(newMode);
  };

  useEffect(() => {
    // Handles status changes by the buttons
    if (active) {
      const id = setInterval(updateTimer, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [active]);

  useEffect(() => {
    // Handles time displaying
    if (timer < 1) {
      //Conditional to stop when timer reaches 0
      changeStatus();
      changeMode();
    }
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    let paddedSeconds = seconds.toString().padStart(2, "0"); // Purely for visual purposes
    setDisplayTime(`${minutes}:${paddedSeconds}`);
  }, [timer]);

  return (
    <div className="flex flex-col gap-5 p-6" style={styles}>
      <div className="bg-gray-500 text-white font-bold py-2 px-4 rounded text-center text-4xl">
        {displayTime}
      </div>
      <div className="flex flex-col gap-5">
        {" "}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={changeStatus}
        >
          {active ? "Stop" : "Start"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={changeMode}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Clock;
