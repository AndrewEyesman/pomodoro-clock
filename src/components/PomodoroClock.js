import React from 'react'
import BreakLengthModifier from './BreakLengthModifier'
import SessionLengthModifier from './SessionLengthModifier'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'

export default class PomodoroClock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerMinutes: '25',
            timerSeconds: '00',
            currentSeconds: 0,
            breakCycle: false,
            isActive: true
        }
    }

    handleBreakLength = (value) => {
        const breakLength = this.state.breakLength
        const timerMinutes = this.state.timerMinutes

        if (value === 'dec') {
            if (breakLength === 1) return

            return this.setState(() => ({
                breakLength: breakLength - 1,
            }))
        }

        if (value === 'inc') {
            if (breakLength === 60) return

            return this.setState(() => ({
                breakLength: breakLength + 1,
            }))
        }
        
    }

    handleSessionLength = (value) => {
        const sessionLength = this.state.sessionLength
        const timerMinutes = this.state.timerMinutes

        if (value === 'dec') {
            if (sessionLength === 1) return

            return this.setState(() => ({
                sessionLength: sessionLength - 1,
                timerMinutes: timerMinutes - 1
            }))
        }

        if (value === 'inc') {
            if (sessionLength === 60) return

            return this.setState(() => ({
                sessionLength: sessionLength + 1,
                timerMinutes: parseInt(timerMinutes) + 1
            }))
        }
    }
    // ********************************
    // Handles the main countdown cycle
    // ********************************
    handleStartTimer = (action = true) => {
        const currentSeconds = this.state.currentSeconds
        const timerMinutes = this.state.timerMinutes

        // Should recieve false when stop function is called, does nothing.
        if (!action) return

        setTimeout(() => {
            if (!currentSeconds && !parseInt(timerMinutes)) {
                return this.formatTimer(), 
                this.handleBreakTimer()
            }
    
            if (currentSeconds === 0) {
                return this.setState(() => ({
                    currentSeconds: 59,
                    timerSeconds: '59',
                    timerMinutes: parseInt(timerMinutes) - 1
                })), this.formatTimer(),
                     this.handleStartTimer()
            }
    
            if (currentSeconds <= 59) {
                return this.setState(() => ({
                    currentSeconds: currentSeconds - 1,
                    timerSeconds: parseInt(currentSeconds) - 1
                    
                })), this.formatTimer(),
                     this.handleStartTimer()
            }
        }, 1000)
    }
    // *****************************************
    // Switches between session and break cycles
    // *****************************************
    handleBreakTimer = () => {
        if (this.state.breakCycle) {
            return this.setState(() => ({
                currentSeconds: 59,
                timerSeconds: '59',
                timerMinutes: (this.state.sessionLength- 1).toString(),
                breakCycle: false
            })), this.forceUpdate(() => {
                this.formatTimer()
                this.handleStartTimer()
            })
        }

        return this.setState(() => ({
            currentSeconds: 59,
            timerSeconds: '59',
            timerMinutes: (this.state.breakLength - 1).toString(),
            breakCycle: true
        })), this.forceUpdate(() => {
            this.formatTimer()
            this.handleStartTimer()
        })
    }

    formatTimer = () => {
        const timerMinutes = this.state.timerMinutes
        const timerSeconds = this.state.timerSeconds

        this.setState(() => ({
            timerSeconds: timerSeconds.toString().length < 2 ? '0' + timerSeconds.toString() : timerSeconds,
            timerMinutes: timerMinutes.toString().length < 2 ? '0' + timerMinutes.toString() : timerMinutes
        }))
    }
    // ***************************************
    // Stops timer and resets to initial state
    // ***************************************
    handleResetTimer = () => {
        this.setState(() => ({
            breakLength: 5,
            sessionLength: 25,
            timerMinutes: '25',
            timerSeconds: '00',
            currentSeconds: 0,
            breakCycle: false,
            isActive: false
        })), this.forceUpdate(() => this.handleStartTimer(false))
        // Calls start timer function with value of false
    }

    render() {
        return (
            <div id="clock">
                <h1 id="clock-title">Pomodoro Clock</h1>
                <div id="modifiers">
                    <BreakLengthModifier
                        lengthValue={this.state.breakLength}
                        handleBreakLength={this.handleBreakLength}
                    />
                    <SessionLengthModifier
                        lengthValue={this.state.sessionLength}
                        handleSessionLength={this.handleSessionLength}
                    />
                </div>
                <TimerDisplay 
                    timerMinutes={this.state.timerMinutes}
                    timerSeconds={this.state.timerSeconds}
                />
                <TimerControls 
                    handleStartTimer={this.handleStartTimer}
                    handleResetTimer={this.handleResetTimer}
                />
            </div>
        )
    }
}