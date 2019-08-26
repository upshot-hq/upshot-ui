import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './ImageUpload.scss';
import { defaultImageSizeLimit } from '../../helpers/defaults';

const ImageUpload = (props) => {
  const {
    key, sizeLimit, isUploading,
    handleImageFileChange, containerBackgroundImage,
  } = props;

  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (containerBackgroundImage) {
        imageContainerRef.current.style = `background-image: url("${containerBackgroundImage}")`;
      }
      isInitialMount.current = false;
    }
  });

  const handleFileChange = () => {
    const imageFile = imageInputRef.current.files[0];
    if (imageFile.size > sizeLimit) {
      setImageError('image too large');
    } else {
      setImageError('');
      const reader = new FileReader(); // eslint-disable-line
      reader.addEventListener('load', () => {
        imageContainerRef.current.style = `background-image: url("${reader.result}")`;
      }, false);

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }

      handleImageFileChange(imageFile);
    }
  };

  const renderImage = () => (
    <div className="image" ref={imageContainerRef}>
      <input type="file" name="picture-input" ref={imageInputRef}
        className="picture-input" accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange} disabled={isUploading}
      />
      <div className="icon">
        <FontAwesome name="image" size="2x" />
      </div>
    </div>
  );

  return (
    <div className="up-image-upload" key={key}>
      {renderImage()}
      <div className="error">
        {imageError}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  key: PropTypes.string,
  sizeLimit: PropTypes.number,
  isUploading: PropTypes.bool.isRequired,
  handleImageFileChange: PropTypes.func.isRequired,
  containerBackgroundImage: PropTypes.string,
};

ImageUpload.defaultProps = {
  key: '1',
  sizeLimit: defaultImageSizeLimit,
  isUploading: false,
  containerBackgroundImage: '',
};

export default ImageUpload;
