import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import Paginator from '@/Components/Hompage/Paginator';
import '../../../public/css/style.css'
import SkeletonMyNews from '@/Components/SkeletonMyNews';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function MyNews(props) {
    console.log('beritasy: ', props);

    const newsData = props.news.data || [];
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        await Inertia.get('/mynews', { search })
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

    const fectDataFromServer = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        })
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita saya</h2>}
        >
            <Head title="My news" />
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {loading ? <SkeletonMyNews /> : (
                        <>
                            <div className="flex flex-col shadow-xl overflow-x-auto rounded-md justify-center p-6 bg-white border-b border-gray-200">
                                <div className="flex items-center justify-end w-full">
                                    <form class="flex gap-x-5 form-search" onSubmit={handleForm} role="search">
                                        <input class="form-control" onChange={handleSearch} value={search} type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "8px", width: "80%" }} />
                                        <button class="btn btn-outline-success" type="submit" style={{ background: "transparent", border: "1px solid #97e3a9", color: "#155724" }}>Search</button>
                                    </form>
                                </div>
                                <div className="w-full overflow-x-auto" style={{ height: "450px" }}>
                                    <table className="min-w-full table table-striped overflow-x-auto" style={{ marginBottom: "10px" }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Foto</th>
                                                <th scope="col">Title</th>
                                                <th scope='col'>Description</th>
                                                <th scope="col">Category</th>
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
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                <Paginator meta={props.news} style={{ marginTop: "10px" }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
