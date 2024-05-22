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
        arrows: false
    }

    return (
        <div className="slider-container bg-slate-500">
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>

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