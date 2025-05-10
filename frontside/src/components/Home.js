import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <h1>河南省井盖回收处理有限公司</h1>
                <p className="subtitle">专业的井盖回收与处理服务</p>
                <div className="cta-buttons">
                    <Link to="/products" className="button primary-button">
                        浏览产品
                    </Link>
                    <Link to="/contact" className="button secondary-button">
                        联系我们
                    </Link>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h3>专业服务</h3>
                    <p>20年井盖回收经验，专业团队为您服务</p>
                </div>
                <div className="feature-card">
                    <h3>安全环保</h3>
                    <p>符合环保标准，确保安全回收处理</p>
                </div>
                <div className="feature-card">
                    <h3>快速响应</h3>
                    <p>24小时服务热线，快速上门回收</p>
                </div>
            </div>

            <div className="about-preview">
                <h2>关于我们</h2>
                <p>我们是河南省领先的井盖回收处理企业，致力于提供专业、环保、高效的服务。</p>
                <Link to="/about" className="learn-more">
                    了解更多 →
                </Link>
            </div>
        </div>
    );
};

export default Home;