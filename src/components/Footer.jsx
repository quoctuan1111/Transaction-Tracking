import React from "react";
import "./Footer.css";
import { FaFacebookF, FaDiscord, FaTwitter, FaTh } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <ul className="footer-icons">
                    <li><a href="#" aria-label="Facebook"><FaFacebookF className="facebook-icon" /> Facebook</a></li>
                    <li><a href="#" aria-label="Discord"><FaDiscord className="discord-icon" /> Discord</a></li>
                    <li><a href="#" aria-label="Twitter"><FaTwitter className="twitter-icon" /> Twitter</a></li>
                    <li><a href="#" aria-label="Threads"><FaTh className="threads-icon" /> Threads</a></li>
                </ul>
                <div className="footer-text">
                    <span className="copyright">© 2025 ABCXYZ. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
