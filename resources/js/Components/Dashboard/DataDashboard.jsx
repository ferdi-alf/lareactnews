import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css'

const DataDashboard = ({ total }) => {
    console.log('total: ', total)
    return (
        <div className="flex flex-wrap w-full justify-around">
            <div className="cardw bg-slate-700">
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
    )
}

export default DataDashboard;