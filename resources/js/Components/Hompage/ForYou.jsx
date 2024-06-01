import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceStrict } from 'date-fns';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true })
    return <span className="carbonR">{timeAgo}</span>
}

const isForYou = (data) => {
    console.log('data: ', data);

    const handleViewNews = (id) => {
        Inertia.post(route('view.berita', { id: id }))
    }

    return (
        <div className="w-full bg-white flex flex-col overflow-x-auto">
            {data.slice(0, 3).map((news, i) => (
                <Link key={i} className="rndm" onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} >
                    <figure>
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
            <div className="apa">
                {data.slice(3, 10).map((news, i) => (
                    <div className="knn">
                        <Link
                            key={i}
                            onClick={() => handleViewNews(news.id)}
                            href={route('view.berita', { id: news.id })}
                        >
                            <figure>
                                <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                            </figure>
                            <div className="card-desc gap-y-2 flex flex-col">
                                <p className="title">{news.title}</p>
                                <p className="desc">{news.description}</p>
                            </div>
                            <div className="w-full flex-col flex justify-center items-end">
                                <p className="carbon">
                                    <HumanReadableTime timestamp={news.created_at} />
                                </p>
                                <div className="flex  justify-between gap-x-2 items-center flex-wrap">
                                    <div className="badge bg-transparent view gap-1" style={{ color: "#555" }}>
                                        <FontAwesomeIcon icon={faEye} style={{ fontSize: "10px" }} />
                                        {news.views}
                                    </div>
                                    <div style={{ color: "#555" }} className="badge name bg-white">{news.author}</div>
                                    <div className="badge badge-secondary">{news.category}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {data.slice(10).map((news, i) => (
                <Link key={i} className="rndm" style={{ marginTop: "7px" }} onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} >
                    <figure>
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
        </div >
    )
}

const noForYou = () => {
    return (
        <div>
            belum ada berita saat ini
        </div>
    )
}


const ForYou = ({ data }) => {
    return !data ? noForYou() : isForYou(data);
}

export default ForYou;