import React from 'react';
import PropTypes from 'prop-types';

import './Tabs.scss';

const Tabs = (props) => {
  const { navItems, activeTitle } = props;

  const renderTabItem = (navItem, index) => {
    const navItemClassName = navItem.title.toLowerCase() === activeTitle.toLowerCase()
      ? 'tab__items-item active' : 'tab__items-item';

    return (
      <div key={index}
        className={navItemClassName}
        onClick={navItem.onClick}
      >
        {navItem.title}
      </div>
    );
  };

  const renderTabItems = () => (
    <div className="tab__items">
      {
        navItems.map((item, index) => renderTabItem(item, index))
      }
    </div>
  );

  return (
    <div id="tabs">
      {renderTabItems()}
    </div>
  );
};

Tabs.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  activeTitle: PropTypes.string,
};

Tabs.defaultProps = {
  activeTitle: '',
};

export default Tabs;
