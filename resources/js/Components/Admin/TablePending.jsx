import { Link } from '@inertiajs/react';
import '../../../../public/css/style.css'

const TablePending = () => {
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
                        <tr>
                            <th scope="row">1</th>
                            <td><img style={{ width: '70px' }} src="" alt="Shoes" /></td>
                            <td className="truncate overflow-hidden">
                                <div className="truncate w-32">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium?
                                </div>
                            </td>
                            <td className=" ">
                                <div className="truncate w-52">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis nam adipisci blanditiis.
                                </div>
                            </td>
                            <td>category</td>
                            <td>Ferdi</td>
                            <td>ferdi@gmail.com</td>
                            <td className='text-center flex flex-nowrap items-center'>
                                <Link as="button" className="mx-2 btn border-none bg-sky-400 text-white">Post</Link>
                                <Link as="button" href={route('delete.news')} method='post' className='btn bg-rose-500 text-white border-none'>Hapus</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablePending;