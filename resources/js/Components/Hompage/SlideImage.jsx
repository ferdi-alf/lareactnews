const isImage = (news) => {
    return (
        <div className="carousel w-full">
            {news.map((data, i) => (
                <div key={i} id={`slide${i + 1}`} className="carousel-item rounded-lg  relative w-full">
                    <img src={`/storage/images/${data.foto}`} className=" im" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${(i === news.length - 1) ? 1 : i + 2}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${(i === news.length - 1) ? 1 : i + 2}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
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