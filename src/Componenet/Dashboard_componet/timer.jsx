import React, { useEffect, useState, useRef } from "react";

const LiveClockIn = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null); // Date object
  const [duration, setDuration] = useState("0 sec");
  const intervalRef = useRef(null);

  // Format Date to 12-hour string with AM/PM
  const formatTo12Hour = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Start timer and clock-in time
  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
  };

  // Stop timer
  const handleClockOut = () => {
    setIsClockedIn(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Update duration every second when clocked in
  useEffect(() => {
    if (!isClockedIn || !clockInTime) return;

    const updateDuration = () => {
      const now = new Date();
      const diffMs = now - clockInTime;
      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setDuration(
        `${hours > 0 ? `${hours} hr ` : ""}${
          minutes > 0 ? `${minutes} min ` : ""
        }${seconds} sec`
      );
    };

    updateDuration();
    intervalRef.current = setInterval(updateDuration, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isClockedIn, clockInTime]);

  return (
    <div style={{ maxWidth: 300, margin: "auto", textAlign: "center", fontFamily: "Arial" }}>
      <h3>Live Clock In Timer</h3>

      {clockInTime && (
        <div>
          <strong>Clock-In Time:</strong> {formatTo12Hour(clockInTime)}
        </div>
      )}

      <div style={{ margin: "10px 0", fontSize: "1.2em" }}>
        <strong>Elapsed Time:</strong> {duration}
      </div>

      {!isClockedIn ? (
        <button onClick={handleClockIn} style={{ padding: "10px 20px", fontSize: "1em" }}>
          Clock In
        </button>
      ) : (
        <button
          onClick={handleClockOut}
          style={{ padding: "10px 20px", fontSize: "1em", backgroundColor: "red", color: "white" }}
        >
          Clock Out
        </button>
      )}
    </div>
  );
};

export default LiveClockIn;
