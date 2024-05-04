import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css';
import Chart from 'chart.js/auto';
import { useState, useEffect } from "react";
import SkeletonDashboard from "./SkeletonDashboard";



const DataDashboard = ({ total, pesan }) => {
    const { pesanReject, pesanConfirm } = pesan;
    const allPesan = [...pesanReject, ...pesanConfirm];
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 10000)

        fectDataFromServer().then(() => {
            clearTimeout(timeout);
            setLoading(false);
        })
            .catch((error) => {
                console.error('error', error)
                clearImmediate(timeout);
                setLoading(false);
            });
    }, []);
    const fectDataFromServer = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        })
    }

    useEffect(() => {
        const chartData = {
            labels: ['Diterima', 'Ditolak'],
            datasets: [{
                label: 'Total Berita',
                data: [total.totalConfirm, total.totalRejected],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        const chartConfig = {
            type: 'polarArea',
            data: chartData,
            options: {
                scales: {
                    y: { beginAtZero: true }
                },
                responsive: true
            }
        };

        if (window.myPolarAreaChart) {
            window.myPolarAreaChart.destroy();
        }

        const ctx = document.getElementById('polarChart');
        window.myPolarAreaChart = new Chart(ctx, chartConfig);
    }, [total]);

    allPesan.sort((pesan1, pesan2) => {
        return new Date(pesan1.created_at) - new Date(pesan2.created_at);
    })

    const renderAllPesanReject = allPesan.map((pesan, index) => (
        <div key={index} >
            <div className={pesan.type === 'reject' ? 'tolak' : 'terima'} style={{ borderRadius: "8px", padding: "5px 0 3px 7px" }}>
                <p style={{ fontSize: "11px" }}>Kepada:<span style={{ fontWeight: "bold" }}>{pesan.user_name}</span></p>
                <p style={{ fontSize: "11px" }}>Email:<span style={{ fontWeight: "bold" }}>{pesan.user_email}</span></p>

                <div style={{ marginTop: "5px" }} className="message-title ">
                    <p style={{ fontWeight: "400", fontSize: "12px" }}>Judul Berita: <span style={{ fontWeight: "600", fontSize: "12px" }}>{pesan.title}</span></p>
                </div>
                {pesan.type === 'reject' ? (
                    <div style={{ marginTop: "9px" }}>
                        <p className="pemberitahuan" style={{ fontWeight: "600", fontSize: "13px" }}> Berita anda di tolak oleh admin</p>
                        <div className="">
                            <p style={{ fontWeight: "400", fontSize: "13px" }}>Pesan:</p>
                            <p style={{ fontWeight: "600", fontSize: "14px" }}>{pesan.message}</p>
                        </div>
                    </div>
                ) :
                    (<p className="pemberitahuan" style={{ fontWeight: "600", fontSize: "13px" }}>Berita anda telah di terima admin</p>)}

                <div className="flex flex-nowrap" style={{ columnGap: "8px", marginTop: "4px" }}>
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>{pesan.admin_name}</p>
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>{pesan.admin_email}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            {loading ? <SkeletonDashboard /> : (
                <>
                    <div className="flex box-cardw flex-wrap w-full justify-around">
                        <div className="cardw mb-6 bg-white shadow-lg">
                            <div className="box-icon bg-emerald-600">
                                <FontAwesomeIcon icon={faNewspaper} className="icon" />
                            </div>
                            <div className="textw truncate text-black">
                                Total berita anda:
                                <p className="text-center">{total.totalBerita}</p>
                            </div>
                        </div>

                        <div className="cardw bg-white shadow-lg">
                            <div className="box-icon bg-sky-600">
                                <FontAwesomeIcon icon={faNewspaper} className="icon" />
                            </div>
                            <div className="textw truncate text-black">
                                Total Berita Hari ini:
                                <p className="text-center">{total.totalBeritaHariIni}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            <div className="flex flex-wrap justify-between polar-message" style={{ height: "100%", width: "90%" }}>
                <div className="bg-white overflow-x-auto polar w-auto">
                    <canvas id="polarChart" className=""></canvas>
                </div>
                <div className=" bg-white message" style={{ borderRadius: "8px" }}>
                    <div className="title-message">Pesan untuk berita</div>
                    <div className="flex overflow-x-auto flex-col gap-y-2 card-message" style={{ width: "95%", padding: "5px 6px 7px 8px", }}>
                        {renderAllPesanReject}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataDashboard;