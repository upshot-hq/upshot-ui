import React from 'react';
import FontAwesome from 'react-fontawesome';

import Layout from '../../components/Layout';
import './ProfilePage.scss';

const HomePage = () => {
  const renderSearchBar = () => (
		<div className="searchbar">
			<div className="icon back-btn">
			<FontAwesome name="arrow-left" />
			</div>
			<div className="bar">
				<div className="search-icon">
				<FontAwesome name="search" />
				</div>
				<input type="text" name="search" className="search-input"/>
			</div>
			<div className="icon options-btn">
				<FontAwesome name="ellipsis-h" />
			</div>
		</div>
  );

  return (
		<Layout>
			<div className="homepage">
				<div className="header">
					<div className="top">
						{renderSearchBar()}
					</div>
					<div className="bottom">
						<div className="nav__items">
							<div key={1} className="nav__items-item">Top</div>
							<div key={2} className="nav__items-item">latest</div>
							<div key={3} className="nav__items-item">people</div>
							<div key={4} className="nav__items-item">photos</div>
							<div key={5} className="nav__items-item">videos</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="dummy-card" />
					<div className="dummy-card" />
					<div className="dummy-card" />
					<div className="dummy-card" />
					<div className="dummy-card" />
					<div className="dummy-card" />
				</div>
			</div>
		</Layout>
  );
};

export default HomePage;
