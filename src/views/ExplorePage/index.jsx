import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './ExplorePage.scss';
import { PropTypes } from 'prop-types';
import Layout from '../../components/Layout';
import Tabs from '../../components/Tabs';
import SearchBar from '../../components/SearchBar';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import lang from '../../helpers/en.default';
import PostCard from '../../components/PostCard/index';
import * as exploreActions from '../../redux/actionCreators/exploreActions';
import { useIntersect } from '../../helpers/hooksUtils';

const ExplorePage = (props) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const { allTab, eventsTab, postsTab } = lang.explorePage.tabs;
  const {
    isLoading, content, errorMessage,
    fetchExploreContent, pagination,
  } = props;
  const [currentView, setCurrentView] = useState(allTab);
  const [isNewTab, setIsNewTab] = useState(true);
  const isInitialMount = useRef(true);

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
            filter: currentView,
            isNewTab,
          });
        }
      };

      fetchMoreContent();
    }
  }, [
    pagination, isIntersected,
    content, currentView, fetchExploreContent,
    isNewTab, isLoading,
  ]);

  useEffect(() => {
    if (isNewTab) {
      fetchExploreContent({ filter: currentView, isNewTab });
      setIsNewTab(false);
    }
  }, [fetchExploreContent, currentView, isNewTab]);

  const renderTopBar = () => (
		<div className="topbar">
			<div className="icon back-btn">
			<FontAwesome name="arrow-left" />
			</div>
			<div className="bar">
				<SearchBar
					search={() => {}}
					handleSearchResultClick={() => {}}
					searchScope=""
					searchResultTitleProperty=""
					searchResultValueProperty=""
				/>
			</div>
			<div className="icon options-btn">
				<FontAwesome name="ellipsis-h" />
			</div>
		</div>
  );

  const TabsItems = [
    {
      title: allTab,
      onClick: () => {
        setCurrentView(allTab);
        setIsNewTab(true);
      },
    },
    {
      title: eventsTab,
      onClick: () => {
        setCurrentView(eventsTab);
        setIsNewTab(true);
      },
    },
    {
      title: postsTab,
      onClick: () => {
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
				  const isEvent = ('start_at' in resource);
				  const isEventPost = ('caption' in resource);
				  if (isEvent) {
				    return <EventCard event={resource} key={index} />;
				  }

				  if (isEventPost) {
				    return <PostCard post={resource} key={index} />;
				  }

				  return null;
				})
			}
		</div>
  );

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  return (
		<Layout>
			<div className="explore-page" id="explore-page">
				<div className="header">
					<div className="top">
						{renderTopBar()}
					</div>
					<div className="bottom">
						<Tabs navItems={TabsItems} activeTitle={currentView} />
					</div>
				</div>
				<div className="content">
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
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  fetchExploreContent: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

const mapStateToProps = ({ explore }) => ({
  content: explore.content,
  isLoading: explore.isLoading,
  errorMessage: explore.errors.message,
  pagination: explore.pagination,
});

const actionCreators = {
  fetchExploreContent: exploreActions.fetchExploreContent,
};

export default connect(mapStateToProps, actionCreators)(ExplorePage);
