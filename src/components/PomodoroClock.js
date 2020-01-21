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
            isActive: false,
            currentCycle: 'Session'
        }
    }

    handleBreakLength = (value) => {
        const breakLength = this.state.breakLength

        if (value === 'dec') {``
            if (breakLength === 1) return

            if (this.state.breakCycle) {
                return this.setState(() => ({
                    breakLength: breakLength - 1,
                    timerMinutes: (breakLength - 1).toString().length < 2 ? '0' + (breakLength - 1).toString() : (breakLength - 1).toString()
                }))
            } else {
                return this.setState(() => ({
                    breakLength: breakLength - 1
                }))
            }
            
        }

        if (value === 'inc') {
            if (breakLength === 60) return

            if (this.state.breakCycle) {
                return this.setState(() => ({
                    breakLength: breakLength + 1,
                    timerMinutes: (breakLength + 1).toString().length < 2 ? '0' + (breakLength + 1).toString() : (breakLength + 1).toString()
                }))
            } else {
                return this.setState(() => ({
                    breakLength: breakLength + 1
                }))
            }
        }
    }

    handleSessionLength = (value) => {
        const sessionLength = this.state.sessionLength

        if (value === 'dec') {
            if (sessionLength === 1) return

            if (!this.state.breakCycle) {
                return this.setState(() => ({
                    sessionLength: sessionLength - 1,
                    timerMinutes: (sessionLength - 1).toString().length < 2 ? '0' + (sessionLength - 1).toString() : (sessionLength - 1).toString()
                }))
            } else {
                return this.setState(() => ({
                    sessionLength: sessionLength - 1
                }))
            }
            
        }

        if (value === 'inc') {
            if (sessionLength === 60) return

            if (!this.state.breakCycle) {
                return this.setState(() => ({
                    sessionLength: sessionLength + 1,
                    timerMinutes: (sessionLength + 1).toString().length < 2 ? '0' + (sessionLength + 1).toString() : (sessionLength + 1).toString()
                }))
            } else {
                return this.setState(() => ({
                    sessionLength: sessionLength + 1
                }))
            }
            
        }
    }
    // ********************************
    // Handles the main countdown cycle
    // ********************************
    handleStartTimer = (action = true) => {
        const currentSeconds = this.state.currentSeconds
        const timerMinutes = this.state.timerMinutes

        if (action === 'start' && this.state.isActive) {
            return this.setState(() => ({ isActive: false }))
        } else if (action === 'start' && !this.state.isActive) {
            this.setState(() => ({ isActive: true }))
        }

        if (!action) {
            return this.setState(() => ({ isActive: false }))
        }

        setTimeout(() => {
            if (!this.state.isActive) return

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
                breakCycle: false,
                currentCycle: 'Session'
            })), this.forceUpdate(() => {
                this.formatTimer()
                this.handleStartTimer()
            })
        }

        const audio = document.getElementById('beep')

        audio.load()
        audio.play()

        return this.setState(() => ({
            currentSeconds: 59,
            timerSeconds: '59',
            timerMinutes: (this.state.breakLength - 1).toString(),
            breakCycle: true,
            currentCycle: 'Break'
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
            isActive: false,
            currentCycle: 'Session'
        })), this.forceUpdate(() => this.handleStartTimer(false))
    }

    render() {
        return (
            <div id="clock">
                <h1 id="clock-title">Pomodoro Clock</h1>
                <div id="modifiers">
                    <BreakLengthModifier
                        isActive={this.state.isActive}
                        lengthValue={this.state.breakLength}
                        handleBreakLength={this.handleBreakLength}
                    />
                    <SessionLengthModifier
                        isActive={this.state.isActive}
                        lengthValue={this.state.sessionLength}
                        handleSessionLength={this.handleSessionLength}
                    />
                </div>
                <TimerDisplay 
                    currentCycle={this.state.currentCycle}
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