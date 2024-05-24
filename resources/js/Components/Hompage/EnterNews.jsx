import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceStrict } from 'date-fns';


function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true });

    return <span>{timeAgo}</span>
}


const isEnterNews = (data) => {

    const handleViewNews = (id) => {
        Inertia.post(route('view.berita', { id: id }))
    }
    return data.map((news, i) => {
        return (
            <div key={i}>

                <Link onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} className="cardsl">
                    <figure>
                        <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                    </figure>
                    <div className="cardD">
                        <div className="title">
                            <div className="titleT ">{news.title}</div>
                            <div className="badge view gap-1">
                                <FontAwesomeIcon icon={faEye} style={{ fontSize: "10px" }} />
                                {news.views}
                            </div>
                        </div>
                        <div className="description ">
                            {news.description}
                        </div>
                        <div className="author">
                            <div className="category">
                                <div className="carbon">
                                    <HumanReadableTime timestamp={news.created_at} />
                                </div>
                            </div>
                            <div className="badge name">{news.author}</div>
                            <div className="badge badge-secondary">{news.category}</div>
                        </div>
                    </div>
                </Link >
            </div >
        )
    })
}


const EnterNews = ({ data }) => {
    return !data ? noEnterNews() : isEnterNews(data)
}

export default EnterNews;