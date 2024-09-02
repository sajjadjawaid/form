import PropTypes from "prop-types";

const QuestionWithDropdown = ({
  question,
  options,
  value,
  onChange,
  id,
  className = "",
  disabled = false,
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-black">
        {question}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        disabled={disabled}
        required={required}
      >
        {/* Render each option dynamically */}
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-gray-500" // Ensure the option text is grey
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Adding PropTypes for props validation
QuestionWithDropdown.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default QuestionWithDropdown;
