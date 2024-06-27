import React, { useState } from 'react';

interface DropdownProps {
  label?: string; // Optional label for the dropdown
  options: string[]; // Array of options for the dropdown
  onChange?: (value: string) => void; // Callback function for handling selection changes
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
  // State to manage isOpen state of the dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to handle option selection
  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false);
    onChange?.(value); // Call the provided onChange function if available
  };

  // JSX to render the dropdown component
  return (
    <div className="relative">
      {/* Render the label if provided */}
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {/* Display the selected option or default text */}
        {isOpen ? options[0] : selectedValue ? selectedValue: 'Select an option'}
      </button>
      {/* Render the dropdown list conditionally */}
      {isOpen && (
        <ul className="absolute z-50 mt-1 rounded-md shadow-sm bg-white overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              className="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

