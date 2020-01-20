import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default (props) => (
    <div className="length-modifier">
        <div id="break-label">Break Length</div>
        <div className="modifier-controls">
            <div 
                id="break-decrement"
                onClick={() => props.handleBreakLength('dec')}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="break-length">{props.lengthValue}</div>
            <div 
                id="break-increment"
                onClick={() => props.handleBreakLength('inc')}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </div>
    </div>
)