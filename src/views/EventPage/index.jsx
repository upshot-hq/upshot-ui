import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './EventPage.scss';
import Layout from '../../components/Layout';
import lang from '../../helpers/en.default';
import Tabs from '../../components/Tabs';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import * as eventActions from '../../redux/actionCreators/eventActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import EventDetails from './EventDetails';
import EventPosts from './EventPosts';
import { useIntersect } from '../../helpers/hooksUtils';

export const EventPage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const { detailsTab, postsTab, analyticsTab } = lang.eventPage.tabs;
  const [currentPostsCompetitionFilter, setCurrentPostsCompetitionFilter] = useState('');
  const {
    match: { params }, event, posts,
    getEvent, eventIsLoading, getEventPosts,
    pagination, postIsLoading, postsErrorMessage,
    postsSuccessStatus, pinEvent, likePost, dislikePost,
    bookmarkPost,
  } = props;

  const [currentView, setCurrentView] = useState(detailsTab);
  const isInitialMount = useRef(true);
  const tabItems = [
    {
      title: detailsTab,
      onClick: () => setCurrentView(detailsTab),

    },
    {
      title: postsTab,
      onClick: () => setCurrentView(postsTab),

    },
    {
      title: analyticsTab,
      onClick: () => setCurrentView(analyticsTab),
    },
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      const { eventId } = params;
      getEvent(eventId);
      isInitialMount.current = false;
    }
  }, [params, getEvent]);

  const handlePin = (eventId, pin) => {
    pinEvent(eventId, pin);
  };

  const handleLike = (postId, like) => {
    likePost(postId, like);
  };

  const handleDisLike = (postId, dislike) => {
    dislikePost(postId, dislike);
  };

  const handleCompetitionFilter = (competitionId) => {
    setCurrentPostsCompetitionFilter(competitionId);
  };

  const handleBookmark = (postId, bookmark) => {
    bookmarkPost(postId, bookmark);
  };

  const renderEventCard = (eventItem) => (
  <EventCard event={eventItem} handlePin={handlePin} />
  );

  const renderContent = () => (
		<Fragment>
      {(currentView === detailsTab) && <EventDetails event={event} />}
      {(currentView === postsTab)
        && <EventPosts
          eventCompetitions={event.competitions}
          posts={posts}
          isLoading={postIsLoading}
          errorMessage={postsErrorMessage}
          setNode={setNode}
          eventId={params.eventId}
          isPostView={(currentView === postsTab)}
          getEventPosts={getEventPosts}
          isIntersected={isIntersected}
          pagination={pagination}
          handleLike={handleLike}
          handleDisLike={handleDisLike}
          competitionFilter={currentPostsCompetitionFilter}
          handleCompetitionFilter={handleCompetitionFilter}
          handleBookmark={handleBookmark}
        />
      }
		</Fragment>
  );

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  const renderFetchMoreLoader = () => (
		<div className="eventpage__posts-loader-container">
			<Loader containerClassName="eventpage__posts-loader" />
		</div>
  );

  const renderView = () => (
		<Fragment>
			<div className="eventpage__header">
				<div className="eventpage__header-top">
					<div className="eventpage__header-top__content">
						{renderEventCard(event)}
					</div>
				</div>
				<div className="eventpage__header-bottom">
					<Tabs navItems={tabItems} activeTitle={currentView} />
				</div>
			</div>
			<div className="eventpage__content">
				<div className="eventpage__content-container">
          {renderContent()}
          {!!posts.length && !postsSuccessStatus && renderFetchMoreLoader()}
          {!!posts.length && renderFetchMoreTrigger()}
				</div>
			</div>
		</Fragment>
  );

  const renderLoader = () => (
		<div className="eventpage__loader-container">
			<Loader containerClassName="eventpage__loader-container--loader" />
		</div>
  );

  const renderNotFound = () => (
		<div className="eventpage__notfound">
			<div className="text">{lang.eventPage.notFound}</div>
		</div>
  );

  return (
		<Fragment>
			<Layout centerContainerStyles={{ paddingTop: 0 }} match={props.match}>
				<div className="eventpage" id="eventpage">
					{eventIsLoading && renderLoader()}
					{!eventIsLoading && event.id && renderView()}
					{!eventIsLoading && !event.id && renderNotFound()}
				</div>
			</Layout>
		</Fragment>
  );
};

EventPage.propTypes = {
  match: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  getEventPosts: PropTypes.func.isRequired,
  eventIsLoading: PropTypes.bool.isRequired,
  postIsLoading: PropTypes.bool.isRequired,
  postsErrorMessage: PropTypes.string.isRequired,
  postsSuccessStatus: PropTypes.bool.isRequired,
  pinEvent: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ event, eventPost }) => ({
  event: event.event,
  posts: eventPost.posts,
  eventIsLoading: event.isLoadingEvent,
  postIsLoading: eventPost.isLoading,
  pagination: eventPost.pagination,
  postsErrorMessage: eventPost.error.message,
  postsSuccessStatus: eventPost.success,
});

const actionCreators = {
  getEvent: eventActions.getEvent,
  getEventPosts: eventPostActions.getEventPosts,
  pinEvent: eventActions.pinEvent,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, actionCreators)(EventPage);
