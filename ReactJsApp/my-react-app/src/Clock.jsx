import { useEffect, useState } from "react";

function Clock(){
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        console.log("Mounting")
        const interval=setInterval(()=>{
            setTime(new Date());
        },1000)
        return ()=>{
            clearInterval(interval)
            console.log("Unmounting")
        }
    },[])
    const timeTest=()=>{
        const hours=time.getHours();
        const minutes=time.getMinutes();
        const seconds=time.getSeconds();
        return `${hours}:${minutes}:${seconds}`
    }
    return(
        <div className="clock-container">
            <div className="clock">
                <span>{timeTest()}</span>
            </div>
        </div>
    )
}
export default Clock;