import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Layout.scss';
import Logo from '../Logo';
import lang from '../../helpers/en.default';

import { history } from '../../helpers/utils';

const Layout = (props) => {
  const {
    children, leftContainerStyles,
    centerContainerStyles, rightContainerStyles,
  } = props;

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
      <div key={index} className="nav-item" onClick={() => history.push(link)}>
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

  return (
    <div className="layout">
      <div className="layout-container">
        <div className="layout__content-leftside" style={leftContainerStyles}>
          <div className="content">
            <div className="layout__logo">
              <Logo customStyles={logoStyles} />
            </div>
            <div className="side__nav">
              {renderSideNavItems()}
            </div>
          </div>
        </div>
        <div className="layout__content-center" style={centerContainerStyles}>
          {children}
        </div>
        <div className="layout__content-rightside" style={rightContainerStyles}>
          <div className="content" />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  leftContainerStyles: PropTypes.object,
  centerContainerStyles: PropTypes.object,
  rightContainerStyles: PropTypes.object,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
