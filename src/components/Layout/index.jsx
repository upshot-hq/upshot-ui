import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Layout.scss';
import Logo from '../Logo';
import lang from '../../helpers/en.default';

import { history } from '../../helpers/utils';

const Layout = (props) => {
  const { children } = props;
  const logoStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    margin: 0,
  };

  const renderSideNavItem = (navItem, index) => {
    const { title, icon, link } = lang.layoutSideNav[navItem];

    return (
      <div className="nav-item" onClick={() => history.push(link)}>
        <div className="icon">
          <FontAwesome
            key={index}
            name={icon.name}
            size={icon.size}
            style={{ fontSize: '25px' }}
          />
        </div>
        <div className="title">{title}</div>
      </div>
    );
  };

  const renderSideNavItems = () => {
    const navItems = Object.keys(lang.layoutSideNav);

    return (
      <div className="side__nav-items">
        {navItems.map((navItem, index) => renderSideNavItem(navItem, index))}
      </div>
    );
  };

  const renderSearchBar = () => (
      <div className="searchbar">
         <div className="icon back-btn">
          <FontAwesome name="arrow-left" />
         </div>
         <div className="bar">
           <div className="search-icon">
            <FontAwesome name="search" />
           </div>
           <input type="text" name="search" className="search-input"/>
         </div>
         <div className="icon options-btn">
           <FontAwesome name="ellipsis-h" />
         </div>
      </div>
  );

  return (
    <div className="layout">
      <div className="layout-container">
        <div className="layout__content-leftside">
          <div className="content">
            <div className="layout__logo">
              <Logo customStyles={logoStyles} />
            </div>
            <div className="side__nav">
              {renderSideNavItems()}
            </div>
          </div>
        </div>
        <div className="layout__content-center">
          <div className="header">
            <div className="top">
              {renderSearchBar()}
            </div>
            <div className="bottom">
              <div className="nav__items">
                <div className="nav__items-item">Top</div>
                <div className="nav__items-item">latest</div>
                <div className="nav__items-item">people</div>
                <div className="nav__items-item">photos</div>
                <div className="nav__items-item">videos</div>
              </div>
            </div>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
        <div className="layout__content-rightside">
          <div className="content" />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
