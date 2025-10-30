import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="copyright">
                    © Biblioteca Digital - Eduardo Aroche 2025
                </div>
                <div className="social-icons">
                    <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label="Facebook"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    
                    <a 
                        href="https://x.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label="Twitter"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;