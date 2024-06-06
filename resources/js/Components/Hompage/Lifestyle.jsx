import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceStrict } from 'date-fns';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true })
    return <span className="carbonR">{timeAgo}</span>
}

const isLifestyle = (data) => {
    const handleViewNews = (id) => {
        Inertia.post(route('view.berita', { id: id }))
    }
    return (
        <div className="w-full flex flex-col">
            {data.map((news, i) => (
                <Link key={i} className="rndm" onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} >
                    <figure >
                        <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                    </figure>
                    <div className="flex card-desr flex-col items-center justify-evenly">
                        <div className="card-title flex flex-col">
                            <div className="flex flex-nowrap items-center justify-center">
                                <p className="title hover:underline">{news.title}</p>
                                <div className="badge bg-transparent view gap-1" style={{ color: "#555" }}>
                                    <FontAwesomeIcon icon={faEye} style={{ fontSize: "10px" }} />
                                    {news.views}
                                </div>
                            </div>
                            <p className="desc hover:underline">{news.description}</p>
                            <div className="w-full flex justify-around items-center">
                                <p className="carbonr">
                                    <HumanReadableTime timestamp={news.created_at} />
                                </p>
                                <div className="flex justify-between gap-x-2 items-center flex-wrap">
                                    <div style={{ color: "#555" }} className="badge name bg-white">{news.author}</div>
                                    <div className="badge badge-secondary">{news.category}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}


const Lifestyle = ({ data }) => {
    return !data ? noLifestyle() : isLifestyle(data);
}

export default Lifestyle;