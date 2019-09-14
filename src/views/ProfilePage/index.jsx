import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProfilePage.scss';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal/index';
import { addStylesToHashTags } from '../../helpers/utils';
import UserProfileForm from '../../components/UserProfileForm/index';

export const ProfilePage = (props) => {
  const { user: { userData }, profileUpdateSuccess, match } = props;
  const [showModal, setShowModal] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (profileUpdateSuccess) {
      setShowModal(false);
    }
  }, [profileUpdateSuccess]);

  const handleModalClose = () => {
    setShowModal(false);
  };

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
									<button className="btn" onClick={() => setShowModal(true)}>
										edit profile
									</button>
								</div>
							</div>
							<p className="handle">{`@${userData.username}`}</p>
						</div>
						<div className="description"
							// eslint-disable-next-line
							dangerouslySetInnerHTML={
								{ __html: addStylesToHashTags(userData.description) }
							}
						/>
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
		<Fragment>
			<Layout centerContainerStyles={{ paddingTop: 0 }} match={match}>
				<div className="profilepage">
					<div className="profilepage__header">
						<div className="profilepage__header-top">
							<div className="profilepage__header-top__content">
								{renderProfileCard()}
								{renderStatCard()}
							</div>
						</div>
						<div className="profilepage__header-bottom">
							<div className="profilepage__header-bottom__nav__items">
								<div key={1}
									className="profilepage__header-bottom__nav__items-item"
								>
									events
								</div>
								<div key={2}
									className="profilepage__header-bottom__nav__items-item"
								>
									posts
								</div>
								<div key={3}
									className="profilepage__header-bottom__nav__items-item"
								>
									likes
								</div>
							</div>
						</div>
					</div>
					<div className="profilepage__content">
						<div className="dummy-card" />
						<div className="dummy-card" />
						<div className="dummy-card" />
						<div className="dummy-card" />
						<div className="dummy-card" />
						<div className="dummy-card" />
					</div>
				</div>
			</Layout>
			<Modal isModalVisible={showModal} handleModalClose={handleModalClose}>
				<UserProfileForm />
			</Modal>
		</Fragment>
  );
};

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profileUpdateSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  profileUpdateSuccess: auth.updateSuccess,
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(ProfilePage);
