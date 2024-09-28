import React from "react";
import "./footer.css"; // Make sure you have a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-sections">
          {/* Contact Information */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>
              <i className="fa fa-phone"></i> +94774789444
            </p>
            <p>
              <i className="fa fa-envelope"></i> support@ui-lib.com
            </p>
          </div>

          {/* Support & FAQ */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/support">Customer Support</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>&copy; 2024 Your Organization. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
