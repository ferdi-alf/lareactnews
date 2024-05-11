import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonMyNews = () => {
    return (
        <div className='gap-y-8'>
            {/* Tambahkan elemen skeleton loading yang Anda butuhkan */}
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
            {/* Sesuaikan jumlah dan properti skeleton sesuai kebutuhan */}
        </div>
    );
};

export default SkeletonMyNews;