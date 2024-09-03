import { useState, useRef } from "react";
import { AiOutlineWarning } from "react-icons/ai"; // Import warning and calendar icons
import { TbCalendarCheck } from "react-icons/tb";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CandidateDetailsSection = () => {
  const [candidateName, setCandidateName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateStarted, setDateStarted] = useState(null);
  const [dateExited, setDateExited] = useState(null);
  const [isDateStartedValid, setIsDateStartedValid] = useState(true);
  const [isDateExitedValid, setIsDateExitedValid] = useState(true);

  // Refs for the DatePickers
  const dateStartedRef = useRef(null);
  const dateExitedRef = useRef(null);

  const handleDateChange = (setter, setValid, date, compareDate = null) => {
    const formattedDate = date ? date.toLocaleDateString("en-US") : "";
    setter(formattedDate);
    const dateString = date ? date.toISOString().split("T")[0] : "";

    const isValid = validateDate(dateString);

    if (compareDate) {
      const compareDateString = compareDate
        ? compareDate.toISOString().split("T")[0]
        : "";
      if (!validateDate(compareDateString)) {
        setValid(false);
        return;
      }

      if (date < compareDate) {
        setValid(false);
        return;
      }
    }

    setValid(isValid);
  };

  const validateDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Regex to match YYYY-MM-DD format
    if (!regex.test(date)) {
      console.log(`Invalid format: ${date}`);
      return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate.getTime() < currentDate.getTime()) {
      console.log(`Date is in the past: ${date}`);
      return false;
    }

    const currentYear = currentDate.getFullYear();
    if (year < currentYear || year > currentYear + 10) {
      console.log(`Year out of range: ${date}`);
      return false;
    }

    return true;
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
          <input
            type="text"
            id="candidateName"
            placeholder="Enter the candidate's name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-shadow duration-300"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black mb-1"
            htmlFor="department"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            placeholder="Enter the department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-shadow duration-300"
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
        <input
          type="text"
          id="designation"
          placeholder="Enter the designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-shadow duration-300"
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
          <div className="relative">
            <div className="relative">
              <DatePicker
                selected={dateStarted ? new Date(dateStarted) : null}
                onChange={(date) =>
                  handleDateChange(setDateStarted, setIsDateStartedValid, date)
                }
                dateFormat="MM-dd-yyyy"
                placeholderText="MM-DD-YYYY"
                className={`w-full p-2 relative pr-10 border rounded-lg focus:outline-none focus:ring-2 uppercase text-blue-500 focus:ring-blue-500 placeholder-blue-500 ${
                  !isDateStartedValid ? "border-red-500" : ""
                }`}
                ref={dateStartedRef} // Attach ref to the DatePicker
              />
              <TbCalendarCheck
                className="absolute top-1/2 right-20 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => dateStartedRef.current.setFocus()} // Focus the DatePicker input when icon is clicked
              />
            </div>
          </div>
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
          <div className="relative">
            <div className="relative">
              <DatePicker
                selected={dateExited ? new Date(dateExited) : null}
                onChange={(date) =>
                  handleDateChange(
                    setDateExited,
                    setIsDateExitedValid,
                    date,
                    dateStarted ? new Date(dateStarted) : null
                  )
                }
                dateFormat="MM-dd-yyyy"
                placeholderText="MM-DD-YYYY"
                className={`w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 uppercase placeholder-blue-500 text-blue-500 focus:ring-blue-500 ${
                  !isDateExitedValid ? "border-red-500" : ""
                }`}
                disabled={!isDateStartedValid || !dateStarted}
                ref={dateExitedRef} // Attach ref to the DatePicker
              />
              <TbCalendarCheck
                className="absolute top-1/2 right-20 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => dateExitedRef.current.setFocus()} // Focus the DatePicker input when icon is clicked
              />
            </div>
          </div>
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
