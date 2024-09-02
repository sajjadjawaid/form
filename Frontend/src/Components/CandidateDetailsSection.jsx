import { useState, useRef } from "react";
import InputField from "./InputField";
// import { TbCalendarCheck } from "react-icons/tb";
import { AiOutlineWarning } from "react-icons/ai"; // Import warning icon

const CandidateDetailsSection = () => {
  // State to manage form input values
  const [candidateName, setCandidateName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [dateExited, setDateExited] = useState("");
  const [isDateStartedValid, setIsDateStartedValid] = useState(true);
  const [isDateExitedValid, setIsDateExitedValid] = useState(true);

  // Refs for input fields to control focus
  const dateStartedRef = useRef(null);
  const dateExitedRef = useRef(null);

  // Function to validate date in YYYY-MM-DD format
  const validateDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    // Handle month length based on month and leap years
    const daysInMonth = [
      31,
      28 + (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    return day > 0 && day <= daysInMonth[month - 1];
  };

  // Handle date input change with validation
  const handleDateChange = (setter, setValid, value) => {
    setter(value);
    setValid(validateDate(value));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Candidate Details</h2>

      {/* Row for Name of the Candidate and Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Name of the Candidate */}
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="candidateName"
          >
            Name of the Candidate
          </label>
          <InputField
            type="text"
            id="candidateName"
            placeholder="Enter the candidate's name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full hover:shadow-lg transition-shadow duration-300"
          />
        </div>

        {/* Department */}
        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="department"
          >
            Department
          </label>
          <InputField
            type="text"
            id="department"
            placeholder="Enter the department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Row for Designation */}
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-black mb-1"
          htmlFor="designation"
        >
          Designation
        </label>
        <InputField
          type="text"
          id="designation"
          placeholder="Enter the designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="w-full hover:shadow-lg transition-shadow duration-300"
        />
      </div>

      {/* Row for Date Started and Date of Exiting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Date Started */}
        <div
          className={`relative ${
            !isDateStartedValid ? "bg-red-100 p-2 rounded" : ""
          }`}
        >
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="dateStarted"
          >
            Date Started
          </label>
          <InputField
            type="date"
            id="dateStarted"
            value={dateStarted}
            onChange={(e) =>
              handleDateChange(
                setDateStarted,
                setIsDateStartedValid,
                e.target.value
              )
            }
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 uppercase text-blue-500 focus:ring-blue-500 ${
              !isDateStartedValid ? "border-red-500" : ""
            }`}
            ref={dateStartedRef}
          />

          <div className="mt-1">
            <small className="text-gray-600">Date</small>
            {!isDateStartedValid && (
              <div className="flex items-center mt-1 text-white bg-red-500 p-2 rounded">
                <AiOutlineWarning className="mr-2" />
                <small>
                  This date is not valid. The date format is YYYY-MM-DD.
                </small>
              </div>
            )}
          </div>
        </div>

        {/* Date of Exiting */}
        <div
          className={`relative ${
            !isDateExitedValid ? "bg-red-100 p-2 rounded" : ""
          }`}
        >
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="dateExited"
          >
            Date of Exiting
          </label>
          <InputField
            type="date"
            id="dateExited"
            value={dateExited}
            onChange={(e) =>
              handleDateChange(
                setDateExited,
                setIsDateExitedValid,
                e.target.value
              )
            }
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 uppercase text-blue-500 focus:ring-blue-500 ${
              !isDateExitedValid ? "border-red-500" : ""
            }`}
            ref={dateExitedRef}
          />

          <div className="mt-1">
            <small className="text-gray-600">Date</small>
            {!isDateExitedValid && (
              <div className="flex items-center mt-1 text-white bg-red-500 p-2 rounded">
                <AiOutlineWarning className="mr-2" />
                <small>
                  This date is not valid. The date format is YYYY-MM-DD.
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsSection;
