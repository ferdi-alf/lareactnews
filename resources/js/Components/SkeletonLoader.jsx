import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import '../../../public/css/style.css'


const SkeletonLoader = () => {
    return (
        <div className='gap-y-8'>
            {/* Tambahkan elemen skeleton loading yang Anda butuhkan */}
            <Skeleton className='w-full' height={100} />
            <Skeleton className='w-full' height={100} />
            {/* Sesuaikan jumlah dan properti skeleton sesuai kebutuhan */}
        </div>
    );
};

export default SkeletonLoader;