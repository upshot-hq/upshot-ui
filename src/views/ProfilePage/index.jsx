import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProfilePage.scss';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal/index';
import Button from '../../components/Button';
import { addStylesToHashTags } from '../../helpers/utils';

export const ProfilePage = (props) => {
  const { user: { userData } } = props;
  const [showModal, setShowModal] = useState(true);
  const [profileForm, setProfileForm] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    username: userData.username,
    description: userData.description || '',
  });
  const isInitialMount = useRef(true);

  const [disableEditFormBtn, setDisableEditFormBtn] = useState(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const handleDisalbleEditFormBtn = () => {
        const {
          firstname, lastname, username,
        } = profileForm;
        const disableBtn = !firstname || !lastname || !username;
        setDisableEditFormBtn(disableBtn);
      };

      handleDisalbleEditFormBtn();
    }
  }, [profileForm]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormFieldChange = (event) => {
    const { value, name } = event.target;
    if (name === 'description') {
      console.log(addStylesToHashTags(value));
    }
    setProfileForm({ ...profileForm, [name]: value });
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

  const renderProfileForm = () => (
		<div className="profile__form">
			<div className="profile__form-header">
				<div className="title">edit profile</div>
			</div>
			<div className="profile__form-content">
				<div className="form-input">
					<div className="title">firstname</div>
					<input type="text" name="firstname"
						id="firstname" className="text-input" placeholder="firstname *"
						onChange={handleFormFieldChange} value={profileForm.firstname}
					/>
				</div>
				<div className="form-input">
					<div className="title">lastname</div>
					<input type="text" name="lastname"
						id="lastname" className="text-input" placeholder="lastname *"
						onChange={handleFormFieldChange} value={profileForm.lastname}
					/>
				</div>
				<div className="form-input">
					<div className="title">username</div>
					<input type="text" name="username"
						id="username" className="text-input" placeholder="username *"
						onChange={handleFormFieldChange} value={profileForm.username}
					/>
				</div>
				<div className="form-input">
					<div className="title">description</div>
					<textarea type="text" name="description"
						id="description" className="text-input textarea"
						placeholder="enter a short description..."
						maxLength={150} rows={3}
						onChange={handleFormFieldChange} value={profileForm.description}
					/>
				</div>
				<Button
					title="save"
					disabled={disableEditFormBtn}
				/>
			</div>
		</div>
  );

  return (
		<Fragment>
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
			<Modal isModalVisible={showModal} handleModalClose={handleModalClose}>
				{renderProfileForm()}
			</Modal>
		</Fragment>
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
