import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProfilePage.scss';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal/index';
import lang from '../../helpers/en.default';
import { addStylesToHashTags } from '../../helpers/utils';
import UserProfileForm from '../../components/UserProfileForm/index';
import Tabs from '../../components/Tabs';
import * as userActions from '../../redux/actionCreators/userActions';
import * as eventActions from '../../redux/actionCreators/eventActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import Events from './Events';
import Posts from './Posts';
import { useIntersect } from '../../helpers/hooksUtils';
import Loader from '../../components/Loader/index';


export const ProfilePage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const {
    user: { userData }, profileUpdateSuccess, match,
    likePost, dislikePost, bookmarkPost, posts,
    pinEvent, events, isLoading, getUserPosts,
    eventsPagination, postsPagination, getUserEvents,
    removeUserEvent,
  } = props;
  const { eventsTab, postsTab, bookmarksTab } = lang.profilePage.tabs;
  const [currentView, setCurrentView] = useState(eventsTab);
  const [showModal, setShowModal] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (profileUpdateSuccess) {
      setShowModal(false);
    }
  }, [profileUpdateSuccess]);

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
  };

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  const renderFetchMoreLoader = () => (
		<div className="profilepage__loader-container">
			<Loader containerClassName="profilepage__loader-container--loader" />
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
									<button className="btn" onClick={() => setShowModal(true)}>
										edit profile
									</button>
								</div>
							</div>
							<p className="handle">{`@${userData.username}`}</p>
						</div>
						<div className="description"
							// eslint-disable-next-line
							dangerouslySetInnerHTML={
								{ __html: addStylesToHashTags(userData.description) }
							}
						/>
					</div>
				</div>
    );
  };

  const renderStatCard = () => (
			<div className="stat">
				<div className="content">
					<div className="text events">
						<span className="count">72</span> events
					</div>
					<div className="text posts">
						<span className="count">500</span> posts
					</div>
					<div className="text likes">
						<span className="count">1873</span> likes
					</div>
				</div>
			</div>
  );

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
		</Fragment>
  );

  return (
		<Fragment>
			<Layout centerContainerStyles={{ paddingTop: 0 }} match={match}>
				<div className="profilepage">
					<div className="profilepage__header">
						<div className="profilepage__header-top">
							<div className="profilepage__header-top__content">
								{renderProfileCard()}
								{renderStatCard()}
							</div>
						</div>
						<div className="profilepage__header-bottom">
							<Tabs navItems={tabItems} activeTitle={currentView} />
						</div>
					</div>
					<div className="profilepage__content">
						<div className="profilepage__content-container">
							{renderContent()}
              {(!!events.length && currentView === eventsTab) && isLoading
                  && renderFetchMoreLoader()}
              {(!!posts.length && currentView === postsTab) && isLoading
                  && renderFetchMoreLoader()}
          		{(!!events.length && currentView === eventsTab) && renderFetchMoreTrigger()}
          		{(!!posts.length && currentView === postsTab) && renderFetchMoreTrigger()}
						</div>
					</div>
				</div>
			</Layout>
			<Modal isModalVisible={showModal} handleModalClose={handleModalClose}>
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
  eventsPagination: PropTypes.object.isRequired,
  postsPagination: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getUserEvents: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  removeUserEvent: PropTypes.func.isRequired,
  pinEvent: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  profileUpdateSuccess: auth.updateSuccess,
  events: auth.events,
  posts: auth.posts,
  eventsPagination: auth.eventsPagination,
  postsPagination: auth.postsPagination,
  isLoading: auth.isLoading,
});

const actionCreators = {
  getUserEvents: userActions.getUserEvents,
  getUserPosts: userActions.getUserPosts,
  removeUserEvent: userActions.removeUserEvent,
  pinEvent: eventActions.pinEvent,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, actionCreators)(ProfilePage);
