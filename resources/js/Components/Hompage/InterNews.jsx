import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceStrict } from 'date-fns';
import React from 'react';

function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true });
    return <span>{timeAgo}</span>;
}

const InterNews = ({ data }) => {
    return (
        <div className="gatau">
            {/* Kontainer untuk item dengan indeks 0 */}
            <div className="inter-container wide">
                {data.length > 0 && (
                    <div key={0}>
                        <Link href={route('view.berita', { id: data[0].id })} className="cardIn">
                            <figure>
                                <img src={`/storage/images/${data[0].foto}`} alt="Shoes" />
                            </figure>
                            <div className="inter-title">
                                <p>{data[0].title}</p>
                                <div className="badge view">
                                    <FontAwesomeIcon icon={faEye} style={{ fontSize: "10px" }} />
                                    {data[0].views}
                                </div>
                            </div>
                            <div className="description">
                                {data[0].description}
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, hic?
                            </div>
                            <div className="author">
                                <div className="category">
                                    <div className="carbon">
                                        <HumanReadableTime timestamp={data[0].created_at} />
                                    </div>
                                </div>
                                <div style={{ color: "#555" }} className="badge name bg-white">{data[0].author}</div>
                                <div className="badge badge-secondary">{data[0].category}</div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            {/* Kontainer untuk item dengan indeks selain 0 */}
            <div className="tall">
                {data.slice(1).map((news, i) => (
                    <div key={i + 1} className="big-tall">
                        <Link href={route('view.berita', { id: news.id })} className="card-tall">
                            <figure>
                                <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                            </figure>
                            <div className="flex cardIn justify-around flex-col">
                                <div className="inter-title">
                                    <p>{news.title}</p>
                                    <div className="badge view bg-white gap-1" style={{ color: "gray" }}>
                                        <FontAwesomeIcon icon={faEye} style={{ fontSize: "10px" }} />
                                        {news.views}
                                    </div>
                                </div>
                                <div className="description">
                                    {news.description}
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, hic?
                                </div>
                                <div className="author">
                                    <div className="category">
                                        <div className="carbon">
                                            <HumanReadableTime timestamp={news.created_at} />
                                        </div>
                                    </div>
                                    <div style={{ color: "#555" }} className="badge name bg-white">{news.author}</div>
                                    <div className="badge badge-secondary">{news.category}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InterNews;