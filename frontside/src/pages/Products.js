import React from 'react';
import '../styles/components.css';

const Products = () => {
    const services = [
        {
            id: 1,
            title: '井盖回收',
            description: '专业回收各类废旧井盖，包括铸铁井盖、钢制井盖等',
            features: [
                '24小时上门回收',
                '专业评估定价',
                '现场称重结算',
                '环保处理保证'
            ]
        },
        {
            id: 2,
            title: '井盖更换',
            description: '提供新型环保井盖更换服务，确保安全与美观',
            features: [
                '多种材质可选',
                '专业安装团队',
                '质量保证',
                '定期维护'
            ]
        },
        {
            id: 3,
            title: '废金属处理',
            description: '专业处理各类废旧金属，实现资源循环利用',
            features: [
                '环保处理流程',
                '资质齐全',
                '保密销毁',
                '循环再利用'
            ]
        },
        {
            id: 4,
            title: '应急维修',
            description: '提供24小时井盖维修服务，保障道路安全',
            features: [
                '快速响应',
                '临时防护措施',
                '专业维修团队',
                '安全保障'
            ]
        }
    ];

    return (
        <div className="products-page">
            <div className="products-hero">
                <h1>产品服务</h1>
                <p>专业的井盖回收与处理解决方案</p>
            </div>

            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <ul className="service-features">
                            {service.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button className="service-button">
                            了解更多
                        </button>
                    </div>
                ))}
            </div>

            <div className="service-process">
                <h2>服务流程</h2>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h4>联系我们</h4>
                        <p>电话或在线预约服务</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h4>现场评估</h4>
                        <p>专业人员上门评估</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h4>签订协议</h4>
                        <p>确定服务内容和价格</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h4>完成服务</h4>
                        <p>专业团队完成服务</p>
                    </div>
                </div>
            </div>

            <div className="contact-section">
                <h2>联系我们获取报价</h2>
                <p>24小时服务热线：0371-12345678</p>
                <button className="contact-button">
                    立即咨询
                </button>
            </div>
        </div>
    );
};

export default Products;