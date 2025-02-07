import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <ul className="footer-icons">
                    <li><a href="#"><img src="" alt="Facebook" /><i className="facebook-icon"></i></a></li>
                    <li><a href="#"><img src="" alt="Discord" /><i className="discord-icon"></i></a></li>
                    <li><a href="#"><img src="" alt="Twitter" /><i className="twitter-icon"></i></a></li>
                    <li><a href="#"><img src="" alt="Threads" /><i className="threads-icon"></i></a></li>
                </ul>
                <p>© 2025 ABCXYZ. All Rights Reserved.</p>
                <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </footer>
    );
}

export default Footer;
