import { useState, useEffect } from 'react'
import axios from 'axios';
import './index.css'
function ToDo() {
    const [items, setItems] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTask,setEditTask]=useState('')
    const [taskToEdit, setTaskToEdit] = useState(null);
    const handleAddTask = async () => {
        try {
            if (newTask.trim() === '') {
                return;
            }
            const res= await axios.post('http://localhost:3000/add',{name:newTask})
            setItems([...items,res.data])
            console.log(res.data)
        } catch (err) {
            console.log(err)    
        }
    }
    const handleDeleteTask= async(id)=>{
        try{
            await axios.delete(`http://localhost:3000/delete/${id}`)
            setItems(items.filter((item)=>item._id!=id))
        }catch (err){
            console.log(err)
        }
    }
    const handleUpdateTask=async(id)=>{
        try{
            await axios.put(`http://localhost:3000/update/${id}`,{name:editTask})
        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get('http://localhost:3000/list')
                setItems(res.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        getList()
    }, [])
    return (
        <>
            <h1 className='header'>To Do Application</h1>
            <div className="container">
                <div id="new-task">
                    <input onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="Enter The Task Here..." />
                    <button onClick={handleAddTask} id="push">Add</button>
                </div>
                <div id="tasks">
                    {
                        items.map((e) =>
                        (<div key={e._id} className="task" >
                            <input type='text' onChange={(e)=>setEditTask(e.target.value)} value={(e._id==taskToEdit)?editTask:e.name} disabled={taskToEdit!==e._id} ></input>
                            <button className="edit" onClick={()=>{
                                if(e._id==taskToEdit){
                                    handleUpdateTask(e._id)
                                }
                                else{                                 
                                    setTaskToEdit(e._id);
                                    setEditTask(e.name);
                                }
                                }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onClick={()=>{handleDeleteTask(e._id)}} className="delete">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>))
                    }

                </div>
            </div>
        </>
    );
}

export default ToDo;
