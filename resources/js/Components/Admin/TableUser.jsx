import { Inertia } from "@inertiajs/inertia";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';




const isTableData = (data) => {
    const [redirect, SetRedirect] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        await Inertia.get('/data-user', { search })
    }

    const handleViewClick = (id) => {
        const foundData = data.find((item) => item.id === id);
        if (foundData) {
            setSelectedData(foundData);
            setSelectedId(id);
            setModalOpen(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        Inertia.post(`/update/user/id/${selectedId}`, formData);
    }

    const handleDelete = async (id) => {
        try {
            const { isConfirmed } = await Swal.fire({
                icon: "warning",
                title: "Warning!!",
                text: "Yakin ingin menghapus User ini?",
                confirmButtonText: "Yes",
                confirmButtonColor: "#3085d6",
                showCancelButton: true,
                cancelButtonColor: "#d33"
            })
            if (isConfirmed) {
                await Inertia.delete(`delete/user/id/${id}`)
            }
        } catch (error) {
            console.error("Error: ", error)
            Swal.fire({
                title: "Error!",
                text: "An error occurred while processing the request. Please try again.",
                icon: "error"
            });
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
                <div className="flex items-center justify-end w-full" >
                    <form class="flex gap-x-5 form-search" onSubmit={handleForm} role="search">
                        <input class="form-control" onChange={handleSearch} value={search} type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "8px", width: "80%" }} />
                        <button class="btn btn-outline-success" type="submit" style={{ background: "transparent", border: "1px solid #97e3a9", color: "#155724" }}>Search</button>
                    </form>
                </div>
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
                                    <td className="flex flex-nowrap">
                                        <button onClick={() => handleViewClick(data.id)} className="mx-2 btn border-none bg-sky-500 text-white">View</button>
                                        <button onClick={() => handleDelete(data.id)} className="btn  bg-rose-500 text-white border-none">Hapus</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className={modalOpen ? 'modalU active' : 'modalU'}>
                <div className="box-modal">
                    <div className="w-full text-black text-end text-bold" style={{ marginBottom: '12px', fontSize: '22px' }}>
                        <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} className="cursor-pointer close" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-modal">
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={selectedData?.name || ''}
                                className="bg-white text w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={selectedData?.email || ''}
                                className="bg-white text w-full"
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white text w-full"
                            />
                        </div>
                        <div className="w-full h-full flex justify-end items-center">
                            <button
                                className="btn bg-black rounded-md text-white">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div >
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