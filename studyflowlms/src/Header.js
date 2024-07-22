import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
  const { userRole, setUserRole } = useContext(UserContext);

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div>
      <header>
        <h1>StudyFlow LMS</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        {userRole ? (
          <>
            {userRole === 'student' && <Link to="/student">Dashboard</Link>}
            {userRole === 'instructor' && <Link to="/instructor">Dashboard</Link>}
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Header;
