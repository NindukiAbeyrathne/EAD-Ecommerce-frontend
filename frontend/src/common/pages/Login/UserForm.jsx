import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/images/Logo_b.jpeg";
import cartimg2 from "../../assets/images/blush.avif";

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  const { isLoggedIn, role, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    console.log('Effect ran:', { isLoggedIn, role, location: location.pathname });

    if (isLoggedIn && role) {
      console.log("Navigating based on role:", role);
      
      let targetPath = '/';
      switch (role) {
        case 'Administrator':
          targetPath = '/admin/dashboard';
          break;
        case 'Vendor':
          targetPath = '/vendor/dashboard';
          break;
        case 'CSR':
          targetPath = '/csr/dashboard';
          break;
        default:
          targetPath = '/';
      }

      // Only navigate if the current path is not the target path and not already navigating
      if (location.pathname !== targetPath && prevPath !== targetPath) {
        console.log("Navigating to:", targetPath);
        navigate(targetPath);
        setPrevPath(targetPath); // Update prevPath to the target
      }
    }
  }, [isLoggedIn, role, navigate, location.pathname]);

  return (
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center vh-100 p-0">
      <div className="w-100" style={{ backgroundColor: '#FFE5ED', height: '40px' }}></div>
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card d-flex flex-row" style={{ width: '1000px', backgroundColor: '#FFFFFF' }}>
          <div className="col-md-6 p-4">
            <div className="text-center mb-4">
              <img src={logo} alt="Company Logo" className="mb-3" style={{ width: '300px' }} />
              <h2 className="form-heading" style={{fontFamily:"cursive"}}>Login to Your Account</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>

            {error && <p className="alert alert-danger mt-3">{error}</p>}

            <div className="text-center mt-3">
              {/* <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> */}
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-4" style={{ backgroundColor: '#FFE5ED', color: 'white' }}>
            <h3 style={{ color: 'black', fontStyle: 'oblique' ,fontFamily:"cursive", textAlign: 'center'}}>WE ARE MORE THAN YOU THINK..</h3><br/>
            <img src={cartimg2} alt="Company Logo" className="mb-3" style={{ width: "410px", height: "450px" }} /><br/>
            <p style={{ color: 'black', fontSize: '100%', fontStyle: 'oblique' ,fontFamily:"cursive" }}>
              Discover a wide range of products and enjoy a seamless shopping experience.
              Our application offers personalized recommendations, easy navigation, and secure payments.
              Join us and start exploring the best deals available just for you.
            </p>
          </div>
        </div>
      </div>
      <div className="w-100" style={{ backgroundColor: '#FFE5ED', height: '30px' }}></div>
    </div>
  );
};

export default UserForm;
