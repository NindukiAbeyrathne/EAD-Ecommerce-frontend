import React, { useState, useEffect } from 'react'; // Make sure to import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/images/logo.jpg";
import cartimg2 from "../../assets/images/cart2.webp";

const UserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, role, loading, error } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        
        if (isLoggedIn) {
            if (role === 'Administrator') {
                navigate('/admin/dashboard');
            } else if (role === 'Vendor') {
                navigate('/vendor/dashboard');
            } else if (role === 'CSR') {
                navigate('/csr/dashboard');
            }
        }
    }, [isLoggedIn, role, navigate]);

    return (
        <div className="container-fluid d-flex flex-column justify-content-between align-items-center vh-100 p-0">
            <div className="w-100" style={{ backgroundColor: '#0f3460', height: '40px' }}></div>
            <div className="container d-flex justify-content-center align-items-center flex-grow-1">
                <div className="card d-flex flex-row" style={{ width: '900px', backgroundColor: '#FAF9F6' }}>
                    <div className="col-md-6 p-4">
                        <div className="text-center mb-4">
                            <img src={logo} alt="Company Logo" className="mb-3" style={{ width: '150px' }} />
                            <h2 className="form-heading">Login to Your Account</h2>
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
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-4" style={{ backgroundColor: '#0f3460', color: 'white' }}>
                        <h3 style={{ color: 'white', fontFamily: '-moz-initial', textAlign: 'center' }}>WE ARE MORE THAN THE SHOPPING CART</h3><br />
                        <img src={cartimg2} alt="Company Logo" className="mb-3" style={{ width: "410px", height: "450px" }} /><br />
                        <p style={{ color: 'white', fontSize: '100%' }}>
                            Discover a wide range of products and enjoy a seamless shopping experience.
                            Our application offers personalized recommendations, easy navigation, and secure payments.
                            Join us and start exploring the best deals available just for you.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-100" style={{ backgroundColor: '#0f3460', height: '30px' }}></div>
        </div>
    );
};

export default UserForm;
