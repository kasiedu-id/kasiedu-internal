import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import dummy from '../../../constants/dummies';
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TextAreaField } from "../../../components/Fields/TextAreaField";

function PartnerPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [type, setType] = useState(null);

    const [addressWork, setAddressWork] = useState('');
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [subdistrict, setSubdistrict] = useState(null);
    const [urban, setUrban] = useState(null);
    const [zipPost, setZipPost] = useState(null);

    const [types, setTypes] = useState([]);

    useEffect(() => {
        setTypes(dummy.partnerType);
    }, [])

    return (
        <div>
            <div className="h-screen w-full flex justify-center items-center">
                <h1 className="text-3xl text-black font-semibold text-center">Under Development</h1>
            </div>
        </div>
    );
}

export default PartnerPage;
