import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './styles.scss';

const Textarea = (props) => {
  const {
    id, name, value, title, type, placeholder,
    onChange, info, error, required,
  } = props;

  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;

  return (
    <Fragment>

      <div className="form-input">
        {title && <div className="title">{title}</div>}
        <textarea type={type} name={name}
          id={id} className="text-input textarea"
          placeholder={newPlaceholder}
          maxLength={150} rows={3}
          onChange={onChange}
          value={value}
          required={required}
        />
        <ReactQuill defaultValue={value} onChane={onChange} theme={null} />

        {info && !error && <span className="info">{info}</span>}
        {error && <span className="error" id={`${name}-error`}>{error}</span>}
      </div>
    </Fragment>
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
