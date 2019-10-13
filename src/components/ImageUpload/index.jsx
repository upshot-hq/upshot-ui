import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ImageUpload.scss';
import { defaultImageSizeLimit } from '../../helpers/defaults';

const textStyle = {
  fontFamily: 'Impact',
  fontSize: '50px',
  textTransform: 'uppercase',
  fill: '#FFF',
  stroke: '#000',
  userSelect: 'none',
};

const ImageUpload = (props) => {
  const {
    key, sizeLimit, isUploading, containerStyles, inputStyles,
    handleImageFileChange, containerBackgroundImage, iconStyles,
    imageFileAsSvg, topCaptionText, bottomCaptionText,
  } = props;

  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInitialMount = useRef(true);
  const svgRef = useRef(null);
  const svgImageRef = useRef(null);
  const [imageInBase64, setImageInBase64] = useState('');

  useEffect(() => {
    if (isInitialMount.current) {
      if (containerBackgroundImage) {
        imageContainerRef.current.style.backgroundImage = `url("${containerBackgroundImage}")`;
      }
      isInitialMount.current = false;
    }
  });

  const convertSvgToBlob = (svg) => {
    // let svgBlob = null;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement('img');
    img.setAttribute(
      'src', `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`,
    );
    img.onload = function () {
      canvas.getContext('2d').drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL('image/png');
      canvas.toBlob((blobFile) => {
        console.log('blobFile', blobFile);
        // svgBlob = blobFile;
        handleImageFileChange(blobFile);
        console.log('canvasdata', canvasdata);
      });
    };
  };

  const handleFileChange = () => {
    const imageFile = imageInputRef.current.files[0];
    console.log('imageFile', imageFile);
    if (imageFile.size > sizeLimit) {
      const sizeLimitInMb = sizeLimit / 1000000;
      setImageError(`image size should not be more than ${sizeLimitInMb}mb`);
    } else {
      setImageError('');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        imageContainerRef.current.style.backgroundImage = `url("${reader.result}")`;
        setImageInBase64(reader.result);
      }, false);

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }

      if (!imageFileAsSvg) {
        handleImageFileChange(imageFile);
      }
    }
  };

  useEffect(() => {
    if (svgRef.current && imageFileAsSvg && imageInBase64 && topCaptionText) {
      console.log('svgRef', svgRef);
      convertSvgToBlob(svgRef.current);
    }
  }, [svgRef, imageFileAsSvg, imageInBase64, topCaptionText]);

  const renderSvg = () => {
    const baseImage = new Image();
    baseImage.src = imageInBase64;
    const wrh = baseImage.width / baseImage.height;
    const newWidth = baseImage.width || 600;
    const newHeight = newWidth / wrh;

    return (
      <svg
        width={newWidth}
        id="svg_ref"
        height={newHeight}
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <image
          width={baseImage.width}
          height={baseImage.height}
          ref={svgImageRef}
          xlinkHref={imageInBase64}
        />
        <text
          style={textStyle}
          x="50%"
          y="10%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {topCaptionText}
        </text>
        <text
          style={textStyle}
          x="50%"
          y="90%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {bottomCaptionText}
        </text>
      </svg>
    );
  };

  const renderImage = () => (
    <div className="us-upload__image" ref={imageContainerRef} style={containerStyles}>
      {!!topCaptionText && imageFileAsSvg && !!imageInBase64
        && <div className="topCaptionText">{topCaptionText}</div>
      }

      <input type="file" name="picture-input" ref={imageInputRef}
        className="picture-input" accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange} disabled={isUploading}
        style={inputStyles}
      />
      <div style={{ display: 'block', zIndex: '-10' }}>
        {imageFileAsSvg && !!imageInBase64 && renderSvg()}
      </div>
      <div className="icon" style={iconStyles}>
        <FontAwesome name="image" size="2x" />
      </div>

      {!!bottomCaptionText && imageFileAsSvg && !!imageInBase64
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
  imageFileAsSvg: PropTypes.bool,
  topCaptionText: PropTypes.string,
  bottomCaptionText: PropTypes.string,
};

ImageUpload.defaultProps = {
  key: '1',
  sizeLimit: defaultImageSizeLimit,
  isUploading: false,
  containerBackgroundImage: '',
  imageFileAsSvg: false,
  topCaptionText: '',
  bottomCaptionText: '',
};

export default ImageUpload;
