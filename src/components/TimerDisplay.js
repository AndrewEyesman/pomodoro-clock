import React from 'react'

export default (props) => (
    <div id="timer-display">
        <div id="timer-label">Session</div>
        <div id="time-left">{`${props.timerMinutes}:${props.timerSeconds}`}</div>
    </div>
)