import { useRef, useState, useEffect } from 'react';

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapseTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef();
    const startTimeRef = useRef(0);
    useEffect(() => {
        if(isRunning){
            intervalIdRef.current=setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            },10)
        }
        return ()=>{
            clearInterval(intervalIdRef.current);
        }
    }, [ isRunning ])
    function start() {
        setIsRunning(true);
        startTimeRef.current=Date.now()-elapseTime
    }
    function stop() {
        setIsRunning(false)
    }
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime() {
        let hours=Math.floor(elapseTime/(1000*60*60))
        let minutes=Math.floor(elapseTime/(1000*60)%60)
        let seconds=Math.floor(elapseTime/1000%60)
        return `${hours}:${minutes}:${seconds}`
    }
    return (
        <div className="stopWatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch;
