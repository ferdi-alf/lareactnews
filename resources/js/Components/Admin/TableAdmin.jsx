import { Link } from '@inertiajs/react';
import '../../../../public/css/style.css'
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';





const TableAdmin = ({ data }) => {
    const [shouldRedirectTo, setShouldRedirectTo] = useState(false);
    const handleRedirectTo = () => {
        setShouldRedirectTo(true);
    }
    if (shouldRedirectTo) {
        Inertia.get(route('add.admin'));
    }

    function HumanReadableTime({ timestamp }) {
        const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        return <span>{timeAgo}</span>;
    }


    return (
        <div className="box-table">
            <div className="button-add flex justify-star items-center" style={{ width: "90%" }}>
                <button className="btn btn-success text-bold text-white" onClick={handleRedirectTo}>Tambah Data +</button>
            </div>
            <div className="tableP" style={{ width: "90%" }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope='col'>Dibuat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td className="truncate overflow-hidden">
                                        <div className="truncate w-32">
                                            {data.name}
                                        </div>
                                    </td>
                                    <td className=" ">
                                        <div className="truncate w-52">
                                            {data.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="w-32">
                                            <HumanReadableTime timestamp={data.created_at} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableAdmin;