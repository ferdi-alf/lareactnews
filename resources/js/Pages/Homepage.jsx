import NewsList from '@/Components/Hompage/NewsList';
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';
import React from 'react';
import Paginator from '@/Components/Hompage/Paginator';
import BeritaTerbaru from '@/Components/Hompage/NewNews'
import '../../../public/css/style.css'
import SlideImage from '@/Components/Hompage/SlideImage';
import Logo from '../../../public/images/logo-portal.png'
import SkeletonLoader from '@/Components/SkeletonLoader';
import { useState, useEffect } from 'react';


export default function Homepage(props) {
    console.log('props: ', props)

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
        return;
    }, [])

    return (
        <div className='min-h-screen main'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className='index flex flex-wrap'>
                <div className='flex bblr rounded-lg  justify-center flex-col m-5  '>
                    <SlideImage news={props.news.data} />
                    <div className="text-header">
                        <div>
                            <h1 className='mt-4'>Cuyy <span className='text-slate-400'>News</span></h1>
                            <p className='mt-4 text-slate-400'>Website Portal Berita Terpecaya</p>
                        </div>
                        <img src={Logo} alt="" />
                    </div>
                    <svg className='w-full rounded-lg ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ef33dc" fillOpacity="0.93" d="M0,128L34.3,160C68.6,192,137,256,206,256C274.3,256,343,192,411,192C480,192,549,256,617,256C685.7,256,754,192,823,186.7C891.4,181,960,235,1029,240C1097.1,245,1166,203,1234,186.7C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
                </div>
                <div className="flex bblr lg justify-center flex-col m-5">
                    <div className="text-start w-full mb-4 divider">
                        <p>Berita Terbaru</p>
                    </div>
                    <div className="news w-full flex flex-col items-center">
                        <BeritaTerbaru newNews={props.newNews.data} />
                    </div>
                </div>
            </div>

            <div className='berita-lainnya'>
                <h1>Berita Lainnya</h1>
                {/* Cara mengambil data dari database */}
                {loading && <SkeletonLoader />}

                {!loading && <NewsList news={props.news.data} />}

                <div className="flex justify-center items-center">
                    <Paginator meta={props.news.meta} />
                </div>
            </div>
        </div>

    )
}