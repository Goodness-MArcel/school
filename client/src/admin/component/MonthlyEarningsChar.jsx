import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Dummy earnings data
const data = [
    { month: "Jan", earnings: 4000 },
    { month: "Feb", earnings: 3000 },
    { month: "Mar", earnings: 5000 },
    { month: "Apr", earnings: 7000 },
    { month: "May", earnings: 6000 },
    { month: "Jun", earnings: 8000 },
    { month: "Jul", earnings: 7500 },
    { month: "Aug", earnings: 6500 },
    { month: "Sep", earnings: 9000 },
    { month: "Oct", earnings: 10000 },
    { month: "Nov", earnings: 9500 },
    { month: "Dec", earnings: 12000 },
];

function MonthlyEarningsAreaChart() {
    return (
        <div className=" rounded p-3" >
            <p className="mb-5">Monthly Earnings</p>
            <ResponsiveContainer width="100%" height={230} style={{ fontSize: '12px' }}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="#007bff"
                        fill="rgba(0, 123, 255, 0.3)"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyEarningsAreaChart;

