import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

const Textarea = ({
  name, value, placeholder, onChange, info, error, required, styles,
}) => {
  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;

  return (
    <div className="form-input">
      <ReactQuill value={value} onChange={onChange} placeholder={newPlaceholder} style={styles} />
      {!error && <span className="info">{info}</span>}
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default Textarea;
