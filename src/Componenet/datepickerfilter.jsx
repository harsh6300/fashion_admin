import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);

  const formattedDateRange = `${format(range[0].startDate, 'MM/dd/yyyy')} - ${format(range[0].endDate, 'MM/dd/yyyy')}`;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        readOnly
        className="border-[#dce7f2] cursor-pointer text-[#5E5873] rounded-[6px] text-sm border h-[35px] ps-[5px] pe-[10px]"
        value={formattedDateRange}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <div className="absolute  -right-3 z-50 mt-1 bg-white shadow-lg rounded">
          <DateRange
            editableDateInputs={true}
            onChange={item => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
