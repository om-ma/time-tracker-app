import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const CustomDropdown = ({ options, selectedOption, onOptionSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: any) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <button
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          <span>{selectedOption.label}</span>
        </div>
        <FaChevronDown className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option: any) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              <FaCheckCircle className="text-green-500 mr-2" />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
