import React from "react";
import "./Footer.css";


const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <ul className="footer-icons">
                    <li><a href="#" aria-label="Facebook"><i className="facebook-icon">Facebook</i></a></li>
                    <li><a href="#" aria-label="Discord"><i className="discord-icon">Discord</i></a></li>
                    <li><a href="#" aria-label="Twitter"><i className="twitter-icon">Twitter</i></a></li>
                    <li><a href="#" aria-label="Threads"><i className="threads-icon">Threads</i></a></li>
                </ul>
                <div className="footer-text">
                    <span className="copyright">© 2025 ABCXYZ. All Rights Reserved.</span>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <span className="divider">|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
