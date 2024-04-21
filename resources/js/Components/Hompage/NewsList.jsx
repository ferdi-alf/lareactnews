import { Link } from "@inertiajs/react";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                            <div className="titleT ">Lima Dampak Kucuran Dana Baru 95 Miliar AS dari AS untuk Ukraina, Israel dan Taiwan</div>
                            <div className="badge view ">
                                <FontAwesomeIcon icon={faEye} />
                                12
                            </div>
                        </div>
                        <div className="description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ipsam ut atque rerum aut facere quos labore, animi numquam reiciendis.
                        </div>
                        <div className="author">
                            <div className="category">
                                <div className="carbon">16 jam yang lalu</div>
                            </div>
                            <div className="badge name">Ferdi</div>
                            <div className="badge badge-secondary">Category</div>
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

