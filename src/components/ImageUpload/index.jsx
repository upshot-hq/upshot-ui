import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import './ImageUpload.scss';
import { defaultImageSizeLimit } from '../../helpers/defaults';

const ImageUpload = (props) => {
  const {
    imageElementId, sizeLimit, isUploading, startUploading,
    handleUpload,
  } = props;

  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef(null);
  const isInitialMount = useRef(true);

  console.log(imageInputRef);

  useEffect(() => {
    const imageFile = imageInputRef.current.files[0];
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (startUploading) {
      handleUpload(imageFile);
    }
  }, [startUploading, handleUpload]);

  const handleImageFileChange = () => {
    const imageFile = imageInputRef.current.files[0];
    if (imageFile.size > sizeLimit) {
      setImageError('image too large');
    } else {
      setImageError('');
      console.log(imageInputRef.current.files[0]);
    }
  };

  const renderImage = () => (
    <div className="image">
      <input type="file" name="picture-input" id={imageElementId} ref={imageInputRef}
        className="picture-input" accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageFileChange} disabled={isUploading}
      />
      <div className="icon">
        <FontAwesome name="image" size="2x" />
      </div>
    </div>
  );

  return (
    <div className="up-image-upload">
      {renderImage()}
      <div className="error">
        {imageError}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  imageElementId: PropTypes.string.isRequired,
  sizeLimit: PropTypes.number,
  isUploading: PropTypes.bool.isRequired,
  startUploading: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  imageElementId: '1',
  sizeLimit: defaultImageSizeLimit,
  isUploading: false,
  startUploading: false,
};

export default ImageUpload;
