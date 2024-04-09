import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../../public/css/style.css'
import Swal from 'sweetalert2'


export default function FormNews(props) {
    console.log("formprops: ", props)

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

    const [errors, setErrors] = useState({});

    const handleForm = async (e) => {
        e.preventDefault();

        const { isConfirmed } = await Swal.fire({
            icon: "info",
            title: "Warning",
            text: "Harap perhatikan saat mengupdate berita, berikanlah berita yang valid kepada pembaca!",
            showCancelButton: true,
            confirmButtonText: 'OK',
        });

        if (isConfirmed) {
            const data = new FormData();
            data.append('image', image);
            data.append('title', title);
            data.append('description', description);
            data.append('category', category);

            try {
                const response = await Inertia.post('/news', data);

                if (response.status === 'error') {
                    setErrors(response.errors);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Form Berita</h2>}
        >
            <Head title="formnews" />
            <form className="py-12" onSubmit={handleForm}>

                {/* pesan error */}
                {Object.keys(props.errors).length > 0 && (
                    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mb-5'>
                        <div role="alert" className="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-5" fill="none" viewBox="0 0 23 23">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <ul>
                                {Object.values(props.errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {/* end pesan error */}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="foto" >Foto berita</label>
                        <input id='foto' type="file" onChange={handleImage} className="file-input file-input-bordered bg-white file-input-md " />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="title">Title</label>
                        <input id='title' type="text" onChange={handleTitle} value={title} placeholder="judul" className="m-2 bg-white text  " />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto  mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="description">Description</label>
                        <textarea id='desciption' onChange={handleDescription} value={description} className="m-2 bg-white text textarea textarea-bordered" placeholder=" masukan Description berita"></textarea>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto rounded-md mt-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col shadow-xl justify-center p-6 bg-white border-b border-gray-200">
                        <label htmlFor="category">Category</label>
                        <input id='category' type="text" onChange={handleCategory} value={category} placeholder="Category" className="m-2 text bg-white input input-bordered " />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                    <button type="submit" className='btn btn-primary m-2 w-20 text-white'>SUBMIT</button>
                </div>

            </form>
        </AuthenticatedLayout>)
}