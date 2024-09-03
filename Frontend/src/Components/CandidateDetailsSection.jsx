import { useState, useRef } from "react";
import InputField from "./InputField";
import { AiOutlineWarning } from "react-icons/ai"; // Import warning icon

const CandidateDetailsSection = () => {
  const [candidateName, setCandidateName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [dateExited, setDateExited] = useState("");
  const [isDateStartedValid, setIsDateStartedValid] = useState(true);
  const [isDateExitedValid, setIsDateExitedValid] = useState(true);

  const dateStartedRef = useRef(null);
  const dateExitedRef = useRef(null);

  const validateDate = (date) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(date)) {
      return false;
    }

    const [month, day, year] = date.split("-").map(Number);
    if (year < 1000 || year > 9999) {
      return false;
    }

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

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return false;
    }

    const currentYear = currentDate.getFullYear();
    if (year < currentYear || year > currentYear + 10) {
      return false;
    }

    return true;
  };

  const handleDateChange = (setter, setValid, value, compareDate = null) => {
    setter(value);
    const isValid = validateDate(value);

    if (compareDate) {
      if (!validateDate(compareDate)) {
        setValid(false);
        return;
      }

      const [inputMonth, inputDay, inputYear] = value.split("-").map(Number);
      const [compareMonth, compareDay, compareYear] = compareDate
        .split("-")
        .map(Number);

      const inputDate = new Date(inputYear, inputMonth - 1, inputDay);
      const compareToDate = new Date(compareYear, compareMonth - 1, compareDay);

      if (inputDate < compareToDate) {
        setValid(false);
        return;
      }
    }

    setValid(isValid);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Candidate Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            type="text"
            id="dateStarted"
            value={dateStarted}
            placeholder="MM-DD-YYYY"
            onChange={(e) =>
              handleDateChange(
                setDateStarted,
                setIsDateStartedValid,
                e.target.value,
                true
              )
            }
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 uppercase text-blue-500 focus:ring-blue-500 placeholder-blue-500 ${
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
                  This date is not valid. Ensure the year is four digits, the
                  date format is MM-DD-YYYY, and the date is not in the past.
                </small>
              </div>
            )}
          </div>
        </div>

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
            type="text"
            id="dateExited"
            value={dateExited}
            placeholder="MM-DD-YYYY"
            onChange={(e) =>
              handleDateChange(
                setDateExited,
                setIsDateExitedValid,
                e.target.value,
                dateStarted
              )
            }
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 uppercase text-blue-500 focus:ring-blue-500 ${
              !isDateExitedValid ? "border-red-500" : ""
            }`}
            ref={dateExitedRef}
            disabled={!isDateStartedValid || !dateStarted}
          />
          <div className="mt-1">
            <small className="text-gray-600">Date</small>
            {!isDateExitedValid && (
              <div className="flex items-center mt-1 text-white bg-red-500 p-2 rounded">
                <AiOutlineWarning className="mr-2" />
                <small>
                  This date is not valid. The date format is MM-DD-YYYY, and it
                  must be after the &quot;Date Started.&quot;
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
