import React from "react";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('Campus');
    const options = [
        'Campus',
        'Dining Commons',
    ];

    const handleChange = (option: string) => {
        setValue(option);
        setIsOpen(false);
    }

    return (
        <main className="font-red-hat relative text-primary">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row w-[116px] gap-x-[10px] rounded-[30px] bg-[#ECF5F7] px-[16px] py-[8px] justify-center items-center"
            >
                {value}
                <FaChevronDown/>
            </button>

            {isOpen && (
                <div className="absolute justify-center flex flex-col items-center bg-[#ECF5F7] z-10 w-full ">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="text-center cursor-pointer"
                            onClick={() => handleChange(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
};

export default Dropdown;