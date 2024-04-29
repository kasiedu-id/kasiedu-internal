import './LoadingModal.css'; // Add CSS for styling
  
const Circular = () => {
    return (
        <div className="relative w-[21px] h-[21px]">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            stroke-width="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="text-indigo-500 progress-ring__circle stroke-current"
            stroke-width="10"
            stroke-linecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke-dashoffset="calc(400 - (400 * 45) / 100)"
          ></circle>
        </svg>
      </div>
    );
};

export default Circular;
