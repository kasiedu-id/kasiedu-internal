import { useState } from "react";
import TextButton from "../../../../components/reusables/Button/TextButton";
import { InputSingleField } from "../../../../components/reusables/Field/InputField";

function CustomerAccountPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <div>
            <div className="flex gap-10 mb-4 px-4">
                <div className="grid grid-cols-3 gap-2">
                    <InputSingleField
                        required={false}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Name"}
                    />
                    <InputSingleField
                        required={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"Email"}
                    />
                    <InputSingleField
                        required={false}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={"Phone Number"}
                    />
                </div>
                <div className="pt-2">
                    <TextButton title="Search" onClick={() => null} disable={false} />
                </div>
            </div>
        </div>
    );
}

export default CustomerAccountPage;