import React, { useEffect } from 'react';
import './features.css';
import { FaChartLine, FaUsers, FaCalendarAlt, FaComments, FaCircle } from 'react-icons/fa';

const Features = () => {
  useEffect(() => {
    document.body.classList.remove('login');
}, []);
  return (
    <>
      {/* Assurez-vous que la Navbar est rendue avant ceci */}
      <div className="section-title">
        <h2>Features</h2>
      </div>
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <Feature 
              icon={<FaChartLine />}
              title="Analytics"
              description="Track performance metrics and gain insights into your social media activity."
            />
            <Feature 
              icon={<FaUsers />}
              title="Reporting"
              description="Generate customizable reports to measure your social media success."
            />
            <Feature 
              icon={<FaCalendarAlt />}
              title="Content Planning"
              description="Plan and schedule your social media content in advance."
            />
            <Feature 
              icon={<FaComments />}
              title="Community Management"
              description="Manage all your social media interactions in one centralized inbox."
            />
            <Feature 
              icon={<FaCircle />}
              title="Social Listening"
              description="Monitor conversations and trends across social media platforms."
            />
          </div>
        </div>
      </section>
    </>
  );
}

const Feature = ({ icon, title, description }) => {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default Features;