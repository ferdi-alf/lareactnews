import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";
import Paginator from '@/Components/Hompage/Paginator';
import '../../../../public/css/style.css'
import SkeletonMyNews from '@/Components/SkeletonMyNews';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';


export default function NewsController(props) {
    console.log("newsControl: ", props)
    const newsData = props.data.data || [];
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        await Inertia.get('/newscontroller', { search })
    }

    const handleDelete = async (id) => {
        try {
            const { isConfirmed } = await Swal.fire({
                icon: "warning",
                title: "Warning!!",
                text: "Yakin ingin menghapus berita ini?",
                confirmButtonText: "Yes",
                confirmButtonColor: "#3085d6",
                showCancelButton: true,
                cancelButtonColor: "#d33"
            })
            if (isConfirmed) {
                await Inertia.delete(route('delete.news', id))
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

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 10000);

        fectDataFromServer().then(() => {
            clearTimeout(timeout)
            setLoading(false);
        })
            .catch((error) => {
                console.error('error', error);
                clearTimeout(timeout);
                setLoading(false);
            });
    }, []);

    const handleEdit = async (id) => {
        return Inertia.get(`/news/edit/id/${id}`)
    }

    const fectDataFromServer = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        })
    }
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="news controller" />

            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {loading ? <SkeletonMyNews /> : (
                        <>
                            <div className="flex flex-col shadow-xl overflow-x-auto rounded-md justify-start p-6 bg-white border-b border-gray-200" style={{ height: "100vh" }}>
                                <div className="flex items-center justify-end w-full" >
                                    <form class="flex gap-x-5 form-search" onSubmit={handleForm} role="search">
                                        <input class="form-control" onChange={handleSearch} value={search} type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "8px", width: "80%" }} />
                                        <button class="btn btn-outline-success" type="submit" style={{ background: "transparent", border: "1px solid #97e3a9", color: "#155724" }}>Search</button>
                                    </form>
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-full table table-striped overflow-x-auto" style={{ marginBottom: "10px" }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Foto</th>
                                                <th scope="col">Title</th>
                                                <th scope='col'>Description</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">action</th>
                                            </tr>
                                        </thead>
                                        {newsData.map((data, i) => (
                                            <tbody key={i}>
                                                <tr>
                                                    <th scope="row">{i + 1}</th>
                                                    <td><img style={{ width: '70px' }} src={`/storage/images/${data.foto}`} alt="Shoes" /></td>
                                                    <td className="truncate overflow-hidden">
                                                        <div className="truncate w-32">
                                                            {data.title}
                                                        </div>
                                                    </td>
                                                    <td className=" ">
                                                        <div className="truncate w-52">
                                                            {data.description}
                                                        </div>
                                                    </td>
                                                    <td>{data.category}</td>
                                                    <td>
                                                        <div className="flex flex-nowrap gap-x-2">
                                                            <button onClick={() => handleEdit(data.id)} className="btn bg-sky-500 text-white text-bold">Edit</button>
                                                            <button onClick={() => handleDelete(data.id)} className="btn bg-red-500 text-white text-bold">Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                <Paginator meta={props.data} style={{ marginTop: "10px" }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedAdminLayout>
    )
}