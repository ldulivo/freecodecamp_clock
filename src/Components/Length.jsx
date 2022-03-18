import Up from "./svg/Up";
import Down from "./svg/Down";

export default function Length({ breakLength, sessionLength, setBreakLength, setSessionLength }) {
  return (
    <div className="length">
      <section>
        <div id="break-label">Break Length</div>
        <div className="control--buttons">
            <button id="break-decrement" onClick={ () => setBreakLength(breakLength - 1)} >
                <Down />
            </button>
            <button id="break-increment" onClick={ () => setBreakLength(breakLength + 1)} >
                <Up />
            </button>
        </div>
        <div id="break-length">{breakLength}</div>
      </section>

      <section>
        <div id="session-label">Session Length</div>
        <div className="control--buttons">
            <button id="session-decrement" onClick={ () => setSessionLength(sessionLength - 1)} >
                <Down />
            </button>
            <button id="session-increment" onClick={ () => setSessionLength(sessionLength - 1)} >
                <Up />
            </button>
        </div>
        <div id="session-length">{sessionLength}</div>
      </section>
    </div>
  )
}
