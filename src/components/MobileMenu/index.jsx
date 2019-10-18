import React, {
  useEffect, Fragment, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Close } from '@material-ui/icons';

import './MobileMenu.scss';
import lang from '../../helpers/en.default';
import { history } from '../../helpers/utils';
import Logo from '../Logo/index';
import Button from '../Button';

const FADE_IN = 'fade-in';
const NAV_ITEM_CLICK_TIMEOUT = 300;

const MobileMenu = (props) => {
  const {
    match: { path }, unreadNotificationsCount, showMenu,
    handleCreateEventBtnClick, handleCloseMobileMenu,
    handleSettingsTabClick, settingsModalIsVisible,
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
    handleCloseMobileMenu();
    const timer = setTimeout(() => {
      history.push(link);
      clearTimeout(timer);
    }, NAV_ITEM_CLICK_TIMEOUT);
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
    const isSettings = (title.toLowerCase() === lang.layoutSideNav.settings.title.toLowerCase());
    const navItemClassName = ((isSettings && settingsModalIsVisible)
      || (link && link.toLowerCase() === path.toLowerCase()))
      ? 'nav-item active' : 'nav-item';

    const handleClick = isSettings ? handleSettingsTabClick : () => handleNavItemClick(link);

    return (
      <div key={index} className={navItemClassName} onClick={handleClick}>
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
    <div className={`up-mobile-menu__overlay ${showMenu ? fadeIn : ''}`}>
      <div className={`up-mobile-menu ${showMenu ? fadeIn : ''}`}>
        <div className="up-mobile-menu__close-btn" onClick={handleCloseMobileMenu}>
          <Close />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  match: PropTypes.object.isRequired,
  unreadNotificationsCount: PropTypes.number,
  handleCreateEventBtnClick: PropTypes.func.isRequired,
  handleCloseMobileMenu: PropTypes.func.isRequired,
  handleSettingsTabClick: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  settingsModalIsVisible: PropTypes.bool.isRequired,
};

MobileMenu.defaultProps = {
  unreadNotificationsCount: 0,
};

export default MobileMenu;
