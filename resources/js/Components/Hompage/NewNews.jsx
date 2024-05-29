const isNewNews = (batasBerita) => {
    return batasBerita.map((data, i) => {
        return (
            <div key={i} className="cardsl side">
                <figure>
                    <img src={`/storage/images/${data.foto}`} alt="Shoes" />
                </figure>

                <div className="cb">
                    <h2 className="cd text-end description">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <div className="card-actions justify-end">
                        <div className="badge badge-secondary">{data.category}</div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        )
    })
}


const noNewNews = () => {
    return (
        <div>Belum Ada Berita Hari Ini</div>
    )
}

const BeritaTerbaru = ({ newNews }) => {
    const batasBerita = newNews.slice(0, 5);
    return !newNews ? noNewNews() : isNewNews(batasBerita)
}


export default BeritaTerbaru