import React, {
  useEffect, Fragment, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './MobileMenu.scss';
import lang from '../../helpers/en.default';
import { history } from '../../helpers/utils';
import Logo from '../Logo/index';
import Button from '../Button';

const FADE_IN = 'fade-in';

const MobileMenu = (props) => {
  const {
    match: { path }, unreadNotificationsCount,
    handleCreateEventBtnClick, handleCloseMobileMenuModal,
  } = props;
  const [fadeIn, setFadeIn] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setFadeIn(FADE_IN);
      isInitialMount.current = false;
    }

    return () => {
      setFadeIn('');
    };
  }, [setFadeIn, isInitialMount]);

  const handleNavItemClick = (link) => {
    handleCloseMobileMenuModal();
    history.push(link);
  };

  const renderNotificationCount = (navItemTitle) => {
    const { notification: { title: notificationTitle } } = lang.layoutSideNav;
    return (
      <Fragment>
        {(!!unreadNotificationsCount && navItemTitle === notificationTitle)
          && <div className="notification-count">{unreadNotificationsCount}</div>}
      </Fragment>
    );
  };

  const renderSideNavItem = (navItem, index) => {
    const { title, icon, link } = lang.layoutSideNav[navItem];
    const navItemClassName = (link.toLowerCase() === path.toLowerCase())
      ? 'nav-item active' : 'nav-item';

    return (
      <div key={index} className={navItemClassName} onClick={() => handleNavItemClick(link)}>
        <div className="icon">
          {renderNotificationCount(title)}
          <FontAwesome
            key={index}
            name={icon.name}
            size={icon.size}
            className="iconSize"
          />
        </div>
        <div className="title">{title}</div>
      </div>
    );
  };

  const renderSideNavItems = () => {
    const navItems = Object.keys(lang.layoutSideNav);

    return (
      <div className="nav-items">
        {navItems.map((navItem, index) => renderSideNavItem(navItem, index))}

        <Button
          title={lang.mobileMenu.creatEventText}
          handleClick={handleCreateEventBtnClick}
          customClassName="create-event-btn"
        />
      </div>
    );
  };

  const renderContent = () => (
    <div className="mobile-menu__content">
      <div className="mobile-menu__logo">
        <Logo customClassName="mobileLogo" />
      </div>
      <div className="mobile-menu__nav">
        {renderSideNavItems()}
      </div>
    </div>
  );

  return (
    <div className={`up-mobile-menu ${fadeIn}`}>
      {renderContent()}
    </div>
  );
};

MobileMenu.propTypes = {
  match: PropTypes.object.isRequired,
  unreadNotificationsCount: PropTypes.number,
  handleCreateEventBtnClick: PropTypes.func.isRequired,
  handleCloseMobileMenuModal: PropTypes.func.isRequired,
};

MobileMenu.defaultProps = {
  unreadNotificationsCount: 0,
};

export default MobileMenu;
