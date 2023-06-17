import React, { useEffect, useState } from 'react';
import './AnalogClock.css';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRotation = (unit, max) => {
    const value = time[`get${unit}`]();
    let rotation = (value * 360) / max;

    if (unit === 'Seconds') {
      if (value === 59) {
        const milliseconds = time.getMilliseconds();
        rotation += ((1000 - milliseconds) / 1000) * 6;
      }
    }

    return {
      transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
    };
  };

  const renderNumbers = () => {
    const numbers = [];

    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30) * (Math.PI / 180);      
        const numberStyle = {
        left: `calc(50% + ${Math.sin(angle) * 140}px)`,
        top: `calc(50% - ${Math.cos(angle) * 140}px)`,
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
      <div className="hour-hand" style={getRotation('Hours', 12)}></div>
      <div className="minute-hand" style={getRotation('Minutes', 60)}></div>
      <div className="second-hand" style={getRotation('Seconds', 60)}></div>
      <div className="center-circle"></div>
    </div>
  );
};

export default AnalogClock;
