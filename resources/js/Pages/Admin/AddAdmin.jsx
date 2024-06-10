import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import '../../../../public/css/style.css'


export default function AddAdmin(props) {
    console.log("props", props);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { errors, ...otherProps } = props;


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData;
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('confirmPassword', confirmPassword);
        Inertia.post('/post/add-admin', data)
    }

    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="add admin" />


            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <form onSubmit={handleSubmit} className="py-12" style={{ width: "95%" }}>
                    <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="title">Nama</label>
                            <input id='title' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nama" className="m-2 f bg-white text" />
                            {errors.name && (
                                <p className="text-red-500">{errors.name}</p>

                            )}
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="email">Email</label>
                            <input id='email' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="masukan email" className="m-2 f bg-white text  " />
                            {errors.email && (
                                <p className="text-red-500">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200">
                            <label htmlFor="password">Password</label>
                            <input id='password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="masukan password" className="m-2 f bg-white text" />
                            {errors.password == 'password tidak boleh kosong' ? (
                                <p className="text-red-500">{errors.password}</p>
                            ) : ''}
                            {errors.confirmPassword == 'konfirmasi password dan password harus sama' ? (
                                <p className="text-red-500">{errors.confirmPassword}</p>
                            ) : ''}

                            <label htmlFor="password" style={{ marginTop: "10px" }}>Confirm Password</label>
                            <input id='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="confirm password" className="m-2 f bg-white text" />
                            {errors.confirmPassword && (
                                <p className="text-red-500">{errors.confirmPassword}</p>
                            )}
                            {errors.password == 'password minimal 8 karakter' ? (
                                <p className="text-red-500">{errors.password}</p>
                            ) : ''}
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-6 sm:px-6 lg:px-8">
                        <button type="submit" className='btn btn-primary m-2 w-20 text-white'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </AuthenticatedAdminLayout>
    )
}