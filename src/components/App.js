import React, {Component, useEffect, useState} from "react";
import '../styles/App.css';

let retInterval;
let retInterval2;

const App = () => {

  //holds total work and break
  const [worktime, setWorktime] = useState(25*60);
  const [breaktime, setBreaktime] = useState(5*60);

  //holds temporary data from input
  const [tempWorkTime, setTempWorkTime] = useState(25);
  const [tempBreakTime, setTempBreakTime] = useState(5);

  //holds running work and break time
  const [currentWorkTime, setCurrentWorkTime] = useState(worktime);
  const [currentBreakTime, setCurrentBreakTime] = useState(breaktime);

  const updateTime = (e) => {
    if(tempWorkTime === 0 && tempBreakTime === 0) {
      reset();
    }
    else {
      setWorktime(tempWorkTime*60);
      setBreaktime(tempBreakTime*60);
      setCurrentWorkTime(tempWorkTime*60);
      setCurrentBreakTime(tempBreakTime*60);
    }
  }

  const start = () => {
    clearInterval(retInterval2);
    retInterval = setInterval(() => {
      //console.log('interval running')
      setCurrentWorkTime(currentWorkTime => currentWorkTime - 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(retInterval);
    retInterval2 = setInterval(() => {
      setCurrentBreakTime(currentBreakTime => currentBreakTime - 1)
    }, 1000)
  }

  const reset = () => {
    clearInterval(retInterval);
    clearInterval(retInterval2);
    setWorktime(25*60);
    setBreaktime(5*60);
    setCurrentWorkTime(25*60);
    setCurrentBreakTime(5*60);
    setTempWorkTime(25*60);
    setTempBreakTime(5*60);
  }

  const tempupdateWork = (e) => {
    setTempWorkTime(e.target.value);
  }

  const tempupdateBreak = (e) => {
    setTempBreakTime(e.target.value);
  }

  useEffect(() => {
    console.log('TempWorkTime, TempBreak Time - ', tempWorkTime, tempBreakTime);
    console.log('Total WorkTime, Total Break Time - ', worktime, breaktime);
    console.log('Current WorkTime, Current Break Time - ', currentWorkTime, currentBreakTime);

    if(currentWorkTime === 0) {
      alert('Work Time Over')
    }
    if(currentBreakTime === 0) {
      alert('Break Time Over')
    }

  })

  return (
    <div id="main">
      <h2>{currentWorkTime}</h2>
      <h3>Work-Time</h3>
      <h2>{currentBreakTime}</h2>
      <h3>Break-Time</h3>
      <br></br>
      <button data-testid='start-btn' onClick={start}>Start</button>
      <button data-testid='stop-btn' onClick={stop}>Stop</button>
      <button data-testid='reset-btn' onClick={reset}>Reset</button>
      <br></br>
      <input type="number" data-testid='work-duration' min="0" value={tempWorkTime} onChange={tempupdateWork}/>
      <input type="number" data-testid='work-duration' min="0" value={tempBreakTime} onChange={tempupdateBreak}/>
      <button data-testid='set-btn' onClick={updateTime}>Set</button>
    </div>
  )
}


export default App;
