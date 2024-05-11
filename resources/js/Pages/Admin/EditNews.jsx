import Navbar from '@/Components/Navbar';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";


export default function EditNews(props) {
    const [image, setImage] = useState(null);
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

        const formData = new FormData();
        formData.append('id', props.news.id);
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);

        Inertia.post('/news/update', formData)
            .then(() => {
                setImage('');
                setTitle('');
                setDescription('');
                setCategory('');
            })
            .catch(error => console.error('Error:', error));
    }

    console.log('props123: ', props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <div className='py-12 flex flex-wrap justify-center items-center flex-col h-full w-full'>
                <Head title="edit news" />

                <div className="card bg-white shadow-xl mb-4" style={{ width: "90%" }}>
                    <div className='p-4 text-4xl text-slate-600 text-center'>Edit Berita</div>
                    <div className="card-body">
                        <form onSubmit={handleForm} className='flex w-full flex-col justify-center p-6 bg-white border-b border-gray-200' action="">
                            <input type="file" onChange={handleImage} className="file-input bg-white file-input-bordered file-input-md w-full" />
                            <input
                                type="text"
                                onChange={handleTitle}
                                defaultValue={props.news ? props.news.title : ''}
                                placeholder="judul" className="m-2 text-slate-600 bg-white text w-full " />
                            <textarea onChange={handleDescription} defaultValue={props.news ? props.news.description : ''} className="m-2 text-slate-600 bg-white text textarea w-full textarea-bordered" placeholder=" masukan Description berita"></textarea>
                            <input type="text" onChange={handleCategory} defaultValue={props.news ? props.news.category : ''} placeholder="Category" className="m-2 text-slate-600 text bg-white input input-bordered w-full " />
                            <button type="submit" className='btn btn-primary m-2 w-20'>UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    )
}
