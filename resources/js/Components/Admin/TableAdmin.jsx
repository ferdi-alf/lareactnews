import '../../../../public/css/style.css'
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';


const TableAdmin = ({ data }) => {
    const [shouldRedirectTo, setShouldRedirectTo] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        await Inertia.get('/data-admin', { search })
    }

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