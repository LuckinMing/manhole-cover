import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import classNames from 'classnames';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

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
        <nav className={classNames(
            'fixed w-full z-50 transition-all duration-300',
            isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        )}>
            <div className="container-custom">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">河南省井盖回收</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={classNames(
                            'nav-link',
                            location.pathname === '/' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        )}>首页</Link>
                        <Link to="/products" className={classNames(
                            'nav-link',
                            location.pathname === '/products' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        )}>产品</Link>
                        <Link to="/about" className={classNames(
                            'nav-link',
                            location.pathname === '/about' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        )}>关于我们</Link>
                        <Link to="/contact" className={classNames(
                            'nav-link',
                            location.pathname === '/contact' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        )}>联系我们</Link>
                        
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="btn-secondary">个人中心</Link>
                                <button onClick={logout} className="btn-primary">
                                    退出
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="btn-secondary">登录</Link>
                                <Link to="/register" className="btn-primary">注册</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={classNames(
                    'md:hidden',
                    isMobileMenuOpen ? 'block' : 'hidden'
                )}>
                    <div className="py-2 space-y-2">
                        <Link to="/"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >首页</Link>
                        <Link to="/products"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >产品</Link>
                        <Link to="/about"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >关于我们</Link>
                        <Link to="/contact"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >联系我们</Link>
                        
                        {user ? (
                            <>
                                <Link to="/profile"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >个人中心</Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >退出</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >登录</Link>
                                <Link to="/register"
                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >注册</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;