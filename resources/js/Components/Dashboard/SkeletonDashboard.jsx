import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonDashboard = () => {
    return (
        <div className="w-full flex flex-wrap justify-around mb-3">
            <Skeleton height={100} width={400} />
            <Skeleton height={100} width={400} />
        </div>
    )
}

export default SkeletonDashboard