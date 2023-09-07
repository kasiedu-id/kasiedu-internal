import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KasiEduLogo from "../../../assets/logo/Logo-KasiEdu.png";
import { InputSingleField } from "../../../components/reusables/Field/InputField";
import TextButton from "../../../components/reusables/Button/TextButton";
import { PasswordField } from "../../../components/reusables/Field/PasswordField";
import { HttpPost } from "../../../config/api";
import { toast } from "react-toastify";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) navigate("/");
  }, []);

  async function submit() {
    setLoading(true);

    try {
      let res = await HttpPost('auths/login', {
        email,
        password,
        roleType: 'internal'
      }, null);

      sessionStorage.setItem("accessToken", res.accessToken);
      toast("Success Login!");
      navigate("/");
    } catch (error) {
      toast(error?.message)
    }

    setLoading(false);
  }

  return (
    <div className="bg-gradient-to-tl from-[#ffcd56] to-[#07638d] p-[50px] h-[100vh] flex items-center justify-center">
      <div className="border bg-white rounded pb-8 px-3 w-full max-w-[550px]">
        <img
          src={KasiEduLogo}
          alt={"Logo Kasi Edu"}
          className="block h-[50px] pt-2 mb-5 mx-auto pl-5"
        />
        <p className="text-center text-xl text-black font-bold mb-5">
          Admin Dashboard
        </p>
        <InputSingleField
          textColor={"black"}
          value={email}
          type={"email"}
          placeholder={""}
          required={true}
          label={"Email"}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <div className="my-2">
          <PasswordField
            labelColor={"black"}
            value={password}
            placeholder={""}
            label={"Password"}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <TextButton
            title={"Sign In"}
            onClick={() => submit()}
            disable={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
