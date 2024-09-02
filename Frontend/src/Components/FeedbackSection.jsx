import { useState } from "react";
import QuestionWithDropdown from "./QuestionWithDropdown"; // Adjust the path as needed

const FeedbackSection = () => {
  const [firstQuestionAnswer, setFirstQuestionAnswer] = useState("");
  const [secondQuestionAnswer, setSecondQuestionAnswer] = useState("");
  const [thirdQuestionAnswer, setThirdQuestionAnswer] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const handleFirstQuestionChange = (e) => {
    const value = e.target.value;
    setFirstQuestionAnswer(value);
    if (value !== "other") {
      setOtherDetails(""); // Clear the details if not 'other'
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* First Question */}
      <QuestionWithDropdown
        question="What was your primary reason for leaving?"
        options={[
          { value: "", label: "Please Select" },
          { value: "unsatisfactorySalary", label: "Unsatisfactory Salary" },
          {
            value: "insufficientCareerGrowth",
            label: "Insufficient Career Growth",
          },
          { value: "other", label: "Other (please specify below)" },
        ]}
        value={firstQuestionAnswer}
        onChange={handleFirstQuestionChange}
        id="firstQuestion"
        className="w-1/2"
      />
      {firstQuestionAnswer === "other" && (
        <div className="flex flex-col mb-4 mt-4">
          <label
            htmlFor="otherDetails"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Other
          </label>
          <textarea
            id="otherDetails"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            rows="4"
          />
        </div>
      )}

      {/* Second Question */}
      <QuestionWithDropdown
        question="How would you describe your experience with our company?"
        options={[
          { value: "", label: "Please Select" },
          { value: "unfavorable", label: "Unfavorable" },
          { value: "growthOriented", label: "Growth-Oriented" },
        ]}
        value={secondQuestionAnswer}
        onChange={(e) => setSecondQuestionAnswer(e.target.value)}
        id="secondQuestion"
        className="w-1/2"
      />

      {/* Third Question */}
      <QuestionWithDropdown
        question="What were the main issues you encountered?"
        options={[
          { value: "", label: "Please Select" },
          {
            value: "lackOfCoordination",
            label: "Lack of Official Coordination",
          },
          { value: "misbehavior", label: "Misbehavior of Staff" },
        ]}
        value={thirdQuestionAnswer}
        onChange={(e) => setThirdQuestionAnswer(e.target.value)}
        id="thirdQuestion"
        className="w-1/2"
      />
    </div>
  );
};

export default FeedbackSection;
