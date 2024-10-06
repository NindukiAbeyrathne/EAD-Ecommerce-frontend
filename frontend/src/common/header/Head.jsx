import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import './Head.css'; // Make sure you have CSS for styling
import logo from '../assets/images/logo.jpg'; 

const Head = () => {
  // State for the welcome message
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const completeMessage = "Welcome to Bella Vie"; // Full welcome message
  const [index, setIndex] = useState(0); // Index for the current character

  useEffect(() => {
    // Check if the user is logged in before starting the message
    // Assuming you have a method to check if the user is logged in, e.g., via Redux state
    const isLoggedIn = true; // Replace with actual login check

    if (isLoggedIn) {
      // Set an interval to update the welcome message
      const interval = setInterval(() => {
        if (index < completeMessage.length) {
          setWelcomeMessage((prev) => prev + completeMessage[index]);
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(interval); // Clear interval when done
        }
      }, 100); // Change the interval time to adjust typing speed

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [index]); // Dependency array includes index

  return (
    <div>
      <section className='head'>
        {/* Logo */}
        <div className='logo'>
          <img src={logo} alt='Organization Logo' /> {/* Organization Logo */}
        </div>
        
        {/* Welcome Message */}
        <div className='welcome-message'>
          {welcomeMessage} {/* Display the welcome message */}
        </div>
      </section>
    </div>
  );
};

export default Head;
