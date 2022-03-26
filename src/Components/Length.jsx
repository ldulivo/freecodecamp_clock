import Up from "./svg/Up";
import Down from "./svg/Down";
import Timer from './Timer';
import { useState } from "react";

export default function Length({
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    beepRef
}) {

    const [reset, setReset] = useState(false)

    const breakControl = (op) => {
        if ( (breakLength >= 2 && op < 0) || (breakLength <= 59 && op > 0) ) {
            setBreakLength(breakLength + op);
        }
    }

    const sessionControl = (op) => {
        if ( (sessionLength >= 2 && op < 0) || (sessionLength <= 59 && op > 0) ) {
            setSessionLength(sessionLength + op);
        }
    }


  return (
    <div className="length">
        <div>
            <section>
                <div id="break-label">Break Length</div>
                <div className="control--buttons">
                    <button id="break-decrement" onClick={ () => breakControl(-1)} >
                        <Down />
                    </button>
                    <button id="break-increment" onClick={ () => breakControl(1)} >
                        <Up />
                    </button>
                </div>
                <div id="break-length">{breakLength}</div>
            </section>

            <section>
                <div id="session-label">Session Length</div>
                <div className="control--buttons">
                    <button id="session-decrement" onClick={ () => sessionControl(-1)} >
                        <Down />
                    </button>
                    <button id="session-increment" onClick={ () => sessionControl(1)} >
                        <Up />
                    </button>
                </div>
                <div id="session-length">{sessionLength}</div>
            </section>
        </div>

        <div>
        <Timer
            breakLength={breakLength}
            minutes={sessionLength}
            reset={reset}
            setReset={setReset}
            setBreakLength={setBreakLength}
            setSessionLength={setSessionLength}
            beepRef={beepRef}
        />
        </div>
      
    </div>
  )
}
