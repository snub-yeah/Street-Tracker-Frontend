import React, { useEffect } from 'react';
import './Styles/MatchNotification.css';

const MatchNotification = ({ isVisible, onHide }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    return (
        <div className={`match-notification ${isVisible ? 'show' : ''}`}>
            <div className="notification-content">
                <span>Successfully added match!</span>
            </div>
            <div className="progress-bar" key={isVisible ? 1 : 0} />
        </div>
    );
};

export default MatchNotification;
