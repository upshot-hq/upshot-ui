import React, {
  useState, Children, useRef,
  createContext, useEffect, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './Layout.scss';
import Logo from '../Logo';
import lang from '../../helpers/en.default';
import Fab from '../Fab';
import Modal from '../../components/Modal/index';
import CreateEvent from '../CreateEvent';
import PostToEvent from '../PostToEvent';
import { history } from '../../helpers/utils';
import * as notificationActions from '../../redux/actionCreators/notificationActions';
import SocketHandler from '../../helpers/SocketHandler';
import { newNotificationEvent } from '../../helpers/defaults';
import MobileMenu from '../MobileMenu';


export const LayoutContext = createContext({
  setShowPostToEventModal: () => {},
  showPostToEventModal: false,
  setEvent: () => {},
  setShowPostToEventSearchBar: () => {},
});

const Layout = (props) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showPostToEventModal, setShowPostToEventModal] = useState(false);
  const [showMobileMenu, setShowMobileMenuModal] = useState(true);
  const [event, setEvent] = useState(null);
  const [showPostToEventSearchBar, setShowPostToEventSearchBar] = useState(true);
  const notificationEngine = useRef(null);
  const {
    children, leftContainerStyles, match: { path },
    centerContainerStyles, rightContainerStyles,
    handleNewNotification, unreadNotificationsCount,
    userId, getUnreadNotificationCount,
  } = props;

  useEffect(() => {
    if (!notificationEngine.current) {
      notificationEngine.current = true;
      SocketHandler.init(userId);
      SocketHandler.listen(newNotificationEvent, handleNewNotification);
    }
  }, [handleNewNotification, userId]);

  useEffect(() => {
    getUnreadNotificationCount();
  }, [getUnreadNotificationCount]);

  const handleOpenCreateEventModal = () => {
    setShowCreateEventModal(true);
  };

  const handleOpenCreateEventModalMobile = () => {
    setShowMobileMenuModal(false);
    setShowCreateEventModal(true);
  };

  const handleCloseCreateEventModal = () => {
    setShowCreateEventModal(false);
  };

  const handleOpenPostToEventModal = () => {
    setEvent(null);
    setShowPostToEventSearchBar(true);
    setShowPostToEventModal(true);
  };

  const handleClosePostToEventModal = () => {
    setShowPostToEventModal(false);
  };

  const handleOpenMobileMenuModal = () => {
    setShowMobileMenuModal(true);
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenuModal(false);
  };

  const renderNotificationCount = (navItemTitle, extraClassName = '') => {
    const { notification: { title: notificationTitle } } = lang.layoutSideNav;
    return (
      <Fragment>
        {(!!unreadNotificationsCount && navItemTitle === notificationTitle)
          && <div className={`notification-count ${extraClassName}`}>
            {unreadNotificationsCount}
          </div>
        }
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
      <div className="side__nav-items">
        {navItems.map((navItem, index) => renderSideNavItem(navItem, index))}
      </div>
    );
  };

  const renderLayout = () => (
    <div className="layout">
      <div className="layout-container">
        <div className="layout__content-leftside" style={leftContainerStyles}>
          <div className="content">
            <div className="layout__logo">
              <Logo customClassName="layoutLogo" />
            </div>
            <div className="side__nav">
              {renderSideNavItems()}
            </div>
          </div>
        </div>
        <div className="layout__content-center" style={centerContainerStyles}>
          {Children.only(children)}
        </div>
        <div className="layout__content-rightside" style={rightContainerStyles}>
          <div className="content" />
        </div>
      </div>

      <Fragment>
        {!showMobileMenu && renderNotificationCount(
          lang.layoutSideNav.notification.title,
          'notification-count-mobile',
        )}
        <Fab
          onClickFunction={handleOpenMobileMenuModal}
          containerClassName="mobileMenuTrigger"
          name={showMobileMenu ? 'times' : 'bars'}
        />
      </Fragment>

      <Fab
        onClickFunction={handleOpenPostToEventModal}
        containerClassName="postToEventTrigger"
        name="camera"
      />
      <Fab
        onClickFunction={handleOpenCreateEventModal}
        containerClassName="createEventTrigger"
      />

      <MobileMenu match={props.match}
        showMobileMenu={showMobileMenu}
        handleCloseMobileMenu={handleCloseMobileMenu}
        handleCreateEventBtnClick={handleOpenCreateEventModalMobile}
      />

      <Modal showClosePrompt isModalVisible={showPostToEventModal}
        handleModalClose={handleClosePostToEventModal}
      >
        <PostToEvent
          handleModalClose={handleClosePostToEventModal}
          event={event}
          showSearchBar={showPostToEventSearchBar}
          showEventRemoveBtn={!event}
        />
      </Modal>
      <Modal showClosePrompt isModalVisible={showCreateEventModal}
        handleModalClose={handleCloseCreateEventModal}>
        <CreateEvent handleModalClose={handleCloseCreateEventModal} />
      </Modal>
    </div>
  );

  return (
    <LayoutContext.Provider
      value={{
        showPostToEventModal,
        setShowPostToEventModal,
        setEvent,
        setShowPostToEventSearchBar,
      }}
    >
      {renderLayout()}
    </LayoutContext.Provider>
  );
};

Layout.propTypes = {
  match: PropTypes.object.isRequired,
  children: PropTypes.node,
  leftContainerStyles: PropTypes.object,
  centerContainerStyles: PropTypes.object,
  rightContainerStyles: PropTypes.object,
  unreadNotificationsCount: PropTypes.number,
  userId: PropTypes.number,
  handleNewNotification: PropTypes.func.isRequired,
  getUnreadNotificationCount: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  children: null,
  unreadNotificationsCount: 0,
  userId: 0,
};

const mapStateToProps = ({ notification, auth }) => ({
  unreadNotificationsCount: notification.unreadNotificationsCount,
  userId: auth.user.userData.id,
});

const mapDispatchToProps = {
  handleNewNotification: notificationActions.handleNewNotification,
  getUnreadNotificationCount: notificationActions.getUnreadNotificationCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
