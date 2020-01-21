import React from 'react'

export default (props) => (
    <div id="timer-display">
        <div id="timer-label">{props.currentCycle}</div>
        <div id="time-left">{`${props.timerMinutes}:${props.timerSeconds}`}</div>
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"></audio>
    </div>
)