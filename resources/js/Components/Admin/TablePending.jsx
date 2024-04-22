import { Link } from '@inertiajs/react';
import '../../../../public/css/style.css'

const isTablePending = (data) => {
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

                    <tbody >
                        {data.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">1</th>
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
                                        <Link as="button" className="mx-2 btn border-none bg-sky-400 text-white">Post</Link>
                                        <Link as="button" href={route('delete.news')} method='post' className='btn bg-rose-500 text-white border-none'>Hapus</Link>
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

const noTableNews = () => {
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

                    <div className='TextT'>Belum ada berita pending</div>
                </table>
            </div>
        </div>
    )
}

const TablePending = ({ data }) => {
    return !data ? noTableNews() : isTablePending(data);
}

export default TablePending;