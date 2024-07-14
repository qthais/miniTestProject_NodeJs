import PropTypes from 'prop-types'
import {useState} from 'react'
function Fruit(props){
    const fruits=props.items
    const[items,setItems]=useState(fruits);
    const addFruit=()=>{
        let foodinput=document.querySelector('#foodAdded').value;
        setItems(i=>[...i,{name:foodinput}
        ]);
    }
    const removeFruit=(index)=>{
        setItems(i=>i.filter((_,key)=>key!==index))
    }
    return (
        <>
        <h3>{props.category}</h3>
        <ul>
            {items.map((item,index)=>
            <li onClick={()=>removeFruit(index)} key={index}>{item.name}: {item.calories}</li>
        )}
        </ul>
        <input id='foodAdded' type="text" />
        <button onClick={addFruit}>Add fruit</button>
        </>
    )
}
Fruit.propTypes={
    items: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number,
        name:PropTypes.string,
        calories:PropTypes.number
    })),
    category:PropTypes.string
}
Fruit.defaultProps={
    items:[],
    category:'category'
}
export default Fruit