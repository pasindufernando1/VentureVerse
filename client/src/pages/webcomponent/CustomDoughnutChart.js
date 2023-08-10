import React from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const CustomDoughnutChart = () => {
    const data = [
        { name: 'Geeksforgeeks', students: 400, color: 'purple' },
        { name: 'Technical scripter', students: 700, color: 'green' }
    ];

    const COLORS = data.map((entry) => entry.color || 'purple');

    return (
        <div className=''>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="students"
                    outerRadius={100}
                    innerRadius={70}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend
                    iconType="circle" // You can change the legend icon type here
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                />
            </PieChart>
        </div>
    );
};

export default CustomDoughnutChart;