import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import './Image.scss';
import BrokenImage from '../../assets/icons/broken-image.svg';

const loadingStatusValues = {
  loading: 'loading',
  failed: 'failed',
  success: 'success',
};

const Image = ({ imageUrl }) => {
  const [loadingStatus, setLoadingStatus] = useState(loadingStatusValues.loading);
  const handleImageLoadError = () => {
    setLoadingStatus(loadingStatusValues.failed);
  };

  const handleImageLoaded = () => {
    setLoadingStatus(loadingStatusValues.success);
  };
  return (
    <div className="imageContainer">
      {(loadingStatus === loadingStatusValues.loading)
      && <div className={`image ${loadingStatus}`}>
        <Loader containerClassName="loader-container" />
      </div>}
      {(loadingStatus === loadingStatusValues.failed)
      && <div className="notFoundContainer">
        <img className={`image ${loadingStatus}`} src={BrokenImage} alt="not loaded" />
      </div>}
      {(loadingStatus !== loadingStatusValues.failed)
      && <img onLoad={handleImageLoaded} onError={handleImageLoadError}
      className={`image ${(loadingStatus === loadingStatusValues.success) ? '' : 'hidden'}`}
      src={imageUrl} alt="loaded" />}
    </div>
  );
};

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Image;
