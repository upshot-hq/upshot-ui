import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';
import lang from '../../helpers/en.default';
import Logo from '../../components/Logo';

const NotFoundPage = () => (
  <div className="not-found-page">
    <div className="logo">
    	<Logo customClassName="not-found-page__logo" />
    </div>
    <div className="content">
      <h3>
				You seem to have lost your way... click&nbsp;
        <Link to={lang.layoutSideNav.home.link}>here</Link>&nbsp;
				to go home!
      </h3>
    </div>
  </div>
);

export default NotFoundPage;
