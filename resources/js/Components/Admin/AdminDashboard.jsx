import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUserSecret, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../../../public/css/style.css'



const AdminDashboard = ({ data }) => {
    return (
        <div className=" box-cardb ">
            <div className="cardb mb-6">
                <div className="box-icon bg-emerald-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw ">
                    Bertia Pending
                    <p>{data.pendingNews}</p>
                </div>
            </div>

            <div className="cardb">
                <div className="box-icon bg-sky-600">
                    <FontAwesomeIcon icon={faNewspaper} className="icon" />
                </div>
                <div className="textw">
                    Total Berita
                    <p>{data.totalBerita}</p>
                </div>
            </div>
            <div className="cardb">
                <div className="box-icon bg-red-600">
                    <FontAwesomeIcon icon={faUserSecret} className="icon" />
                </div>
                <div className="textw">
                    Total Admin
                    <p>{data.totalAdmin}</p>
                </div>
            </div>
            <div className="cardb">
                <div className="box-icon bg-purple-600">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                </div>
                <div className="textw">
                    Total User
                    <p>{data.totalUser}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;