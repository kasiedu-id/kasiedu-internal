
export const CheckboxField = ({
    textColor,
    label
}) => {
    return (
        <div className="w-full">
            <label
                className={`block tracking-wide text-${textColor ?? "white"} text-xs font-bold mb-2`}
                htmlFor={`input-${label?.replace(/ /g, "-")}`}
            >
                {label}
            </label>
            <div>
                <input type="checkbox" id="some_id" />
                <label htmlFor="some_id">This is the checkbox label</label>
            </div>
        </div>

    )
}