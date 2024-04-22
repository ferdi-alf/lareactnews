import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from 'date-fns';

function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    return <span>{timeAgo}</span>;
}

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
                    <div className="cardD">
                        <div className="title">
                            <div className="titleT ">{data.title}</div>
                            <div className="badge view ">
                                <FontAwesomeIcon icon={faEye} />
                                {data.views}
                            </div>
                        </div>
                        <div className="description ">
                            {data.description}
                        </div>
                        <div className="author">
                            <div className="category">
                                <div className="carbon">
                                    <HumanReadableTime timestamp={data.created_at} />
                                </div>
                            </div>
                            <div className="badge name">{data.author}</div>
                            <div className="badge badge-secondary">{data.category}</div>
                        </div>
                    </div>
                </Link >
            </div >
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

