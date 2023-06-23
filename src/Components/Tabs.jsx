/* eslint-disable react/prop-types */
import { useState } from "react";

const Tabs = ({ data, handleTimeWindow }) => {
  const [selected, setSelected] = useState(0);

  const handleSelection = (idx, value) => {
    setSelected(idx);
    handleTimeWindow(value);
  };

  return (
    <div>
      <div className="flex gap-4">
        {data.map((tab, index) => {
          return (
            <div
              key={index}
              className={`text-white text-sm border p-2 w-16 text-center  cursor-pointer ${
                selected === index
                  ? "bg-gradient-to-r from-[#36D1DC] to-[#5B86E5]"
                  : ""
              }`}
              onClick={() => handleSelection(index, tab.value)}
            >
              {tab.time}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
