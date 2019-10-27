import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ExplorePage.scss';
import Layout from '../../components/Layout';
import Tabs from '../../components/Tabs';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import lang from '../../helpers/en.default';
import PostCard from '../../components/PostCard/index';
import * as exploreActions from '../../redux/actionCreators/exploreActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import * as eventActions from '../../redux/actionCreators/eventActions';
import { useIntersect } from '../../helpers/hooksUtils';
import GeneralSearchBar from '../../components/GeneralSearchBar';
import {
  minimumScrollHeight, eventKeys,
  eventFilter, eventPostKeys,
} from '../../helpers/defaults';

const ExplorePage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const {
    allTab, eventsTab, postsTab, upcomingTab,
  } = lang.explorePage.tabs;
  const { upcoming, ongoing, ended } = eventFilter;
  const {
    isLoading, content, errorMessage,
    fetchExploreContent, pagination,
    likePost, dislikePost,
    match, pinEvent, bookmarkPost,
  } = props;
  const [currentView, setCurrentView] = useState(allTab);
  const [currentViewFilter, setCurrentViewFilter] = useState(allTab);
  const [isNewTab, setIsNewTab] = useState(true);
  const isInitialMount = useRef(true);
  const scrollTop = useRef(0);
  const eventFilters = useRef(`${ongoing},${ended}`);
  const [isSearchBarVisible, setSearchBarVisibility] = useState(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!isLoading) {
      const fetchMoreContent = () => {
        const { limit, offset, totalCount } = pagination;
        if (isIntersected && !isNewTab && content.length < totalCount) {
          const nextOffset = Number(offset) + Number(limit);
          fetchExploreContent({
            limit,
            offset: nextOffset,
            filter: currentViewFilter,
            eventFilter: eventFilters.current,
            isNewTab,
          });
        }
      };

      fetchMoreContent();
    }
  }, [
    pagination, isIntersected,
    content, currentViewFilter, currentView,
    fetchExploreContent, isNewTab, isLoading,
  ]);

  useEffect(() => {
    if (isNewTab) {
      fetchExploreContent({
        filter: currentViewFilter,
        eventFilter: eventFilters.current,
        isNewTab,
      });
      setIsNewTab(false);
    }
  }, [fetchExploreContent, currentViewFilter, currentView, isNewTab]);

  const handleLike = (postId, like) => {
    likePost(postId, like);
  };

  const handleDisLike = (postId, dislike) => {
    dislikePost(postId, dislike);
  };

  const handlePin = (eventId, pin) => {
    pinEvent(eventId, pin);
  };

  const handleBookmark = (postId, bookmark) => {
    bookmarkPost(postId, bookmark);
  };

  const renderTopBar = () => (
    <div className="topbar">
      <GeneralSearchBar showOptionsBtn={false} />
    </div>
  );

  const TabsItems = [
    {
      title: allTab,
      onClick: () => {
        eventFilters.current = `${ongoing},${ended}`;
        setCurrentViewFilter(allTab);
        setCurrentView(allTab);
        setIsNewTab(true);
      },
    },
    {
      title: upcomingTab,
      onClick: () => {
        eventFilters.current = upcoming;
        setCurrentViewFilter(eventsTab);
        setCurrentView(upcomingTab);
        setIsNewTab(true);
      },
    },
    {
      title: eventsTab,
      onClick: () => {
        eventFilters.current = `${ongoing},${ended}`;
        setCurrentViewFilter(eventsTab);
        setCurrentView(eventsTab);
        setIsNewTab(true);
      },
    },
    {
      title: postsTab,
      onClick: () => {
        setCurrentViewFilter(postsTab);
        setCurrentView(postsTab);
        setIsNewTab(true);
      },
    },
  ];

  const renderError = (message) => (
    <div className="explore-page__error">
      <div className="explore-page__error-content">
        {message}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="content-container">
      {
        content.map((resource, index) => {
				  const isEvent = (eventKeys.startAt in resource);
				  const isEventPost = (eventPostKeys.eventId in resource);
				  if (isEvent) {
				    return <EventCard
              event={resource}
              key={index}
              handlePin={handlePin} />;
				  }

				  if (isEventPost) {
				    return <PostCard
              post={resource}
              key={index}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
              handleBookmark={handleBookmark} />;
				  }

				  return null;
        })
      }
    </div>
  );

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  const handleScroll = (event) => {
    const { scrollTop: targetScrollTop, scrollHeight } = event.target;

    if ((scrollHeight < minimumScrollHeight) || isIntersected) {
      return;
    }

    if ((targetScrollTop > scrollTop.current) && isSearchBarVisible) {
      setSearchBarVisibility(false);
    } else if ((targetScrollTop < scrollTop.current) && !isSearchBarVisible) {
      setSearchBarVisibility(true);
    }
    scrollTop.current = targetScrollTop;
  };

  return (
    <Layout match={match}>
      <div className="explore-page" id="explore-page">
        <div className="header">
          <div className={isSearchBarVisible ? 'top' : 'top no-display'}>
            {renderTopBar()}
          </div>
          <div className="bottom">
            <Tabs
              navItems={TabsItems}
              activeTitle={currentView}
            />
          </div>
        </div>
        <div className="content" onScroll={handleScroll}>
          {renderContent()}
          {isLoading && <Loader containerClassName="explore-page__loader" />}
          {!isLoading && !!errorMessage && renderError(lang.failedToFetch)}
          {!isLoading && !errorMessage
						&& !content.length && renderError(lang.explorePage.noContent)
          }
          {renderFetchMoreTrigger()}
        </div>
      </div>
    </Layout>
  );
};

ExplorePage.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  fetchExploreContent: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  pinEvent: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ explore }) => ({
  content: explore.content,
  isLoading: explore.isLoading,
  errorMessage: explore.errors.message,
  pagination: explore.pagination,
});

const actionCreators = {
  fetchExploreContent: exploreActions.fetchExploreContent,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  pinEvent: eventActions.pinEvent,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, actionCreators)(ExplorePage);
