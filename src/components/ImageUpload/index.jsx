import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ImageUpload.scss';
import { defaultImageSizeLimit } from '../../helpers/defaults';
import lang from '../../helpers/en.default';

const sizeLimitSearchValue = '$SIZELIMITINMB$';

const ImageUpload = (props) => {
  const {
    key, sizeLimit, isUploading, containerStyles, inputStyles,
    handleImageFileChange, containerBackgroundImage, iconStyles,
    topCaptionText, bottomCaptionText,
  } = props;

  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (containerBackgroundImage) {
        imageContainerRef.current.style.backgroundImage = `url("${containerBackgroundImage}")`;
      }
      isInitialMount.current = false;
    }
  });

  const handleFileChange = () => {
    const imageFile = imageInputRef.current.files[0];
    if (imageFile && (imageFile.size > sizeLimit)) {
      const sizeLimitInMb = sizeLimit / 1000000;
      setImageError(lang.imageSizeLimitErrorMessage.replace(sizeLimitSearchValue, sizeLimitInMb));
    } else if (imageFile) {
      setImageError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        imageContainerRef.current.style.backgroundImage = `url("${reader.result}")`;
      }, false);

      reader.readAsDataURL(imageFile);

      handleImageFileChange(imageFile);
    }
  };

  const renderImage = () => (
    <div className="us-upload__image" ref={imageContainerRef} style={containerStyles}>
      {!!topCaptionText
        && <div className="topCaptionText">{topCaptionText}</div>
      }

      <input type="file" name="picture-input" ref={imageInputRef}
        className="picture-input" accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange} disabled={isUploading}
        style={inputStyles}
      />
      <div className="icon" style={iconStyles}>
        <FontAwesome name="image" size="2x" />
      </div>

      {!!bottomCaptionText
        && <div className="bottomCaptionText">{bottomCaptionText}</div>
      }
    </div>
  );

  return (
    <div className="us-upload" key={key}>
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
  isUploading: PropTypes.bool,
  handleImageFileChange: PropTypes.func.isRequired,
  containerBackgroundImage: PropTypes.string,
  containerStyles: PropTypes.object,
  inputStyles: PropTypes.object,
  iconStyles: PropTypes.object,
  topCaptionText: PropTypes.string,
  bottomCaptionText: PropTypes.string,
};

ImageUpload.defaultProps = {
  key: '1',
  sizeLimit: defaultImageSizeLimit,
  isUploading: false,
  containerBackgroundImage: '',
  topCaptionText: '',
  bottomCaptionText: '',
};

export default ImageUpload;
