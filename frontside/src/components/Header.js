import React from 'react';
import { Link } from 'react-router-dom';
import './styles/components.css';

const Header = () => {
    return (
        <header className="header">
            <h1 className="logo">公司名称</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/about">关于我们</Link></li>
                    <li><Link to="/products">产品</Link></li>
                    <li><Link to="/contact">联系我们</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;