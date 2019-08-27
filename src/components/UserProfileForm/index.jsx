import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './UserProfileForm.scss';
import ImageUpload from '../ImageUpload';
import { Textbox } from '../FormInput';
import Button from '../Button';
import * as userActions from '../../redux/actionCreators/userActions';
import { addStylesToHashTags, createFormData } from '../../helpers/utils';

const UserProfileForm = (props) => {
  const {
    user: { userData }, userIsLoading, updateUserProfile,
  } = props;

  const isInitialMount = useRef(true);
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
    image: '',
    imageUrl: userData.imageUrl,
    errors: {},
  });
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

  const handleImageFileChange = (imageFile) => {
    setProfileForm({
      ...profileForm,
      image: imageFile,
    });
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
      imageUrl: profileForm.imageUrl,
    };

    const userdata = createFormData(data);
    updateUserProfile(userdata);
  };

  return (
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
};

UserProfileForm.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(UserProfileForm);
