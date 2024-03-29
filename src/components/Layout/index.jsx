import React, {
  useState, Children, useRef,
  createContext, useEffect, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Close, Dehaze } from '@material-ui/icons';

import './Layout.scss';
import Logo from '../Logo';
import lang from '../../helpers/en.default';
import Fab from '../Fab';
import Modal from '../../components/Modal/index';
import CreateEvent from '../CreateEvent';
import PostToEvent from '../PostToEvent';
import { history } from '../../helpers/utils';
import * as notificationActions from '../../redux/actionCreators/notificationActions';
import * as exploreActions from '../../redux/actionCreators/exploreActions';
import * as eventActions from '../../redux/actionCreators/eventActions';
import SocketHandler from '../../helpers/SocketHandler';
import { newNotificationEvent } from '../../helpers/defaults';
import MobileMenu from '../MobileMenu';
import Settings from '../Settings';
import UpcomingContent from '../UpcomingContent';

export const LayoutContext = createContext({
  setShowPostToEventModal: () => {},
  showPostToEventModal: false,
  setEvent: () => {},
  setShowPostToEventSearchBar: () => {},
});

const Layout = (props) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showPostToEventModal, setShowPostToEventModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMobileMenu, setShowMobileMenuModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [showPostToEventSearchBar, setShowPostToEventSearchBar] = useState(true);
  const notificationEngine = useRef(null);
  const {
    children, leftContainerStyles, match: { path },
    centerContainerStyles, rightContainerStyles,
    handleNewNotification, unreadNotificationsCount,
    userId, getUnreadNotificationCount, fetchUpcomingExploreContent,
    upcomingContent, pinEvent, isLoadingUpcomingContent,
    upcomingContentErrors, upcomingContentPagination,
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

  const handleOpenSettingsModal = () => {
    if (showMobileMenu) setShowMobileMenuModal(false);
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
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
    const isSettings = (title.toLowerCase() === lang.layoutSideNav.settings.title.toLowerCase());
    const navItemClassName = ((isSettings && showSettingsModal)
      || (link && link.toLowerCase() === path.toLowerCase()))
      ? 'nav-item active' : 'nav-item';

    const handleClick = isSettings ? handleOpenSettingsModal : () => history.push(link);

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
          <div className="content">
            <div className="content-header">{lang.layout.rightSide.title}</div>
            <div className="content-container">
              <UpcomingContent
                content={upcomingContent}
                contentErrors={upcomingContentErrors}
                contentPagination={upcomingContentPagination}
                isLoadingContent={isLoadingUpcomingContent}
                fetchUpcomingContent={fetchUpcomingExploreContent}
                pinEvent={pinEvent}
              />
            </div>
          </div>
          <div className="footer">
            <div className="footer-text">
              &#xa9; {lang.footerText}
            </div>
          </div>
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
        >
          {showMobileMenu
            ? <Close /> : <Dehaze />
          }
        </Fab>
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
        handleCreateEventBtnClick={handleOpenCreateEventModalMobile}
        handleCloseMobileMenu={handleCloseMobileMenu}
        showMenu={showMobileMenu}
        unreadNotificationsCount={unreadNotificationsCount}
        handleSettingsTabClick={handleOpenSettingsModal}
        settingsModalIsVisible={showSettingsModal}
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
        handleModalClose={handleCloseCreateEventModal}
        customContentClass="create-event-modal-content"
      >
        <CreateEvent handleModalClose={handleCloseCreateEventModal} />
      </Modal>

      <Modal isModalVisible={showSettingsModal}
        handleModalClose={handleCloseSettingsModal}
        customContentClass="settings-modal-content"
      >
        <Settings
          handleCloseSettings={handleCloseSettingsModal}
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
  fetchUpcomingExploreContent: PropTypes.func.isRequired,
  upcomingContent: PropTypes.array.isRequired,
  isLoadingUpcomingContent: PropTypes.bool.isRequired,
  upcomingContentPagination: PropTypes.object.isRequired,
  upcomingContentErrors: PropTypes.string.isRequired,
  pinEvent: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  children: null,
  unreadNotificationsCount: 0,
  userId: 0,
};

const mapStateToProps = ({ notification, auth, explore }) => ({
  unreadNotificationsCount: notification.unreadNotificationsCount,
  userId: auth.user.userData.id,
  upcomingContent: explore.upcoming.content,
  isLoadingUpcomingContent: explore.upcoming.isLoading,
  upcomingContentPagination: explore.upcoming.pagination,
  upcomingContentErrors: explore.upcoming.errors.message,
});

const mapDispatchToProps = {
  handleNewNotification: notificationActions.handleNewNotification,
  getUnreadNotificationCount: notificationActions.getUnreadNotificationCount,
  fetchUpcomingExploreContent: exploreActions.fetchUpcomingExploreContent,
  pinEvent: eventActions.pinEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
