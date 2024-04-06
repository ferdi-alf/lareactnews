import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const isNews = (news) => {
    console.log('berita: ', news);

    const handleClick = (idBerita) => {

        Inertia.post('/add-view', {
            id_berita: idBerita,
        }).then(response => {
            // Handle response
        }).catch(error => {
            // Handle error
        });
    }

    return news.map((data, i) => {
        return (
            <div key={i}>

                <Link onClick={() => handleClick(data.id)} href={route('view.berita', { id: data.id })} className="cardsl">
                    <figure>
                        <img src={`/storage/images/${data.foto}`} alt="Shoes" />
                    </figure>

                    <div className="card-body">
                        <h2 className="ct text-end">
                            {data.title}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="text-end">{data.description}</p>
                        <div className="card-actions justify-end">
                            <div className='row-5'>
                                <FontAwesomeIcon icon={faEye} />
                                <span className="ml-2">{data.views} views</span>
                            </div>
                            <div className="badge badge-secondary">{data.category}</div>
                            <div className="badge badge-outline">{data.author}</div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })
}

const noNews = () => {
    return (
        <div>Saat ini belum ada data tersedia</div>
    )
}

const NewsList = ({ news }) => {
    return !news ? noNews() : isNews(news)
}

export default NewsList

