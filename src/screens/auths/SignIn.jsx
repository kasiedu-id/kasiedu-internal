import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSingleField } from "../../components/Fields/InputField";
import { PasswordField } from "../../components/Fields/PasswordField";
import GeneralButton from "../../components/Buttons/GeneralButton";
import LoadingModal from "../../components/Loadings";
import { toast } from "react-toastify";
import Logo from '../../assets/logo/logo.png';
import { login } from "../../configs/api/services/auth";

function SignInPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setLoading(true);
        const token = sessionStorage.getItem('accessToken');

        if(token) navigate('/');
        setLoading(false);
    }, []);

    async function submit() {
        try {
            setLoading(true);

            const res = await login({ email, password, });

            sessionStorage.setItem('accessToken', res?.accessToken);
            sessionStorage.setItem('userInfo', JSON.stringify(res?.user));

            setTimeout(() => {
                toast('Success Login!');
                setLoading(false);
                navigate('/');
            }, 5000)
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10 h-[100vh] flex items-center justify-center">
            <div className="border bg-white rounded pb-8 px-3 w-full max-w-[550px]">
                <div className="flex justify-center items-center">
                    <img src={Logo} alt="logo" className="lg:h-[100px] pt-2 mt-2" height={100} width={400} />
                </div>
                <p className="my-5 text-2xl text-center text-[#28689B] font-semibold">Login Dashboard</p>
                <div className="my-2">
                    <InputSingleField
                        labelWeight={"font-bold"}
                        value={email}
                        type={"email"}
                        placeholder={""}
                        required={true}
                        label={"Email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <PasswordField
                        labelWeight={"font-bold"}
                        value={password}
                        placeholder={""}
                        label={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <GeneralButton title={"Sign In"} onClick={() => submit()} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default SignInPage;
