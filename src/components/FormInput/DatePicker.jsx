import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const DatePickerInput = ({
  name, value, title, onChange, info, error, required,
}) => {

  const handleChange = (datetime) => {
    const dateFormat = 'YYYY-MM-DDTHH:mm:ss';
    const formattedDate = moment(datetime).format(dateFormat);
    const event = {
      persist: () => {},
      target: {
        name,
        value: formattedDate,
      },
    };
    onChange(event);
  };


  return (
    <div className="form-input">
					<div className="title">{title}</div>
					<DateTimePicker
          name={name}
          value={new Date(value)}
          className="date-picker"
          onChange={handleChange}
          required={required}
          />
          {!error && <span className="info">{info}</span>}
          {error && <span className="error" id={`${name}-error`}>{error}</span>}
				</div>
  );
};

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerInput;
