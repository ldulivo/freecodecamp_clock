import { useState, useEffect, useRef } from "react";
import Length from "./Components/Length";

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const beepRef = useRef();

  return (
    <div className="App">
      <div className="container">
        <Length
          breakLength={breakLength}
          setBreakLength={setBreakLength}
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          beepRef={beepRef}
        />
        <audio 
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
          preload="auto"
          ref={beepRef}
        ></audio>
      </div>
    
    </div>
  );
}

export default App;
