import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";


export default function Settings(props) {
    console.log(props)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isConfirmed } = await Swal.fire({
                icon: "info",
                title: "Waning!!",
                text: "apakah anda yakin ingin menyimpan perubahan?",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "simpan"
            });
            if (isConfirmed) {
                const data = new FormData();
                data.append('name', name);
                data.append('email', email);
                data.append('oldPassword', oldPassword);
                data.append('newPassword', newPassword);
                data.append('confirmNewPassword', confirmNewPassword);

                Inertia.post('/update/data/admin', data)
            }
        } catch (error) {
            console.error("error: ", error)
            Swal.fire({
                icon: "error",
                title: "gagal",
                text: "gagal menyimpan perubahan, mohon coba lagi"
            })
        }
    }

    useEffect(() => {
        if (props.status) {
            setStatus(props.status);
        }
    }, [props.status]);
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="Settings | cuyyNews" />

            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <div className="mx-auto mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                    <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200" style={{ width: "100%" }}>
                        <label htmlFor="name">Name</label>
                        <input
                            defaultValue={props.auth ? props.auth.admin.name : ''}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="m-2 bg-white text"
                            style={{ width: "70%" }}
                        />

                        <label htmlFor="email"> Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={props.auth ? props.auth.admin.email : ''}
                            className="m-2 bg-white text"
                            style={{ width: "70%" }}
                        />

                        <div className="flex justify-end items-center w-full">
                            <button
                                onClick={handleSubmit}
                                className="btn bg-black text-white text-bold"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 sm:px-6 lg:px-8" style={{ width: "90%" }}>
                    <div className="flex flex-col shadow-xl rounded-md justify-center p-6 bg-white border-b border-gray-200" style={{ width: "100%" }}>
                        <label htmlFor="name">Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="m-2 bg-white text"
                            style={{ width: "70%" }}
                        />
                        {props.errors.oldPassword == 'password lama wajib diisi' ? (
                            <p className="text-red-500 text-bold">{props.errors.oldPassword}</p>
                        ) : ''}

                        <label htmlFor="email">News Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="m-2 bg-white text"
                            style={{ width: "70%" }}
                        />
                        {props.errors.newPassword ? (
                            <p className="text-red-500 text-bold">{props.errors.newPassword}</p>
                        ) : ''}
                        <label htmlFor="confirm"> Confirm new Password</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="m-2 bg-white text"
                            style={{ width: "70%" }}
                        />
                        {props.errors.confirmNewPassword ? (
                            <p className="text-red-500 text-bold">{props.errors.confirmNewPassword}</p>
                        ) : ''}
                        {props.errors.oldPassword == 'password salah, harap masukan password dengan benar sebelum mengganti' ? (
                            <p className="text-red-500 text-bold">{props.errors.oldPassword}</p>
                        ) : ''}
                        <div className="flex justify-end items-center w-full">
                            <button
                                onClick={handleSubmit}
                                className="btn bg-black text-white text-bold"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    )
}