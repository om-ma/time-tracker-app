import { useState, useEffect, useRef } from 'react';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="w-full mx-auto my-10 relative">
      {/* Custom Select Dropdown Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="block w-full py-2 pr-8 pl-3 border border-gray-300 rounded-lg text-gray-700 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Select Option
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">▼</span>
      </button>
      <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Ticket type</span>

      {/* Custom Dropdown List */}
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-index"
        >
          <li className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-100">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Story</span>
          </li>
          <li className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-100">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Bug</span>
          </li>
          <li className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-100">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Feature</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
