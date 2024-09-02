import PropTypes from "prop-types";

const InputField = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  disabled = false,
  readOnly = false,
  id,
  name,
  autoComplete,
  required = false,
  maxLength,
  minLength,
  pattern,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      disabled={disabled}
      readOnly={readOnly}
      id={id}
      name={name}
      autoComplete={autoComplete}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
    />
  );
};

// Adding PropTypes for props validation
InputField.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "search",
    "tel",
    "url",
  ]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
};

export default InputField;
