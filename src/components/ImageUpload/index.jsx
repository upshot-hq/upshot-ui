import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ImageUpload.scss';
import { defaultImageSizeLimit } from '../../helpers/defaults';

const ImageUpload = (props) => {
  const { imageElementId, sizeLimit } = props;
  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef(null);

  const handleImageFileChange = () => {
    const imageFile = imageInputRef.current.files[0];
    if (imageFile.size > sizeLimit) {
      setImageError('image too large');
    } else {
      setImageError('');
    }
  };

  const renderImage = () => (
    <div className="image">
      <input type="file" name="picture-input" id={imageElementId} ref={imageInputRef}
        className="picture-input" accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageFileChange}
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
};

ImageUpload.defaultProps = {
  children: null,
  imageElementId: '1',
  sizeLimit: defaultImageSizeLimit,
};

export default ImageUpload;
