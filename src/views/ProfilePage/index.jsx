import React from 'react';

import Layout from '../../components/Layout';
import AuthenticatedView from '../../components/Auth';
import avatar from '../../assets/avatar.jpg';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const renderProfileCard = () => {
    const imageStyle = {
      backgrounImage: `url(${avatar})`,
    };

    return (
				<div className="profile">
					<div className="avatar">
						<div className="image" style={imageStyle} />
					</div>

					<div className="details">
						<div className="name">
							<div className="title">
								<div className="text">Akinola Ogooluwa</div>
								<div className="edit-btn">
									<button className="btn">
										edit profile
									</button>
								</div>
							</div>
							<p className="handle">@rovilay</p>
						</div>
						<div className="description">
							Software developer @andela @omaze.
								#javascript #python #golang #react #redux #nodejs
						</div>
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

  return (
		<AuthenticatedView>
			<Layout centerContainerStyles={{ paddingTop: 0 }}>
				<div className="profilepage">
					<div className="header">
						<div className="top">
							{renderProfileCard()}
							{renderStatCard()}
						</div>
						<div className="bottom">
							<div className="nav__items">
								<div key={1} className="nav__items-item">events</div>
								<div key={2} className="nav__items-item">posts</div>
								<div key={3} className="nav__items-item">likes</div>
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
		</AuthenticatedView>
  );
};

export default ProfilePage;
