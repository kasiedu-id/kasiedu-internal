export const SearchField = ({
  search,
  selectedValue,
  searchMode,
  placeholder,
  type,
  onChange,
  collectionList,
  valueListField,
  keyListField,
  labelListField,
  clicked,
}) => {
  return (
    <div className="w-full">
      <input
        value={
          selectedValue && !searchMode ? selectedValue[valueListField] : search
        }
        className="appearance-none block text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type={type ?? "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
      {!searchMode ? null : (
        <div className="mt-3 p-1">
          {collectionList.length > 0 ? (
            <p className="text-sm text-black font-medium">Category:</p>
          ) : null}
          {collectionList.map((data) => {
            return (
              <div
                className={`capitalize text-xs font-bold my-2 p-2 text-black rounded-lg ${
                  data[valueListField] === selectedValue[valueListField]
                    ? "bg-slate-400 text-white"
                    : ""
                } hover:bg-slate-400 hover:text-white`}
                key={data[keyListField]}
                onClick={() => clicked(data)}
              >
                {data[labelListField]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
