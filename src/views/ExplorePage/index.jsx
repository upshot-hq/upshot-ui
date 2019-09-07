import React from 'react';
import FontAwesome from 'react-fontawesome';

import './ExplorePage.scss';
import Layout from '../../components/Layout';
import SubNavBar from '../../components/SubNavBar';
import SearchBar from '../../components/SearchBar';
import { events } from './__mocks__';
import EventCard from '../../components/EventCard';

const ExplorePage = () => {
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

  const subNavBarItems = [
    {
      title: 'All',
      onClick: () => {},
    },
    {
      title: 'Events',
      onClick: () => {},
    },
    {
      title: 'Posts',
      onClick: () => {},
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
						<SubNavBar navItems={subNavBarItems} />
					</div>
				</div>
				<div className="content">
					<div className="container">
						{
							events.map((event, index) => (
								<EventCard event={event} key={index} />
							))
						}
					</div>
				</div>
			</div>
		</Layout>
  );
};

export default ExplorePage;
