import { useState, useEffect } from "react";
import Length from "./Components/Length";
import Timer from "./Components/Timer";

function App() {
  let decrement = false;

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [timeLeftHours, setTimeLeftHours] = useState('25');
  const [timeLeftMinutes, setTimeLeftMinutes] = useState('00');

  const [startStop, setStartStop] = useState(false);
  const [breakOrSession, setBreakOrSession] = useState(false);

/*   useEffect( () => {
    if (breakLength === 0) setBreakLength(1);
    if (breakLength <= 1) setBreakLength(1);
    if (breakLength >= 60) setBreakLength(60);
  }, [breakLength]) */

  useEffect( () => {
    if ( parseInt(timeLeftHours) < 10 ) setTimeLeftHours(`0${parseInt(timeLeftHours)}`);
    if ( parseInt(timeLeftHours) >= 60 ) setTimeLeftHours('60');
    if ( parseInt(timeLeftHours) < 0 ) {
      if (breakOrSession) {
        setTimeLeftHours(sessionLength -1)
      } else {
        setTimeLeftHours(breakLength -1);
      }
      setBreakOrSession(!breakOrSession);
      //setTimeLeftHours('00')
    };

  }, [timeLeftHours])

  /* useEffect(() => {
    if (sessionLength <= 1) {
      setSessionLength(1);
      setTimeLeftHours(1);
    }
    if (sessionLength >= 60) setSessionLength(60);
  }, [sessionLength]) */

  const myReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeftHours('25');
    setTimeLeftMinutes('00');
    setStartStop(false);
    setBreakOrSession(false);
    decrement = false;
  }
  


  useEffect( () => {
    if ( startStop ) {
      const timer = setInterval(() => {
        if ( !decrement ) {

          if ( parseInt(timeLeftMinutes) < 11 ) {
            setTimeLeftMinutes(`0${parseInt(timeLeftMinutes) -1 }`)
          } else {
            setTimeLeftMinutes(parseInt(timeLeftMinutes) - 1);
          }
  
          if ( timeLeftMinutes === '00' ) {
            setTimeLeftMinutes('59');
            setTimeLeftHours( parseInt(timeLeftHours) - 1 )
          }

        }

      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeftMinutes])

  useEffect( () => {
    if ( startStop && timeLeftMinutes === '00') {
      setTimeLeftMinutes('59');
      setTimeLeftHours( parseInt(timeLeftHours) - 1 )
    }
    if ( startStop && timeLeftMinutes !== '00') {
      if ( parseInt(timeLeftMinutes) < 11 ) {
        setTimeLeftMinutes(`0${parseInt(timeLeftMinutes) -1 }`)
      } else {
        setTimeLeftMinutes(parseInt(timeLeftMinutes) - 1);
      }
    }
  }, [startStop])

  const startStopDecrement = (e) => {
    setStartStop(!startStop);
    decrement = e;
  }


  return (
    <div className="App">
      <div className="container">
        <Length 
          breakLength={breakLength} 
          sessionLength={sessionLength} 
          timeLeftHours={timeLeftHours}
          setBreakLength={setBreakLength} 
          setSessionLength={setSessionLength}
          setTimeLeftHours={setTimeLeftHours}
        />
        <Timer 
          timeLeftHours={timeLeftHours} 
          timeLeftMinutes={timeLeftMinutes} 
          myReset={myReset}
          startStop={startStop}
          setStartStop={setStartStop}
          startStopDecrement={startStopDecrement}
          breakOrSession={breakOrSession}
        />
      </div>
    
    </div>
  );
}

export default App;
