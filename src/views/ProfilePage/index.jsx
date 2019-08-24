import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../../components/Layout';
import './ProfilePage.scss';

export const ProfilePage = (props) => {
  const { user: { userData } } = props;

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
									<button className="btn">
										edit profile
									</button>
								</div>
							</div>
							<p className="handle">{`@${userData.username}`}</p>
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
		<Layout centerContainerStyles={{ paddingTop: 0 }}>
			<div className="profilepage">
				<div className="header">
					<div className="top">
						<div className="content">
							{renderProfileCard()}
							{renderStatCard()}
						</div>
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
  );
};

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
};

ProfilePage.defaultProps = {
  children: null,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, {})(ProfilePage);
