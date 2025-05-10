import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>河南省井盖回收处理有限公司</h3>
                    <p>专业的井盖回收与处理服务提供商</p>
                    <p className="contact-info">
                        <strong>24小时服务热线：</strong> 0371-12345678
                    </p>
                </div>
                
                <div className="footer-section">
                    <h4>快速链接</h4>
                    <ul className="footer-links">
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/about">关于我们</Link></li>
                        <li><Link to="/products">产品服务</Link></li>
                        <li><Link to="/contact">联系我们</Link></li>
                        <li><Link to="/music">网易云音乐</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>联系方式</h4>
                    <ul className="contact-list">
                        <li>地址：河南省郑州市金水区文化路78号</li>
                        <li>电话：0371-12345678</li>
                        <li>邮箱：contact@manhole-cover.com</li>
                        <li>工作时间：24小时服务</li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>关注我们</h4>
                    <div className="social-links">
                        <a href="#" target="_blank" rel="noopener noreferrer">微信</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">微博</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">抖音</a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} 河南省井盖回收处理有限公司 版权所有</p>
                <p>ICP备案号：豫ICP备12345678号-1</p>
            </div>
        </footer>
    );
};

export default Footer;