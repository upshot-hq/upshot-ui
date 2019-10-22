import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProfilePage.scss';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal/index';
import Button from '../../components/Button';
import lang from '../../helpers/en.default';
import { addStylesToHashTags, modifyCounts } from '../../helpers/utils';
import UserProfileForm from '../../components/UserProfileForm/index';
import Tabs from '../../components/Tabs';
import * as userActions from '../../redux/actionCreators/userActions';
import * as eventActions from '../../redux/actionCreators/eventActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import Events from './Events';
import Posts from './Posts';
import Bookmarks from './Bookmarks';
import { useIntersect } from '../../helpers/hooksUtils';
import Loader from '../../components/Loader/index';
import PageTitle from '../../components/PageTitle/index';


export const ProfilePage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const {
    user: { userData }, profileUpdateSuccess, match,
    likePost, dislikePost, bookmarkPost, posts,
    pinEvent, events, isLoading, getUserPosts,
    eventsPagination, postsPagination, getUserEvents,
    removeUserEvent, stats, userInfoIsLoading, getUserInfo,
    getUserBookmarks, bookmarks, bookmarksIsLoading,
    bookmarksPagination, removeUserBookmark,
  } = props;
  const { eventsTab, postsTab, bookmarksTab } = lang.profilePage.tabs;
  const [currentView, setCurrentView] = useState(eventsTab);
  const [showModal, setShowModal] = useState(false);
  const isInitialMount = useRef(true);
  const scrollTop = useRef(0);
  const [isTopBarVisible, setTopBarVisibility] = useState(true);

  useEffect(() => {
    if (isInitialMount.current) {
      getUserInfo();
      isInitialMount.current = false;
    } else if (profileUpdateSuccess) {
      setShowModal(false);
    }
  }, [profileUpdateSuccess, getUserInfo]);

  const tabItems = [
    {
      title: eventsTab,
      onClick: () => setCurrentView(eventsTab),

    },
    {
      title: postsTab,
      onClick: () => setCurrentView(postsTab),

    },
    {
      title: bookmarksTab,
      onClick: () => setCurrentView(bookmarksTab),
    },
  ];

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePin = (eventId, pin) => {
    pinEvent(eventId, pin);
    if (!pin) {
      removeUserEvent(userData.id, eventId);
    }
  };

  const handleLike = (postId, like) => {
    likePost(postId, like);
  };

  const handleDisLike = (postId, dislike) => {
    dislikePost(postId, dislike);
  };

  const handleBookmark = (postId, bookmark) => {
    bookmarkPost(postId, bookmark);
    if (!bookmark && (currentView === bookmarksTab)) {
      removeUserBookmark(postId);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop: targetScrollTop } = event.target;
    if ((targetScrollTop > scrollTop.current) && isTopBarVisible) {
      setTopBarVisibility(false);
    } else if ((targetScrollTop < scrollTop.current) && !isTopBarVisible) {
      setTopBarVisibility(true);
    }
    scrollTop.current = targetScrollTop;
  };

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  const renderFetchMoreLoader = () => (
    <div className="profilepage__loader-container">
      <Loader containerClassName="profilepage__loader-container--loader" />
    </div>
  );

  const renderLoader = () => (
    <div className="profilepage__full-loader-container">
      <Loader containerClassName="profilepage__full-loader-container--loader" />
    </div>
  );

  const renderProfileCard = () => {
    const imageStyle = {
      backgroundImage: `url(${userData.imageUrl})`,
    };

    return (
      <div className="profile" key={userData.id}>
        <div className="avatar">
          <div className="image" style={imageStyle} />
        </div>

        <div className="details">
          <div className="name">
            <div className="title">
              <div className="text">
                {`${userData.firstname} ${userData.lastname}`}
              </div>
              <div className="edit-btn">
                <Button
                  customClassName="btn"
                  title="edit profile"
                  handleClick={() => setShowModal(true)}
                />
              </div>
            </div>
            <p className="handle">{`@${userData.username}`}</p>
          </div>
          <div className="description"
            // eslint-disable-next-line
							dangerouslySetInnerHTML={
              { __html: addStylesToHashTags(userData.description || '') }
            }
          />
        </div>
      </div>
    );
  };

  const renderStatCard = () => {
    const eventStats = modifyCounts(stats.totalUserEvents);
    const postsStats = modifyCounts(stats.totalUserPosts);

    return	(
      <div className="stat">
        <div className="content">
          {userInfoIsLoading
					  ? <Loader containerClassName="content__stats-loader" />
					  :	<Fragment>
              <div className="text events">
                <span className="count">{eventStats}</span> events
              </div>
              <div className="text posts">
                <span className="count">{postsStats}</span> posts
              </div>
            </Fragment>
          }
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <Fragment>
      {(currentView === eventsTab) && <Events
        handlePin={handlePin}
        events={events}
        isLoading={isLoading}
        pagination={eventsPagination}
        IsEventView={(currentView === eventsTab)}
        getUserEvents={getUserEvents}
        isIntersected={isIntersected}
      />}
      {(currentView === postsTab) && <Posts
        handleBookmark={handleBookmark}
        handleDisLike={handleDisLike}
        handleLike={handleLike}
        getUserPosts={getUserPosts}
        posts={posts}
        isLoading={isLoading}
        pagination={postsPagination}
        IsPostView={(currentView === postsTab)}
        isIntersected={isIntersected}
      />}
      {(currentView === bookmarksTab) && <Bookmarks
        handleBookmark={handleBookmark}
        handleDisLike={handleDisLike}
        handleLike={handleLike}
        getUserBookmarks={getUserBookmarks}
        bookmarks={bookmarks}
        isLoading={bookmarksIsLoading}
        pagination={bookmarksPagination}
        IsBookmarkView={(currentView === bookmarksTab)}
        isIntersected={isIntersected}
      />}
    </Fragment>
  );

  const renderView = () => (
    <Fragment>
      <div className="profilepage__header">
        {isTopBarVisible
          && <div className="profilepage__header-title">
            <PageTitle title={lang.profilePage.pageTitle} />
          </div>
        }
        <div className={isTopBarVisible
          ? 'profilepage__header-top' : 'profilepage__header-top no-display'}>
          <div className="profilepage__header-top__content">
            {renderProfileCard()}
            {renderStatCard()}
          </div>
        </div>
        <div className="profilepage__header-bottom">
          <Tabs navItems={tabItems} activeTitle={currentView} />
        </div>
      </div>
      <div className="profilepage__content" onScroll={handleScroll}>
        <div className="profilepage__content-container">
          {renderContent()}
          {(!!events.length && currentView === eventsTab) && isLoading
              && renderFetchMoreLoader()}
          {(!!posts.length && currentView === postsTab) && isLoading
              && renderFetchMoreLoader()}
          {(!!bookmarks.length && currentView === bookmarksTab) && bookmarksIsLoading
              && renderFetchMoreLoader()}
          {(!!events.length && currentView === eventsTab) && renderFetchMoreTrigger()}
          {(!!posts.length && currentView === postsTab) && renderFetchMoreTrigger()}
          {(!!bookmarks.length && currentView === bookmarksTab) && renderFetchMoreTrigger()}
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <Layout centerContainerStyles={{ paddingTop: 0 }} match={match}>
        <div className="profilepage">
          {userInfoIsLoading
            ? renderLoader()
            : renderView()
          }
        </div>
      </Layout>
      <Modal
        isModalVisible={showModal}
        handleModalClose={handleModalClose}
        customContentClass="profilepage-modal-content"
      >
        <UserProfileForm />
      </Modal>
    </Fragment>
  );
};

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profileUpdateSuccess: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  bookmarks: PropTypes.array.isRequired,
  eventsPagination: PropTypes.object.isRequired,
  postsPagination: PropTypes.object.isRequired,
  bookmarksPagination: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userInfoIsLoading: PropTypes.bool.isRequired,
  bookmarksIsLoading: PropTypes.bool.isRequired,
  getUserEvents: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  removeUserEvent: PropTypes.func.isRequired,
  removeUserBookmark: PropTypes.func.isRequired,
  pinEvent: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getUserBookmarks: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    totalUserEvents: PropTypes.number.isRequired,
    totalUserPosts: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  profileUpdateSuccess: auth.updateSuccess,
  events: auth.events,
  posts: auth.posts,
  bookmarks: auth.bookmarks,
  eventsPagination: auth.eventsPagination,
  postsPagination: auth.postsPagination,
  bookmarksPagination: auth.bookmarksPagination,
  isLoading: auth.isLoading,
  userInfoIsLoading: auth.userInfoIsLoading,
  bookmarksIsLoading: auth.bookmarksIsLoading,
  stats: auth.stats,
});

const actionCreators = {
  getUserEvents: userActions.getUserEvents,
  getUserPosts: userActions.getUserPosts,
  getUserInfo: userActions.getUserInfo,
  getUserBookmarks: userActions.getUserBookmarks,
  removeUserEvent: userActions.removeUserEvent,
  removeUserBookmark: userActions.removeUserBookmark,
  pinEvent: eventActions.pinEvent,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, actionCreators)(ProfilePage);
