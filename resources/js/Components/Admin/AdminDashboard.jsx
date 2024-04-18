import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css'

const AdminDashboard = () => {
    return (
        <div className=" box-cardb ">
            <div className="cardb mb-6">
                <div className="box-icon bg-emerald-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw ">
                    Bertia Pending
                    <p>123</p>
                </div>
            </div>

            <div className="cardb">
                <div className="box-icon bg-sky-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw">
                    Total Berita
                    <p>1234</p>
                </div>
            </div>
            <div className="cardb">
                <div className="box-icon bg-sky-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw">
                    Total admin
                    <p>1234</p>
                </div>
            </div>
            <div className="cardb">
                <div className="box-icon bg-sky-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw">
                    Total User
                    <p>1234</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;