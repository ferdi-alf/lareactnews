import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faClock, faUser, faList } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceStrict } from 'date-fns';
import { Head } from "@inertiajs/react";
import Navbar from '@/Components/Navbar';



function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date, { addSuffix: true })
    return <span>{timeAgo}</span>
}

export default function ViewBerita(props) {
    console.log("view: ", props)
    return (
        <div className="w-full relative flex flex-col items-center justify-center bg-white">
            <Navbar user={props.auth.user} className="" />
            <Head title={props.viewBerita.title} />
            <div className="w-11/12 flex flex-col items-center justify-center p-3">
                <figure className="flex sm:w-4/5 w-full flex-col gap-y-1">
                    <img src={`/storage/images/${props.viewBerita.foto}`} alt="Shoes" />
                    <div className="w-full sm:text-lg text-xs sm:justify-around justify-between flex flex-wrap">
                        <p className="flex flex-nowrap items-center gap-x-2 text-gray-700">
                            <FontAwesomeIcon icon={faClock} />
                            <HumanReadableTime timestamp={props.viewBerita.created_at} />
                        </p>
                        <div className='row-5 text-gray-700'>
                            <FontAwesomeIcon icon={faEye} />
                            <span className="ml-2">{props.viewBerita.views} views</span>
                        </div>
                        <div className='row-5 text-gray-700'>
                            <FontAwesomeIcon icon={faUser} />
                            <span className="ml-2">{props.viewBerita.author}</span>
                        </div>
                        <div className='row-5 text-gray-700'>
                            <FontAwesomeIcon icon={faList} />
                            <span className="ml-2">{props.viewBerita.category}</span>
                        </div>
                    </div>
                </figure>
                <h1 className="font-bold w-full text-start text-black sm:text-xl mt-3 text-base">
                    {props.viewBerita.title}
                </h1>
                {/* tambahkan kode untuk menampilkan gambar, kategori, dll. */}
                <p className="rounded-lg mt-6 bg-slate-100 text-gray-700 p-3 text-base">
                    {props.viewBerita.description}
                </p>
            </div>

        </div>
    )
}
