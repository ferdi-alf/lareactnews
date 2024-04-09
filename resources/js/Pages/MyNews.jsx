import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import '../../../public/css/style.css'


export default function MyNews(props) {
    console.log('beritasy: ', props);

    // Ambil data berita dari props
    const newsData = props.news.data || [];

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita saya</h2>}
        >
            <Head title="My news" />
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col shadow-xl overflow-x-auto rounded-md justify-center p-6 bg-white border-b border-gray-200">
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-full table table-striped overflow-x-auto">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Foto</th>
                                        <th scope="col">Title</th>
                                        <th scope='col'>Description</th>
                                        <th scope="col">Category</th>
                                        <th scope="col" className='text-center'>action</th>
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
                                            <td className='text-center flex flex-nowrap items-center'>
                                                <Link as="button" className="mx-2 btn border-none bg-sky-400 text-white">Edit</Link>
                                                <Link as="button" href={route('delete.news')} data={{ id: data.id }} method='post' className='btn bg-rose-500 text-white border-none'>Hapus</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                            {/* Pagination */}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout >
    );
}
