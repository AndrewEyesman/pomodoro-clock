import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default (props) => (
    <div className="length-modifier">
        <div id="session-label">Session Length</div>
        <div className="modifier-controls">
            <div 
                id="session-decrement"
                onClick={() => props.handleSessionLength('dec')}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="session-length">{props.lengthValue}</div>
            <div 
                id="session-increment"
                onClick={() => props.handleSessionLength('inc')}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </div>
    </div>
)