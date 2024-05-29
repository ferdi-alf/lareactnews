import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceStrict } from 'date-fns';
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function HumanReadableTime({ timestamp }) {
    const timeAgo = formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true })
    return <span>{timeAgo}</span>
}


const isHealthNews = (data) => {

    const handleViewNews = (id) => {
        Inertia.post(route('view.berita', { id: id }))
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="w-full flex flex-col justify-center gap-y-3 items-center">
            <div className="flex card-health flex-col justify-center gap-y-3 items-center">
                <div className="ini flex flex-col justify-center gap-y-3 items-center">
                    {data.slice(0, 2).map((news, i) => (
                        <div key={i} className="w-full">
                            <Link onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} className="bg-white card-3 w-full flex flex-col justify-around box-helth items-center p-3">
                                <figure>
                                    <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                                </figure>
                                <div className="card-desc gap-y-2 flex flex-col">
                                    <p className="title">{news.title}</p>
                                    <p className="desc">{news.description}</p>
                                </div>
                                <div className="w-full flex justify-around items-center">
                                    <p className="carbon">
                                        <HumanReadableTime timestamp={news.created_at} />
                                    </p>
                                    <div className="flex justify-between gap-x-2 items-center flex-wrap">
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
            </div>
            <div className="slider-container he">
                <Slider {...settings} style={{ display: "flex", columnGap: "12px" }}>
                    {data.slice(2, 8).map((news, i) => (
                        <div key={i} className="card-slid">
                            <Link onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} className=" card-3 w-full flex flex-col justify-around box-helth items-center p-3">
                                <figure>
                                    <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                                </figure>
                                <div className="card-desc gap-y-2 flex flex-col">
                                    <p className="title">{news.title}</p>
                                    <p className="desc">{news.description}</p>
                                </div>
                                <div className="w-full flex justify-end flex-wrap items-center">
                                    <p className="carbon" style={{ color: "#555" }}>
                                        <HumanReadableTime timestamp={news.created_at} />
                                    </p>
                                    <div className="flex justify-between gap-x-2 items-center flex-nowrap">
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
                </Slider>
            </div>
            <div className="flex card-health flex-col justify-center gap-y-3 items-center">
                <div className="ini flex flex-col justify-center gap-y-3 items-center">
                    {data.slice(8, 10).map((news, i) => (
                        <div key={i} className="w-full">
                            <Link onClick={() => handleViewNews(news.id)} href={route('view.berita', { id: news.id })} className="bg-white card-3 w-full flex flex-col justify-around box-helth items-center p-3">
                                <figure>
                                    <img src={`/storage/images/${news.foto}`} alt="Shoes" />
                                </figure>
                                <div className="card-desc gap-y-2 flex flex-col">
                                    <p className="title">{news.title}</p>
                                    <p className="desc">{news.description}</p>
                                </div>
                                <div className="w-full flex justify-around items-center">
                                    <p className="carbon">
                                        <HumanReadableTime timestamp={news.created_at} />
                                    </p>
                                    <div className="flex justify-between gap-x-2 items-center flex-wrap">
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
            </div>
        </div>
    )
}



const HealthNews = ({ data }) => {
    return !data ? noHealthNews(data) : isHealthNews(data)
}

export default HealthNews