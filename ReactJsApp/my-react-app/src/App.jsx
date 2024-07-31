// import Clock from './Clock'
import {useEffect} from 'react'
import Greeting from "./UserGreeting";
import Fruit from './fruit.jsx'
import TestButton from './Button.jsx'
import Watch from './StopWatch.jsx'
function App() {
  useEffect(() => {
    fetch("http://localhost:3000/courses/advanced")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const fruits=[{name:'apple',calories:45},{name:'banana',calories:40},{name:'pineapple',calories:199}];
  return(
    <>
    <Greeting isAllowed={true} username='Thai'/>
    <Greeting></Greeting>
    {(fruits.length>0)&&<Fruit items={fruits} category="Fruit"/>}
    <TestButton name="Thai" age={10}/>
    <Watch></Watch>
    </>
  );
}

export default App
