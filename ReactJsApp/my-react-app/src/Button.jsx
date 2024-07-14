import PropTypes from 'prop-types'
import image from './assets/react.svg'
import { useState } from 'react';
function Button(props) {
    const [name, setName] = useState("Guess");
    const [age,setAge]=useState(0);
    const [payment, setPayment]=useState('Cash');
    const[isLogin,setIsLogin]= useState(false);
    const[radio,setRadio]=useState('');
    const[color,setColor]=useState("#fff");
    const clickTest = () => {
        console.log(`Click! by ${props.name}`);
        if(!isLogin){
            setName(props.name);
            setAge(props.age);
        }else{
            setName("Guess");
            setAge(0);
        }
        toggle();
    }
    const toggle=()=>{
        setIsLogin(!isLogin);
    }
    const paymentHandler=(e)=>{
        let value= e.target.value;
        setPayment(value);
    }
    const radioHandler=(e)=>{
        setRadio(e.target.value);
    }
    const colorHandler=(e)=>{
        setColor(e.target.value)
    }
    return (
        <>
            <p>name: {name}</p>
            <p>age: {age}</p>
            <button onClick={clickTest} >{isLogin ? "Logout" : "Login"}</button>
            <img src={image} alt="" />
            <br />
            <select defaultValue={payment} onChange={paymentHandler} name="method" id="method">
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Cash">Cash</option>
            </select>
            <br />
            <input value="watermelon" onChange={radioHandler} name='Skills' type="radio" />watermelon <br />
            <input value="banana" onChange={radioHandler} name='Skills' type="radio" />banana<br />
            <input value="pineapple" onChange={radioHandler} name='Skills' type="radio" />pineapple<br />
            <p></p>
            <p>You choose {payment} and {radio}</p>
            <input onChange={colorHandler} type="color" />
            <p>Color: {color}</p>
        </>
    )
}
Button.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
}
export default Button;