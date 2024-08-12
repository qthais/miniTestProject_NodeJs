import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserContext} from './UserContext'
import './login.css'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setUser}=useContext(UserContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            }, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user)
                navigate('/todo'); // Redirect to the Todo page
                
            } else {
                alert(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} action="">
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Login</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        name='username'
                        value={username}
                        placeholder="Enter your user here"
                        onChange={(e) => setUsername(e.target.value)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        name='password'
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(e) => setPassword(e.target.value)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <button className={'inputButton'} type="submit">Log in</button>
                </div>
            </div>
        </form>
    );
};

export default Login;
