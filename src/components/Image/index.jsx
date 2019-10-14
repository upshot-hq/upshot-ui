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

const BOTTOM_TEXT = 'bottom-text';
const HIGH = 'high';
const longTextLenght = 60;

const Image = ({ imageUrl, topText, bottomText }) => {
  const [loadingStatus, setLoadingStatus] = useState(loadingStatusValues.loading);
  const handleImageLoadError = () => {
    setLoadingStatus(loadingStatusValues.failed);
  };

  const handleImageLoaded = () => {
    setLoadingStatus(loadingStatusValues.success);
  };

  const bottomTextClass = bottomText.length < longTextLenght
    ? `${BOTTOM_TEXT}` : `${BOTTOM_TEXT} ${HIGH}`;

  return (
    <div className="imageContainer">
      {!!topText && loadingStatus === loadingStatusValues.success
        && <div className="top-text">{topText}</div>}
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
      {!!topText && loadingStatus !== loadingStatusValues.failed
        && <div className={bottomTextClass}>{bottomText}</div>}
    </div>
  );
};

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  topText: PropTypes.string,
  bottomText: PropTypes.string,
};

Image.defaultProps = {
  topText: '',
  bottomText: '',
};

export default Image;
