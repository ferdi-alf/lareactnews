import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../../../public/css/style.css'

export default function NewsInser(props) {
    console.log(props)
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', image);
        data.append('title', title);
        data.append('description', description);
        data.append('category', category === 'lainnya...(isi sendiri)' ? customCategory : category);
        Inertia.post('post/news', data);
    }

    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="News Insert | cuyyNews" />

            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div className="mx-auto sm:px-6 lg:px-8" style={{ width: "90%" }}>
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="foto" >Foto berita</label>
                            <input id='foto' type="file" onChange={handleImage} className="file-input file-input-bordered bg-white file-input-md " />
                            {props.errors.image ? <span className="text-bold mt-1 text-red-500">{props.errors.image}</span> : ''}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="title">Title</label>
                            <input id='title' type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="judul" className="m-2 bg-white text  " />
                            {props.errors.title ? <span className="text-bold mt-1 text-red-500">{props.errors.title}</span> : ''}
                        </div>
                    </div>

                    <div className="mx-auto  mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="description">Description</label>
                            <textarea id='desciption' onChange={(e) => setDescription(e.target.value)} value={description} className="m-2 bg-white text textarea textarea-bordered" placeholder=" masukan Description berita"></textarea>
                            {props.errors.description ? <span className="text-bold mt-1 text-red-500">{props.errors.description}</span> : ''}
                        </div>
                    </div>

                    <div className="mx-auto rounded-md mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                        <div className="flex flex-col shadow-xl justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="category">Category</label>
                            <select className="m-2 text bg-white input input-bordered" onChange={handleCategoryChange}>
                                <option disabled selected>pilih category</option>
                                <option value="politics">Politics</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="sports">Sports</option>
                                <option value="health">Health</option>
                                <option value="environment">Environment</option>
                                <option value="education">Education</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="international">International</option>
                                <option>lainnya...(isi sendiri)</option>
                            </select>
                            {category === 'lainnya...(isi sendiri)' && (
                                <input id='category' type="text" onChange={(e) => setCustomCategory(e.target.value)} value={customCategory} placeholder="Category" className="m-2 text bg-white input input-bordered " />
                            )}
                            {props.errors.category ? <span className="text-bold mt-1 text-red-500">{props.errors.category}</span> : ''}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                        <button type="submit" className='btn btn-primary m-2 w-20 text-white'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </AuthenticatedAdminLayout>
    )
}