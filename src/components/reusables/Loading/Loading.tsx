import './LoadingModal.css'; // Add CSS for styling
import KasiEduLogo from '../../../assets/logo/Logo-KasiEdu.png';

const LoadingModal = ({open} : any) => {
    return (
        <div
            className={`fixed ${open ? "" : "hidden"
                } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto`}
        >
            <div className="relative mx-auto p-5 w-3/4 rounded-md h-full overflow-hidden">
                <div className="ring p-4">
                    <img src={KasiEduLogo} alt="Loading" className='mt-[40px]' />
                    <span className='spinner'></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;