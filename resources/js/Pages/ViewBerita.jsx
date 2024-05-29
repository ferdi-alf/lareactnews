import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ViewBerita(props) {
    return (
        <div>
            <h1>{props.viewBerita.title}</h1>
            {/* tambahkan kode untuk menampilkan gambar, kategori, dll. */}
            <p>{props.viewBerita.description}</p>
            <div className='row-5'>
                <FontAwesomeIcon icon={faEye} />
                <span className="ml-2">{props.viewCount} views</span>
            </div>
        </div>
    )
}
