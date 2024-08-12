import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const userId = Cookies.get('userId');
    if(userId){
      console.log(userId)
      setIsAuthenticated(true)
    }
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional loading state
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Changed to `node` to allow any renderable content
};

export default PrivateRoute;
