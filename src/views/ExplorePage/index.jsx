import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';

import './ExplorePage.scss';
import { PropTypes } from 'prop-types';
import Layout from '../../components/Layout';
import Tabs from '../../components/Tabs';
import SearchBar from '../../components/SearchBar';
import { events } from './__mocks__';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';

const ExplorePage = (props) => {
  const ALLTAB = 'all';
  const EVENTTAB = 'events';
  const POSTTAB = 'posts';
  const { isLoading } = props;
  const [currentView, setCurrentView] = useState(ALLTAB);

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
      title: ALLTAB,
      onClick: () => { setCurrentView(ALLTAB); },
    },
    {
      title: EVENTTAB,
      onClick: () => { setCurrentView(EVENTTAB); },
    },
    {
      title: POSTTAB,
      onClick: () => { setCurrentView(POSTTAB); },
    },
  ];

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
					{isLoading && <Loader containerClassName="explore-page-loader" />}
					{!isLoading
						&& <div className="container">
							{
								events.map((event, index) => (
									<EventCard event={event} key={index} />
								))
							}
						</div>
					}
				</div>
			</div>
		</Layout>
  );
};

ExplorePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

ExplorePage.defaultProps = {
  isLoading: false,
};

export default ExplorePage;
