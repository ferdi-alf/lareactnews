import '../../../../public/css/style.css'
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function ViewsPending(props) {
    console.log("data", props)
    const handlePost = async (id) => {
        const { isConfirmed } = await Swal.fire({
            icon: "info",
            title: "Warning",
            text: "Harap Periksa kembali sebelum benar-benar mempost berita, telusuri apakah berita itu asli atau tidak",
            showCancelButton: true,
            confirmButtonText: 'OK',
        });
        if (isConfirmed) {
            try {
                const response = await Inertia.post(route('post.pending', id));

                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Berita berhasil diposting!',
                    });
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            const { value: message, isConfirmed } = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                text: "berikan pesankepada user mengapa menolak berita ini",
                input: "text",
                icon: "warning",
                inputPlaceholder: "masukan pesan",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (isConfirmed) {
                if (!message) {
                    Swal.fire({
                        text: "Pesan wajib diisi",
                        icon: "error"
                    });
                    return;
                } else {
                    const response = await Inertia.post(route('delete.news', id), { message });
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            Swal.fire({
                title: "Error!",
                text: "An Error occurred while processing the request. Please try again.",
                icon: "error"
            });
        }
    }

    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="view" />


            <div className="bg-white flex justify-center items-center flex-col" style={{ width: "100%" }}>
                <div className="img">
                    <img src={`/storage/images/${props.data.foto}`} alt="" />
                </div>
                <div className="description view">
                    <p className="title" style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}>
                        {props.data.title_news}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ullam? <br />
                    </p>
                    <div className="text-black">
                        <p style={{ marginTop: "10px" }}>id: {props.data.id}</p>
                        <p>oleh: {props.data.user_name}</p>
                        <p>email: {props.data.user_email}</p>
                    </div>

                    <p style={{ marginTop: "45px", fontWeight: "200", fontSize: "15px", color: "black" }}>
                        {props.data.description_news}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo veritatis dolor eligendi, quaerat maiores mollitia dolorum sunt enim delectus expedita nobis repellendus eaque esse ut neque sint ipsam. Aspernatur quae distinctio reprehenderit quasi? Blanditiis et laboriosam iusto totam, expedita voluptates impedit tenetur earum, odit modi fugit illum velit! Quidem, quas fugit. Ipsam expedita ullam necessitatibus nemo officia iste error assumenda. Repudiandae, delectus nemo aspernatur quidem architecto, natus tempora nostrum libero quo facilis maxime autem ipsa, perferendis iure labore. Dicta doloribus odio laudantium assumenda, nulla architecto id voluptatum accusantium animi aliquid distinctio dolorum eveniet exercitationem provident atque iste ex laboriosam, officia qui! Ut eveniet, quos quod aperiam delectus distinctio dignissimos tempore.
                    </p>
                </div>
                <div className="w-full aksi bg-white">
                    <div className="flex justify-center box-aksi items-center flex-nowrap" style={{ width: "80%" }}>
                        <button onClick={() => handlePost(props.data.id)} className="btn text-bold bg-sky-500 text-white">Post</button>
                        <button onClick={() => handleDelete(props.data.id)} className="btn text-bold bg-red-500 text-white">Tolak</button>
                    </div>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    )
}