import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRedo } from '@fortawesome/free-solid-svg-icons'

export default (props) => (
    <div id="timer-controls">
        <div 
            id="start_stop"
            onClick={() => props.handleStartTimer(true)}
        >
            <FontAwesomeIcon icon={faPlay} /></div>
        <div 
            id="reset"
            onClick={() => props.handleResetTimer()}
        >
            <FontAwesomeIcon icon={faRedo} /></div>
    </div>
)