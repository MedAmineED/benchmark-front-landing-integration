import React, { useEffect } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import analysisImage from '../../assets/analytics.avif';
import managementImage from '../../assets/management.avif';
import marketingImage from '../../assets/marketing.jpg';

const LandingPage = () => {

    useEffect(() => {
        document.body.classList.remove('login');
    }, []);
    return (
        <div className="landingPage">
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">Welcome to 360° MarkBanch</h1>
                    <p className="header-description">Manage your online presence easily</p>
                    <div className="cta-buttons">
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                    </div>
                </div>
            </header>
            <section className="features">
                <div className="feature">
                    <img src={analysisImage} alt="Analysis" className="feature-image" />
                    <h2 className="feature-title">Analysis in real time</h2>
                    <p className="feature-description">Get accurate, up-to-date data on your online performance</p>
                </div>
                <div className="feature">
                    <img src={managementImage} alt="Management" className="feature-image" />
                    <h2 className="feature-title">Easy management</h2>
                    <p className="feature-description">Manage all your social accounts and channels from a single platform.</p>
                </div>
                <div className="feature">
                    <img src={marketingImage} alt="Marketing" className="feature-image" />
                    <h2 className="feature-title">Marketing integration</h2>
                    <p className="feature-description">Create, plan and publish marketing campaigns in just a few clicks.</p>
                </div>
            </section>
            <section className="testimonial">
                <div className="testimonial-content">
                    <p className="testimonial-text">The ultimate benchmarking tool for optimizing your marketing strategy.</p>
                </div>
            </section>
            <section className="footer">
                <p className="footer-text">"Benchmarking is not an end in itself, but a means of achieving excellence by drawing inspiration from best practices and identifying opportunities for improvement."</p>
            </section>
        </div>
    );
};

export default LandingPage;