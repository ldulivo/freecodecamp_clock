import { useState, useEffect } from "react";
import Length from "./Components/Length";
import Timer from "./Components/Timer";

let hour = new Date().getTime
console.log();

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  //const [timeLeftHours, setTimeLeft] = useState('25');
  const [timeLeftMinutes, setTimeLeftMinutes] = useState('00');

  useEffect(() => {
    if (sessionLength < 0) setSessionLength(0);
    if (sessionLength > 60) setSessionLength(60);
  }, [sessionLength])
  

  return (
    <div className="App">
      <div className="container">
        <Length 
          breakLength={breakLength} 
          sessionLength={sessionLength} 
          setBreakLength={setBreakLength} 
          setSessionLength={setSessionLength}
        />
        <Timer timeLeftHours={sessionLength} timeLeftMinutes={timeLeftMinutes} />
      </div>
    
    </div>
  );
}

export default App;
