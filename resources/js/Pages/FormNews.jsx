import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function FormNews(props) {

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleForm = (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('image', image);
        data.append('title', title);
        data.append('description', description);
        data.append('category', category);

        Inertia.post('/news', data)
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="formnews" />
            <form className="py-12" onSubmit={handleForm}>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="foto">Foto berita</label>
                        <input type="file" onChange={handleImage} className="file-input bg-white file-input-bordered file-input-md w-96" />
                    </div>

                </div>
                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="title">title</label>
                        <input type="text" onChange={handleTitle} value={title} placeholder="judul" className="m-2 bg-white text w-96 " />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="description">Description</label>
                        <textarea onChange={handleDescription} value={description} className="m-2 bg-white text textarea w-96 textarea-bordered" placeholder=" masukan Description berita"></textarea>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="category">Category</label>
                        <input type="text" onChange={handleCategory} value={category} placeholder="Category" className="m-2 text bg-white input input-bordered w-96 " />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <button type="submit" className='btn btn-primary m-2 w-20'>SUBMIT</button>
                </div>

            </form>
        </AuthenticatedLayout>)
}