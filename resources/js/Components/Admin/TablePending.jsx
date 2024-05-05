import { Link } from '@inertiajs/react';
import '../../../../public/css/style.css'
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const isTablePending = (data, props) => {
    console.log("props: ", props)
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
                text: "Berikan pesan kepada user mengapa anda menolak berita ini",
                input: "text",
                icon: "warning",
                inputPlaceholder: "masukan",
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
            // Tangani kesalahan yang mungkin terjadi saat memposting permintaan penghapusan
            console.error("Error: ", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while processing the request. Please try again.",
                icon: "error"
            });
        }
    }



    return (
        <div className='box-table'>
            {Object.keys(props.errors).length > 0 && (
                Object.values(props.errors).map((error, index) => {
                    Swal.fire({
                        title: "Succes",
                        text: "berita berhasil di tolak, pesan terkirim ke dashboard user",
                        icon: "success"
                    })
                })
            )}
            <div className="tableP">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Title</th>
                            <th scope='col'>Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">user</th>
                            <th scope="col">Email</th>
                            <th scope="col" className='text-center'>action</th>
                        </tr>
                    </thead>

                    <tbody >
                        {data.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td><img style={{ width: '70px' }} src={`/storage/images/${data.foto}`} alt="Shoes" /></td>
                                    <td className="truncate overflow-hidden">
                                        <div className="truncate w-32">
                                            {data.title_news}
                                        </div>
                                    </td>
                                    <td className=" ">
                                        <div className="truncate w-52">
                                            {data.description_news}
                                        </div>
                                    </td>
                                    <td>{data.category}</td>
                                    <td>{data.user_name}</td>
                                    <td>{data.user_email}</td>
                                    <td className='text-center flex flex-nowrap items-center'>
                                        <Link href={route('view.pending', {id: data.id})} className=" mx-2 btn bg-sky-500 text-white border-none">Lihat</Link>
                                        <button onClick={() => handlePost(data.id)} className="mx-2 btn border-none bg-green-400 text-white">Post</button>
                                        <button onClick={() => handleDelete(data.id)} method='post' className='btn bg-rose-500 text-white border-none'>Hapus</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const noTableNews = (data) => {
    return (
        <div className='box-table'>
            <div className="tableP">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Title</th>
                            <th scope='col'>Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">user</th>
                            <th scope="col">Email</th>
                            <th scope="col" className='text-center'>action</th>
                        </tr>
                    </thead>
                </table>
                <div className='TextT text-center text-black'>Belum ada berita pending</div>
            </div>
        </div>
    )
}

const TablePending = ({ data, props }) => {
    return data.length === 0 ? noTableNews() : isTablePending(data, props);
}

export default TablePending;