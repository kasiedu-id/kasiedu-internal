
function BaseModal({ open, children }) {

  return (
    <div className={`fixed ${open ? "" : "hidden"} z-40 inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
      <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg rounded-md bg-white">
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
