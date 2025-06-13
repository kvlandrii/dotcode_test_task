import Loader from '../atoms/Loader'

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <Loader />
        </div>
    )
}

export default FullScreenLoader
