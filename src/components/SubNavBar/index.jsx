import React from 'react';
import PropTypes from 'prop-types';

import './SubNavBar.scss';

const SubNavBar = (props) => {
  const { navItems } = props;

  const renderNavItem = (navItem, index) => (
    <div key={index}
      className="nav__items-item"
      onClick={navItem.onClick}
    >
      {navItem.title}
    </div>
  );

  const renderNavItems = () => (
    <div className="nav__items">
      {
        navItems.map((item, index) => renderNavItem(item, index))
      }
    </div>
  );

  return (
    <div id="sub-nav-bar">
      {renderNavItems()}
    </div>
  );
};

SubNavBar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

export default SubNavBar;
