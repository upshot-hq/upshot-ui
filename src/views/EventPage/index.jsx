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
import * as winnerActions from '../../redux/actionCreators/winnerActions';
import EventDetails from './EventDetails';
import EventPosts from './EventPosts';
import EventWinners from './EventWinners';
import { useIntersect } from '../../helpers/hooksUtils';
import { getUrlQueryValue } from '../../helpers/utils';
import { tabUrlQueryKey, minimumScrollHeight } from '../../helpers/defaults';
import PageTitle from '../../components/PageTitle';

const defaultScrollTopValue = 100;

export const EventPage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const { detailsTab, postsTab, winnersTab } = lang.eventPage.tabs;
  const [currentPostsCompetitionFilter, setCurrentPostsCompetitionFilter] = useState('');
  const {
    match: { params }, event, posts,
    getEvent, eventIsLoading, getEventPosts,
    pagination, postIsLoading, postsErrorMessage,
    postsSuccessStatus, pinEvent, likePost, dislikePost,
    bookmarkPost, winners, winnerIsLoading, generateWinners,
    getWinners, getWinnerIsLoading, user,
  } = props;
  const scrollTop = useRef(defaultScrollTopValue);
  const [isTopBarVisible, setTopBarVisibility] = useState(true);
  const contentNode = useRef();

  const getTabToView = () => {
    const urlQuery = window.location.search;
    const tab = getUrlQueryValue(tabUrlQueryKey, urlQuery);
    let tabToView = '';
    switch (tab) {
    case postsTab:
      tabToView = postsTab;
      break;
    case winnersTab:
      tabToView = winnersTab;
      break;
    default:
      tabToView = detailsTab;
      break;
    }

    return tabToView;
  };

  const changeTab = (tab) => {
    scrollTop.current = defaultScrollTopValue;
    contentNode.current.scrollTop = 0;
    setCurrentView(tab);
  };

  const [currentView, setCurrentView] = useState(getTabToView());
  const isInitialMount = useRef(true);
  const tabItems = [
    {
      title: detailsTab,
      onClick: () => changeTab(detailsTab),

    },
    {
      title: postsTab,
      onClick: () => changeTab(postsTab),

    },
    {
      title: winnersTab,
      onClick: () => changeTab(winnersTab),
    },
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      const { eventId } = params;
      getEvent(eventId);
      getWinners(eventId);
      isInitialMount.current = false;
    }
  }, [params, getEvent, getWinners]);

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

  const handleGenerateWinners = () => {
    const { eventId } = params;
    generateWinners(eventId);
  };

  const handleScroll = (scrollEvent) => {
    const { scrollTop: targetScrollTop, scrollHeight } = scrollEvent.target;
    if ((scrollHeight < minimumScrollHeight) || isIntersected) {
      return;
    }

    if ((currentView === postsTab) && (!posts.length || postIsLoading)) {
      return;
    }

    if ((currentView === winnersTab) && (!winners.length || getWinnerIsLoading)) {
      return;
    }

    if ((targetScrollTop > scrollTop.current)
      && (targetScrollTop > defaultScrollTopValue) && isTopBarVisible) {
      setTopBarVisibility(false);
    } else if ((targetScrollTop < scrollTop.current) && !isTopBarVisible) {
      setTopBarVisibility(true);
    }
    scrollTop.current = targetScrollTop;
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
      {(currentView === winnersTab)
        && <EventWinners
          event={event}
          winners={winners}
          user={user}
          isLoading={winnerIsLoading}
          getWinnerIsLoading={getWinnerIsLoading}
          handleGenerateWinners={handleGenerateWinners}
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
        {isTopBarVisible
          && <div className="eventpage__header-title">
            <PageTitle title={lang.eventPage.pageTitle} />
          </div>
        }
        <div className={isTopBarVisible
          ? 'eventpage__header-top' : 'eventpage__header-top no-display'}>
          <div className="eventpage__header-top__content">
            {renderEventCard(event)}
          </div>
        </div>
        <div className="eventpage__header-bottom">
          <Tabs navItems={tabItems} activeTitle={currentView} />
        </div>
      </div>
      <div ref={contentNode} className="eventpage__content" onScroll={handleScroll}>
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
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  winners: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  getEventPosts: PropTypes.func.isRequired,
  eventIsLoading: PropTypes.bool.isRequired,
  postIsLoading: PropTypes.bool.isRequired,
  winnerIsLoading: PropTypes.bool.isRequired,
  getWinnerIsLoading: PropTypes.bool.isRequired,
  postsErrorMessage: PropTypes.string.isRequired,
  postsSuccessStatus: PropTypes.bool.isRequired,
  pinEvent: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
  generateWinners: PropTypes.func.isRequired,
  getWinners: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  event, eventPost, winner, auth,
}) => ({
  event: event.event,
  posts: eventPost.posts,
  winners: winner.winners,
  user: auth.user,
  eventIsLoading: event.isLoadingEvent,
  postIsLoading: eventPost.isLoading,
  winnerIsLoading: winner.isLoading,
  getWinnerIsLoading: winner.isWinnersLoading,
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
  generateWinners: winnerActions.generateWinners,
  getWinners: winnerActions.getWinners,
};

export default connect(mapStateToProps, actionCreators)(EventPage);
