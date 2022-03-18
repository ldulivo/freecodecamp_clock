import React from 'react'

export default function Timer({timeLeftHours, timeLeftMinutes}) {
  return (
    <div className="timer">
        <main>
            <div id="timer-label">Session</div>
            <div id="time-left" type="time">{timeLeftHours}:{timeLeftMinutes}</div>
        </main>
        <footer>
            <div id="start_stop">Start</div>
            <div id="reset">reset</div>
        </footer>
    </div>
  )
}
