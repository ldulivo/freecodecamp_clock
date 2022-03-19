import Play from './svg/Play'
import Reset from './svg/Reset'
import Stop from './svg/Stop'

export default function Timer({
    timeLeftHours, 
    timeLeftMinutes, 
    myReset,
    startStop,
    setStartStop,
    startStopDecrement,
    breakOrSession
}) {
    /* const stopStartDecrement = () => {
        setStartStop(!startStop);
        decrement(!startStop);
    } */

  return (
    <div className="timer">
        <main>
            <div id="timer-label">
                {
                    (breakOrSession)
                        ? "Break"
                        : "Session"
                }
            </div>
            <div id="time-left" type="time">
                {
                    `${timeLeftHours}:${timeLeftMinutes}`
                }
            </div>
        </main>
        <footer>
            <button 
                id="start_stop"
                onClick={ () => startStopDecrement(startStop)}
            >
                {
                    (startStop)
                        ? <Stop />
                        : <Play />
                }
            </button>
            <button id="reset" onClick={ () => myReset() }>{<Reset />}</button>
        </footer>
    </div>
  )
}
