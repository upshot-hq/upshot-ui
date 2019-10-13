import React, {
  useRef, useState, Fragment, useEffect,
} from 'react';
// import PropTypes from 'prop-types';

import './BestCaption.scss';
import memeImage from '../../assets/memeImg.jpg';
// import Loader from '../Loader';
// const memeImageSrc = '/assets/memeImg.jpg';

const newWidth = 300;
let newHeight = 300;
const textStyle = {
  fontFamily: 'Impact',
  fontSize: '50px',
  textTransform: 'uppercase',
  fill: '#FFF',
  stroke: '#000',
  userSelect: 'none',
};

const BestCaption = () => {
  const svgRef = useRef();
  const imageRef = useRef();
  const [base64, setBase64] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const getBase64Image = () => {
    const baseImage = new Image();
    baseImage.src = memeImage;
    // baseImage.src = memeImage;
    console.log('memeImage: ', memeImage);

    console.log('baseImage: ', baseImage);

    const wrh = baseImage.width / baseImage.height;
    // const newWidth = 600;
    newHeight = newWidth / wrh;

    const canvas = document.createElement('canvas');
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(baseImage, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    console.log('dataUrl: ', dataURL);
    return dataURL;
  };

  const convertSvgToImage = () => {
    console.log(svgRef);
    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    console.log('svgData: ', svgData);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement('img');
    const svgDataBTOA = btoa(unescape(encodeURIComponent(svgData)));
    console.log('svgDataBTOA: ', svgDataBTOA);
    img.setAttribute(
      'src',
      `data:image/svg+xml;base64,${svgDataBTOA}`,
    );
    img.onload = function () {
      canvas.getContext('2d').drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = 'meme.png';
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  };

  const handleFileChange = () => {
    const dataURL = getBase64Image();
    setBase64(dataURL);
  };

  const changeText = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'bottomText') {
      setBottomText(value);
    } else if (name === 'topText') {
      setTopText(value);
    }
  };

  const renderSvg = () => (
    <svg
      width={newWidth}
      id="svg_ref"
      height={newHeight || 0}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        ref={imageRef}
        xlinkHref={base64}
        width={newWidth}
        height={newHeight || 0}
        x="0%"
      />
      <text
        style={{ ...textStyle, zIndex: 1 }}
        x="50%"
        y="10%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {topText}
      </text>
      <text
        style={textStyle}
        x="50%"
        y="90%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {bottomText}
      </text>
    </svg>
  );

  return (
    <div>
      {!!base64 && renderSvg()}
      {!!base64
        && <Fragment>
          <input
            className="form-control" type="text" name="topText" id="topText"
            placeholder="Add text to the top" onChange={changeText}
          />

          <input
            className="form-control" type="text" name="bottomText" id="bottomtext"
            placeholder="Add text to the bottom" onChange={changeText}
          />
        </Fragment>
      }

      <br />
      <button onClick={handleFileChange} className="btn btn-primary">buildSVG!</button>
      &nbsp; &nbsp;
      <button onClick={convertSvgToImage} className="btn btn-primary">Download Meme!</button>
    </div>
  );
};

export default BestCaption;
