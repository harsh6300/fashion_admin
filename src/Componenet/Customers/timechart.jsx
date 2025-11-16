import React from "react";

const TimelineBar = () => {
    // Step 1: Time block data
    const timeBlocks = [
        { start: "08:00", end: "10:00", type: "active" },
        { start: "10:00", end: "10:30", type: "idle" },
        { start: "10:30", end: "14:30", type: "active" },
        { start: "14:30", end: "16:30", type: "idle" },
        { start: "16:30", end: "20:00", type: "active" },
        { start: "20:00", end: "20:30", type: "idle" },
        { start: "20:30", end: "21:00", type: "offline" },
        { start: "21:00", end: "21:15", type: "offline" }
    ];

    const timeLabels = [
        "06:00", "07:00", "08:00", "09:00", "10:00",
        "11:00", "12:00", "01:00", "02:00", "03:00",
        "04:00", "05:00", "06:00", "07:00", "08:00",
        "09:00", "10:00", "11:00"
    ];

    // Step 2: Utility to convert time to minutes
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const getPercentage = (start, end, rangeStart, rangeEnd) => {
        const total = rangeEnd - rangeStart;
        const blockStart = timeToMinutes(start) - rangeStart;
        const blockEnd = timeToMinutes(end) - rangeStart;
        return {
            left: (blockStart / total) * 100,
            width: ((blockEnd - blockStart) / total) * 100
        };
    };

    const getColor = (type) => {
        switch (type) {
            case "active":
                return "bg-green-500";
            case "idle":
                return "bg-yellow-400";
            case "offline":
                return "bg-blue-500";
            default:
                return "bg-gray-300";
        }
    };

    // Step 3: Define start and end range
    const startRange = timeToMinutes("06:00");
    const endRange = timeToMinutes("11:00") + 24 * 60; // next-day 11:00 to support overflow like 14:00, 21:00

    return (
        <div className="pt-4 w-full">
            <div className="relative h-6 bg-white rounded">
                {timeBlocks.map((block, index) => {
                    const { left, width } = getPercentage(block.start, block.end, startRange, endRange);
                    const spacing = 0.3; // percentage gap between bars
                    return (
                        <div
                            key={index}
                            className={`absolute h-full ${getColor(block.type)} rounded-sm`}
                            style={{
                                left: `${left + spacing / 2}%`,
                                width: `${width - spacing}%`
                            }}
                        ></div>
                    );
                })}
            </div>


            {/* Time labels */}
            <div className="relative flex-wrap  flex gp justify-between text-xs text-gray-500 mt-3">
                {timeLabels.map((label, idx) => (
                    <span key={idx} className=" text-center">{label}</span>
                ))}
            </div>
        </div>
    );
};

export default TimelineBar;
