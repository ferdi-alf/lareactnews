import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function FormNews(props) {
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="formnews" />

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="foto">Foto berita</label>
                        <input type="file" id="foto" className="file-input bg-white file-input-bordered file-input-md w-96" />
                    </div>

                </div>
                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="title">title</label>
                        <input id="title" type="text" placeholder="judul" className="m-2 bg-white text w-96" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className="m-2 bg-white text textarea w-96 textarea-bordered" placeholder="masukan Description berita"></textarea>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="category">Category</label>
                        <input id='Category' type="text" placeholder="Category" className="m-2 text bg-white input input-bordered w-96 " />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <button type="submit" className='btn btn-primary m-2 w-20'>SUBMIT</button>
                </div>

            </div>
        </AuthenticatedLayout>)
}