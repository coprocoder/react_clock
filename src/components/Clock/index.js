import React, { Component, useEffect, useState } from 'react';
import Clock from 'react-clock';
import Select from 'react-select';

// import 'react-clock/dist/Clock.css';
import './clock.scss'

function CustomClock(props) {
  const curDate = Date.now() 
    + Number(new Date().getTimezoneOffset() * 60 * 1000)
    + Number(props.curZone.timezone.slice(1)) * 3600000

  const [value, setValue] = useState(new Date(curDate));

  useEffect(() => {
    const getNewTime = () => {
      return setInterval(
        () => {
          let new_time = new Date(curDate)
          setValue(new_time)
        },
        1000
      );
    }
    const interval = getNewTime()

    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className="clock-view-item">
      <div className="clock-item-wrapper">
        <Clock
          value={value}
          size={200}
          // Отрисовка только часовых засечек
          renderHourMarks={true}
          renderMinuteMarks={false}
          // Длины стрелок в % 
          minuteHandLength={80}
          hourHandLength={40}
          // Выступы стрелок за центр часов (сзади)
          secondHandOppositeLength={10}
          minuteHandOppositeLength={0}
          hourHandOppositeLength={0}
        />
        <p>{value.toLocaleTimeString()}</p>
        <Select
          value={props.curZone}
          onChange={(selectValue) => props.handleChangeZone(props.index,selectValue )}
          options={props.selectZones}
        />
      </div>
    </div>
  )
}

export default CustomClock;