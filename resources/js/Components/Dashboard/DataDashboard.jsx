import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css';
import Chart from 'chart.js/auto';



const DataDashboard = ({ total }) => {
    console.log('total: ', total)

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
            }
        }
    };

    if (window.myPolarAreaChart) {
        window.myPolarAreaChart.destroy();
    }

    const ctx = document.getElementById('polarChart');
    window.myPolarAreaChart = new Chart(ctx, chartConfig);

    return (
        <>
            <div className="flex box-cardw flex-wrap w-full justify-around">
                <div className="cardw mb-6 bg-slate-700">
                    <div className="box-icon bg-emerald-600">
                        <FontAwesomeIcon icon={faNewspaper} className="icon" />
                    </div>
                    <div className="textw">
                        Total berita anda:
                        <p>{total.totalBerita}</p>
                    </div>
                </div>

                <div className="cardw bg-slate-700">
                    <div className="box-icon bg-sky-600">
                        <FontAwesomeIcon icon={faNewspaper} className="icon" />
                    </div>
                    <div className="textw">
                        Total Berita Hari ini:
                        <p>{total.totalBeritaHariIni}</p>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-wrap justify-around">
                <div className="w-1/2 bg-white overflow-x-auto">
                    <canvas id="polarChart" className="w-full"></canvas>
                </div>
            </div>
        </>
    )
}

export default DataDashboard;