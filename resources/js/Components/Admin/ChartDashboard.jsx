import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import '../../../../public/css/style.css';

const ChartDashboard = ({ chart, fromUsers }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dataByMonth = {};
    chart.forEach(item => {
        dataByMonth[item.month] = item.count;
    });

    const data = [];
    for (let i = 1; i <= 12; i++) {
        const month = monthNames[i - 1];
        const total = dataByMonth[i] || 0;
        data.push({ month, total })
    }

    const HumanReadableTime = ({ timestamp }) => {
        const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        return <span>{timeAgo}</span>;
    };

    const userNews = fromUsers.map((user, index) => (
        <div className="card-news" key={index}>
            <p style={{ fontWeight: "bold", color: "#555", fontFamily: "Ubuntu, sans-serif" }}>{user.author}</p>
            <p style={{ fontSize: "13px" }}>{user.email}</p>
            <p className='truncate' style={{ fontWeight: "600", color: "#888" }}>{user.title}</p>
            <p className="text-end" style={{ fontSize: "14px" }}>
                <HumanReadableTime timestamp={user.created_at} />
            </p>
        </div>
    ));

    return (
        <div className='box-chart'>
            <div className="card-chart">
                <div className='chart'>
                    <p>Statisik Berita Perbulan</p>
                    <LineChart
                        width={1000}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>

            </div>

            <div className="box-news">
                <div className="title">
                    <p>Berita bulan ini dari user</p>
                </div>
                <div className="news bg-gray-300">
                    {userNews}
                </div>
            </div>
        </div >
    );
};

export default ChartDashboard;
