import { Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Login';
import ToDo from './ToDo';
import PrivateRoute from './PrivateRoute';
import Cookies from 'js-cookie';
import axios from 'axios';
import {  useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the user ID from the cookie or another source if needed
        const userId = Cookies.get('userId'); // Ensure you have userId stored in cookies or another mechanism

        if (userId) {
          const response = await axios.get(`http://localhost:3000/api/auth/find/${userId}`, {
            withCredentials: true, // Ensure cookies are sent
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
      }
    };

    fetchUserData();
  }, [setUser]);
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={
          <PrivateRoute>
            <ToDo />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
export default App