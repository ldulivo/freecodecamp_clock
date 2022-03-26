import { useState, useEffect } from 'react';
import Play from './svg/Play';
import Reset from './svg/Reset';
import Stop from './svg/Stop';

export default function Timer({
    breakLength,
    minutes = "25",
    seconds = "00",
    reset,
    setReset,
    setBreakLength,
    setSessionLength,
    beepRef
}) {

    const [timeLeftMinutes, setTimeLeftMinutes] = useState('25')
    const [timeLeftSeconds, setTimeLeftSeconds] = useState(seconds)

    let myMinutes;
    let mySeconds;
    let mySession;
    let myBreak = "Session"

    const [startStop, setStartStop] = useState(true);
    const [breakOrSession, setBreakOrSession] = useState(false);

    const [ticToc, setTicToc] = useState(null);
    const [initial, setInitial] = useState(0)

    useEffect( () => {
        if (breakOrSession) {
            myBreak = 'Break';
            mySession = false;
        } else {
            myBreak = 'Session';
            mySession = true;
        }
    }, [breakOrSession])
    
    /**
     * reset
     */
    useEffect( () => {
        setBreakLength(5)
        setSessionLength(25)

        setTimeLeftMinutes('25')
        setTimeLeftSeconds("00")
        setStartStop(true)
        setBreakOrSession(false)
        setTicToc(null)
        setInitial(0)
        myMinutes = 25;
        mySeconds = 0
        setReset(false)
        beepRef.current.pause();
        beepRef.current.currentTime = 0;
    }, [reset])

    const myReset = () => {
        setBreakLength(5)
        setSessionLength(25)

        setTimeLeftMinutes('25')
        setTimeLeftSeconds("00")
        setStartStop(true)
        setBreakOrSession(false)
        setTicToc(null)
        setInitial(0)
        myMinutes = 25;
        mySeconds = 0
        setReset(true)
        beepRef.current.pause();
        beepRef.current.currentTime = 0;
    }

    /**
     * Start
     */
    if ( (minutes !== parseInt(timeLeftMinutes)) && initial === 0 ) {
        if ( minutes < 10 ) {
            setTimeLeftMinutes(`0${minutes}`)
        } else {
            setTimeLeftMinutes(minutes)
        }
    }

    /**
     * interval one second
     */
    
    useEffect( () => {
        myMinutes = parseInt(timeLeftMinutes);
        mySeconds = parseInt(timeLeftSeconds);
        mySession = breakOrSession;
        if (ticToc) {
            const myClock = setInterval(() => {
                //runClock()
                requestAnimationFrame(runClock)
            }, 1000);
            return () => clearInterval(myClock)
        }
    }, [ticToc])

    /**
     * playPause
     * 
     * Detects press on play pause button
     */

    const playPause = () => {
        if( initial === 0 ) {
            setInitial(minutes)
        }

        
        if (startStop) {
            setTicToc(true)
        } else {
            setTicToc(false)
        }

        setStartStop(!startStop)

    }

    /**
     * run clock
     */
    
    const runClock = () => {

        mySeconds --;
        if (mySeconds > -1) {
            setTimeLeftSeconds(mySeconds)
        } else {
            myMinutes --;
            mySeconds = 59;
            setTimeLeftMinutes(myMinutes)
            setTimeLeftSeconds(mySeconds)

            if ( myMinutes < 0 ) {
                changeSession(mySession)
            } else {
                
            }
        }


        if (mySeconds < 10 && mySeconds >= 0) {
            setTimeLeftSeconds(`0${mySeconds}`)
        } else {
            setTimeLeftSeconds(mySeconds)
        }

        if ( myMinutes < 10  && myMinutes >= 0) {
            setTimeLeftMinutes(`0${myMinutes}`)
        } else {
            setTimeLeftMinutes(myMinutes)
        }
    }

    /**
     * change session
     */
    const changeSession = (change) => {
        if ( change ) {
            myMinutes = parseInt(initial);
            mySeconds = 0;
            setTimeLeftSeconds(mySeconds);
            setBreakOrSession(false)
            myBreak = 'Break';
            mySession = false;
        } else {
            myMinutes = parseInt(breakLength);
            mySeconds = 0;
            setTimeLeftSeconds(mySeconds);
            setBreakOrSession(true)
            myBreak = 'Session';
            mySession = true;
        }
        
        beepRef.current.play();

    }

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
                    `${timeLeftMinutes}:${timeLeftSeconds}`
                }
            </div>
        </main>
        <footer>
            <button 
                id="start_stop"
                onClick={ () => playPause()}
            >
                {
                    (startStop)
                        ? <Play />
                        : <Stop />
                }
            </button>
            <button id="reset" onClick={ () => myReset() }>{<Reset />}</button>
        </footer>
    </div>
  )
}
