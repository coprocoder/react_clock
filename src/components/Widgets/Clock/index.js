import React, { Component, useEffect, useState } from 'react';
import Clock from 'react-clock';
import Select from 'react-select';


import 'react-clock/dist/Clock.css';


function CustomClock(props) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const getNewTime = () => {
      console.log('CustomClock props', props)
      return setInterval(
        () => {
          let new_time = new Date(Date.now() + Number(props.curZone.timezone.slice(1)) * 3600000)
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
          minuteHandLength={80}
          hourHandLength={40}
          renderHourMarks={true}
          renderMinuteMarks={false}
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