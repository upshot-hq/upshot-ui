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
import Modal from '../Modal';

const FADE_IN = 'fade-in';

const MobileMenu = (props) => {
  const {
    match: { path }, unreadNotificationsCount, handleCreateEventBtnClick,
    showMobileMenu, handleCloseMobileMenu,
  } = props;
  const [fadeIn, setFadeIn] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    if (fadeIn !== FADE_IN) {
      setFadeIn(FADE_IN);
    }

    return () => {
      setFadeIn('');
    };
  }, [setFadeIn, isInitialMount]);

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
      <div key={index} className={navItemClassName} onClick={() => history.push(link)}>
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
    <div className="up-mobile-menu">
      <Modal isModalVisible={showMobileMenu}
        handleModalClose={handleCloseMobileMenu}
        fullContentOnMobile>
        <div className={`up-mobile-menu__container ${fadeIn}`}>
          {renderContent()}
        </div>
      </Modal>
    </div>
  );
};

MobileMenu.propTypes = {
  match: PropTypes.object.isRequired,
  unreadNotificationsCount: PropTypes.number,
  handleCreateEventBtnClick: PropTypes.func.isRequired,
  handleCloseMobileMenu: PropTypes.func.isRequired,
  showMobileMenu: PropTypes.bool.isRequired,
};

MobileMenu.defaultProps = {
  unreadNotificationsCount: 0,
  showMobileMenu: false,
};

export default MobileMenu;
