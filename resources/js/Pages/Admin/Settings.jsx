import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { useState, useRef } from 'react';
import Swal from "sweetalert2";
import '../../../../public/css/style.css'
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';


export default function Settings(props) {
    console.log(props)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();


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


    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };



    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('delete.account'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };


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

                        <div className="flex justify-start mt-2 items-center w-full">
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
                        {props.errors.oldPassword ? (
                            <p className="text-red-500 text-bold">{props.errors.oldPassword}</p>
                        ) : ''}

                        <label htmlFor="email">New Password</label>
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
                        <div className="flex justify-start mt-2 items-center w-full">
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
                        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

                        <p className="mt-1 ug text-sm text-gray-600">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Before
                            deleting your account, please download any data or information that you wish to retain.
                        </p>
                        <button
                            onClick={confirmUserDeletion}
                            className="mt-2 border-none dgr text-white text-center"
                        >
                            Delete Account
                        </button>
                    </div>
                    <Modal show={confirmingUserDeletion} onClose={closeModal}>
                        <form onSubmit={deleteUser} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to delete your account?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                enter your password to confirm you would like to permanently delete your account.
                            </p>

                            <div className="mt-6">
                                <InputLabel htmlFor="password" value="Password" className="sr-only" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="Password"
                                />

                                <InputError message={props.errors.password} className="mt-2" />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                                <DangerButton className="ms-3" disabled={processing}>
                                    Delete Account
                                </DangerButton>
                            </div>
                        </form>
                    </Modal>
                </div>

            </div>
        </AuthenticatedAdminLayout >
    )
}