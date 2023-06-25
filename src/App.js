import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./styles.css";

const rotate = (degree) => keyframes`
  from {
    transform: translate(-50%, -100%) rotate(${degree}deg);
  }
  to {
    transform: translate(-50%, -100%) rotate(${degree + 360}deg);
  }
`;

const ClockStick = styled.div`
  animation: ${(props) => rotate(props.degree)} ${(props) => props.seconds}s
    linear infinite;
`;

const App = () => {
  const [degrees, setDegrees] = useState({});

  useEffect(() => {
    setDegrees({
      hour: getRotation("Hours", 12),
      minute: getRotation("Minutes", 60),
      second: getRotation("Seconds", 60)
    });
  }, []);

  const getRotation = (unit, max) => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let value;
  
    if (unit === "Hours") {
      value = hours + minutes / 60 + seconds / 3600;
    } else if (unit === "Minutes") {
      value = minutes + seconds / 60;
    } else {
      value = seconds;
    }
  
    const rotation = (value * 360) / max;
    return rotation;
  };
  

  const renderNumbers = () => {
    const numbers = [];

    for (let i = 1; i <= 12; i++) {
      const angle = i * 30 * (Math.PI / 180);
      const numberStyle = {
        left: `calc(50% + ${Math.sin(angle) * 140}px)`,
        top: `calc(50% - ${Math.cos(angle) * 140}px)`
      };
      numbers.push(
        <div key={i} className="number" style={numberStyle}>
          {i}
        </div>
      );
    }

    return numbers;
  };

  return (
    <div className="clock">
      {renderNumbers()}
      <ClockStick
        className="hour-hand"
        seconds={216000}
        degree={degrees.hour}
      ></ClockStick>
      <ClockStick
        className="minute-hand"
        seconds={3600}
        degree={degrees.minute}
      ></ClockStick>
      <ClockStick
        className="second-hand"
        seconds={60}
        degree={degrees.second}
      ></ClockStick>
      <div className="center-circle"></div>
    </div>
  );
};

export default App;
