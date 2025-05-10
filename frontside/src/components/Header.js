import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <Link to="/" className="logo">
                    <h1>河南省井盖回收</h1>
                </Link>
                
                <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link 
                                to="/" 
                                className={location.pathname === '/' ? 'active' : ''}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                首页
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className={location.pathname === '/about' ? 'active' : ''}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                关于我们
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/products" 
                                className={location.pathname === '/products' ? 'active' : ''}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                产品服务
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                className={location.pathname === '/contact' ? 'active' : ''}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                联系我们
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/music" 
                                className={location.pathname === '/music' ? 'active' : ''}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                网易云音乐
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;