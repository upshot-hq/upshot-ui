import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

const NotFoundPage = () => (
    <div className="not-found-page">
        <h3>
            You seem to have lost your way... click <Link to="/home">here</Link>&nbsp;
            to go home!
        </h3>
    </div>
);

export default NotFoundPage;
