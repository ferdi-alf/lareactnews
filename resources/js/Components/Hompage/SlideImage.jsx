import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const isImage = (news) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {news.map((data, i) => (
                    <div className="slide" key={i}>
                        <img src={`/storage/images/${data.foto}`} alt="Shoes" />
                    </div>
                ))}
            </Slider>
        </div>
    )

}

const noImage = () => {
    return (
        <h1>Belum ada berita saat ini</h1>
    );
}

const SlideImage = ({ news }) => {
    return !news ? noImage() : isImage(news);
}

export default SlideImage;