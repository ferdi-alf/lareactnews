import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../../../../public/css/style.css'

const ChartDashboard = ({ chart }) => {
    // Membuat array untuk nama bulan
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


    return (
        <div className='box-chart'>
            <div className='chart'>
                <p>Statisic Berita Perbulan</p>
                <LineChart
                    width={800}
                    className='line'
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

            <div className="box-news">
                <div className="title">
                    <p>Berita bulan ini dari user</p>
                </div>
                <div className="news bg-gray-300">
                    <div className="card-news">
                        <p style={{ fontWeight: "bold" }}>Ferdi</p>
                        <p style={{ fontSize: "12px" }}>Ferdi@gmail.com</p>
                        <p className='truncate'>Seseorang, ini adalah titla berita oejqudhuwrh2ygcyrgvtugvruwyjg</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChartDashboard;
