import { Inertia } from "@inertiajs/inertia";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const isTableData = (data) => {
    const [redirect, SetRedirect] = useState(false);
    const [modal, setModal] = useState(false);
    const handleRedirectTo = () => {
        SetRedirect(true);
    }
    if (redirect) {
        Inertia.get(route('add.user'))
    }

    function HumanReadableTime({ timestamp }) {
        const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        return <span>{timeAgo}</span>
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
                            <th scope='col'>Aksi</th>
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
                                    <td>
                                        <button onClick={() => setModal(true)} className="mx-2 btn border-none bg-sky-500 text-white">View</button>
                                        <button className="btn bg-rose-500 text-white border-none">Hapus</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className="modalU">
                    <div className="box-modal">
                        <div className="w-full text-black text-end text-bold" style={{ marginBottom: "12px", fontSize: "22px" }}>
                            <FontAwesomeIcon icon={faXmark} onClick={() => setModal(false)} className="cursor-pointer" />
                        </div>
                        <div className="card-modal">
                            <input type="text" className=" bg-white text w-full" />
                            <input type="email" className=" bg-white text w-full" />
                            <input type="password" className=" bg-white text w-full" />
                        </div>
                        <div className="w-full h-full flex justify-end items-center">
                            <button className="btn bg-black rounded-md text-white">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


const noData = () => {
    const [redirect, SetRedirect] = useState(false);
    const handleRedirectTo = () => {
        SetRedirect(true);
    }
    if (redirect) {
        Inertia.get(route('add.user'));
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
                        <div className="text-center">Belum ada data user</div>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TableUser = ({ data }) => {
    return data.length === 0 ? noData() : isTableData(data);
}

export default TableUser;