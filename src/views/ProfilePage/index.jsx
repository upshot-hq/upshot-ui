import React from 'react';

import Layout from '../../components/Layout';
import './ProfilePage.scss';

const ProfilePage = () => {
  const renderProfileCard = () => (
			<div className="profile">
				<div className="avatar">
					<div className="image" />
				</div>
				<div className="details">
					<div className="name">
						Akinola Ogooluwa
						<span className="handle">@rovilay</span>
					</div>
					<div className="description">
						Software developer @andela @omaze.
							#javascript #python #golang #react #redux #nodejs
					</div>
				</div>
			</div>
  );

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

  return (
		<Layout centerContainerStyles={{ paddingTop: 0 }}>
			<div className="profilepage">
				<div className="header">
					<div className="top">
						{renderProfileCard()}
						{renderStatCard()}
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

export default ProfilePage;
