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
    const regex = /^\d{2}-\d{2}-\d{4}$/; // Regex to match MM-DD-YYYY format
    if (!regex.test(date)) {
      console.log(`Invalid format: ${date}`); // Debug statement
      return false; // Date does not match the format
    }

    const [month, day, year] = date.split("-").map(Number); // Split using MM-DD-YYYY order

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

    // Check if the month and day are valid
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      console.log(`Invalid date: ${date}`); // Debug statement
      return false; // Invalid month or day
    }

    const inputDate = new Date(year, month - 1, day); // Create a Date object with the input date
    const currentDate = new Date(); // Current date
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight for accurate comparison

    // Log the dates for comparison
    console.log(`Input date: ${inputDate.toDateString()}`);
    console.log(`Current date: ${currentDate.toDateString()}`);

    // Check if the date is in the past
    if (inputDate.getTime() < currentDate.getTime()) {
      console.log(`Date is in the past: ${date}`); // Debug statement
      return false; // Invalid if the date is in the past
    }

    // Check if the year is within 10 years from the current year
    const currentYear = currentDate.getFullYear();
    if (year < currentYear || year > currentYear + 10) {
      console.log(`Year out of range: ${date}`); // Debug statement
      return false; // Invalid if the year is outside the range
    }

    return true; // Date is valid if all checks pass
  };

  const handleDateChange = (setter, setValid, value, compareDate = null) => {
    setter(value); // Set the input value
    const isValid = validateDate(value); // Validate the date format and range

    if (compareDate) {
      if (!validateDate(compareDate)) {
        setValid(false); // Invalid if the compare date is not valid
        return;
      }

      // If a compare date is provided, ensure the current date is after it
      const [inputMonth, inputDay, inputYear] = value.split("-").map(Number);
      const [compareMonth, compareDay, compareYear] = compareDate
        .split("-")
        .map(Number);

      const inputDate = new Date(inputYear, inputMonth - 1, inputDay);
      const compareToDate = new Date(compareYear, compareMonth - 1, compareDay);

      if (inputDate < compareToDate) {
        setValid(false); // Invalid if the input date is before the comparison date
        return;
      }
    }

    setValid(isValid); // Set the validity based on the date format and range
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
                false
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
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 uppercase placeholder-blue-500 text-blue-500 focus:ring-blue-500 ${
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
