import Navbar from '@/Components/Navbar';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';


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
        formData.append('id', props.myNews.id);
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
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="card w-full bg-white shadow-xl mb-4">
                <div className='p-4 text-4xl text-slate-600 text-center'>Edit Berita</div>
                <div className="card-body">
                    <form onSubmit={handleForm} className='flex flex-col justify-center p-6 bg-white border-b border-gray-200' action="">
                        <input type="file" onChange={handleImage} className="file-input bg-white file-input-bordered file-input-md w-96" />
                        <input type="text" onChange={handleTitle} defaultValue={props.myNews ? props.myNews.title : ''}
                            placeholder="judul" className="m-2 text-slate-600 bg-white text w-96 " />
                        <textarea onChange={handleDescription} defaultValue={props.myNews ? props.myNews.description : ''} className="m-2 text-slate-600 bg-white text textarea w-96 textarea-bordered" placeholder=" masukan Description berita"></textarea>
                        <input type="text" onChange={handleCategory} defaultValue={props.myNews ? props.myNews.category : ''} placeholder="Category" className="m-2 text-slate-600 text bg-white input input-bordered w-96 " />
                        <button type="submit" className='btn btn-primary m-2 w-20'>UPDATE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
