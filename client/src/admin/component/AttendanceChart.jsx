import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example attendance data (0–100%)
const data = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 85 },
  { day: "Wed", attendance: 78 },
  { day: "Thu", attendance: 95 },
  { day: "Fri", attendance: 88 },
  { day: "Sat", attendance: 60 },
  { day: "Sun", attendance: 70 },
];

function AttendanceChart() {
  return (
    <div className="rounded p-3">
      <p className="mb-5">Weekly Attendance</p>
      <ResponsiveContainer width="100%" height={230} style={{ fontSize: '12px',color: 'black' }}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Line type="monotone" dataKey="attendance" stroke="#007bff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
