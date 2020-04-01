import React from 'react';
import { Link } from 'react-router-dom';

 const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">BriefHub</h1>
                <p className="lead">
                    Platform to share your knowledge and gain knowledge, share your experience and gain experience, motivate others and gain motivation. 
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;