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


export const LayoutContext = createContext({
  setShowPostToEventModal: () => {},
  showPostToEventModal: false,
  setEvent: () => {},
  setShowPostToEventSearchBar: () => {},
});

const Layout = (props) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showPostToEventModal, setShowPostToEventModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [showPostToEventSearchBar, setShowPostToEventSearchBar] = useState(true);
  const notificationEngine = useRef(null);
  const {
    children, leftContainerStyles, match: { path },
    centerContainerStyles, rightContainerStyles,
    handleNewNotification, unreadNotificationsCount,
    userId, getUnreadNotificationCount,
  } = props;

  const logoStyles = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    margin: 0,
  };

  useEffect(() => {
    if (!notificationEngine.current) {
      notificationEngine.current = new SocketHandler(userId);
      notificationEngine.current.listen(newNotificationEvent, handleNewNotification);
    }
  }, [handleNewNotification, userId]);

  useEffect(() => {
    getUnreadNotificationCount();
  }, [getUnreadNotificationCount]);

  const handleEventModalClose = () => {
    setShowCreateEventModal(false);
  };

  const handlePostToEventModalClose = () => {
    setShowPostToEventModal(false);
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
      <div key={index} className={navItemClassName} onClick={() => history.push(link)}>
        <div className="icon">
          {renderNotificationCount(title)}
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

  const renderCreateEventModal = () => {
    setShowCreateEventModal(true);
  };

  const renderPostToEventModal = () => {
    setEvent(null);
    setShowPostToEventSearchBar(true);
    setShowPostToEventModal(true);
  };

  const renderLayout = () => (
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
          {Children.only(children)}
        </div>
        <div className="layout__content-rightside" style={rightContainerStyles}>
          <div className="content" />
        </div>
      </div>
      <Fab onClickFunction={renderCreateEventModal} />
      <Fab
        onClickFunction={renderPostToEventModal}
        styles={{ bottom: '9.375rem' }}
        name="camera"
      />
      <Modal showClosePrompt isModalVisible={showCreateEventModal}
        handleModalClose={handleEventModalClose}>
        <CreateEvent handleModalClose={handleEventModalClose} />
      </Modal>
      <Modal showClosePrompt isModalVisible={showPostToEventModal}
        handleModalClose={handlePostToEventModalClose}
      >
        <PostToEvent
          handleModalClose={handlePostToEventModalClose}
          event={event}
          showSearchBar={showPostToEventSearchBar}
          showEventRemoveBtn={!event}
        />
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
