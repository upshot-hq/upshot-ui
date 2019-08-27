import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProfilePage.scss';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal/index';
import Button from '../../components/Button';
import { addStylesToHashTags, createFormData } from '../../helpers/utils';
import ImageUpload from '../../components/ImageUpload';
import * as userActions from '../../redux/actionCreators/userActions';
import { Textbox } from '../../components/FormInput';

export const ProfilePage = (props) => {
  const {
    user: { userData }, userIsLoading,
    updateUserProfile, profileUpdateSuccess,
  } = props;
  const [showModal, setShowModal] = useState(true);
  const [profileForm, setProfileForm] = useState({
    firstname: {
      value: userData.firstname,
      required: true,
    },
    lastname: {
      value: userData.lastname,
      required: true,
    },
    username: {
      value: userData.username,
      required: true,
    },
    description: {
      value: userData.description || 'enter description...',
      required: false,
    },
    image: {},
    errors: {},
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
        const disableBtn = !firstname.value || !lastname.value
					|| !username.value || userIsLoading;

        setDisableEditFormBtn(disableBtn);
      };

      handleDisalbleEditFormBtn();
    }
  }, [profileForm, userIsLoading]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (profileUpdateSuccess) {
      setShowModal(false);
    }
  }, [profileUpdateSuccess]);

  const handleImageFileChange = (imageFile) => {
    setProfileForm({
      ...profileForm,
      image: imageFile,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormFieldChange = (event) => {
    const { value, name } = event.target;
    let { errors } = profileForm;

    if (!value && profileForm[name].required) {
      errors = {
        ...profileForm.errors,
        [name]: `${name} is required`,
      };
    } else {
      errors = {
        ...profileForm.errors,
        [name]: '',
      };
    }

    setProfileForm({
      ...profileForm,
      [name]: {
        ...profileForm[name],
        value,
      },
      errors,
    });
  };

  const handleSubmit = () => {
    profileForm.description.value = addStylesToHashTags(profileForm.description.value);
    const data = {
      firstname: profileForm.firstname.value,
      lastname: profileForm.lastname.value,
      username: profileForm.username.value,
      description: profileForm.description.value,
      image: profileForm.image,
    };

    const userdata = createFormData(data);
    updateUserProfile(userdata);
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

  const renderProfileForm = () => (
		<div className="profile__form">
			<div className="profile__form-header">
				<div className="title">edit profile</div>
			</div>
			<div className="profile__form-content">
				<div className="form-input">
					<ImageUpload
						handleImageFileChange={handleImageFileChange}
						containerBackgroundImage={userData.imageUrl}
					/>
				</div>
				<Textbox
					name="firstname"
					placeholder="firstname"
					required={profileForm.firstname.required}
					value={profileForm.firstname.value}
					onChange={handleFormFieldChange}
					error={profileForm.errors.firstname}
					type="text"
				/>
				<Textbox
					name="lastname"
					placeholder="lastname"
					required={profileForm.lastname.required}
					value={profileForm.lastname.value}
					onChange={handleFormFieldChange}
					error={profileForm.errors.lastname}
					type="text"
				/>
				<Textbox
					name="username"
					placeholder="username"
					required={profileForm.username.required}
					value={profileForm.username.value}
					onChange={handleFormFieldChange}
					error={profileForm.errors.username}
					type="text"
				/>
				<div className="form-input">
					<div className="title">description</div>
					<textarea type="text" name="description"
						id="description" className="text-input textarea"
						placeholder="enter a short description..."
						maxLength={150} rows={3}
						onChange={handleFormFieldChange}
						value={profileForm.description.value}
					/>
				</div>
				<Button
					title="save"
					disabled={disableEditFormBtn}
					handleClick={handleSubmit}
					showLoader={userIsLoading}s
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
  userIsLoading: PropTypes.bool.isRequired,
  profileUpdateSuccess: PropTypes.bool.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  userIsLoading: auth.isLoading,
  profileUpdateSuccess: auth.updateSuccess,
});

const actionCreators = {
  updateUserProfile: userActions.updateUserProfile,
};

export default connect(mapStateToProps, actionCreators)(ProfilePage);
