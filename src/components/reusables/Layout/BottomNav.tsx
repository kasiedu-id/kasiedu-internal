import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [url, setUrl] = useState<String[]>([]);
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname.split("/"));
  }, [location]);

  return (
    <div className="mt-[10%]">
      <section className="block fixed max-w-[550px] inset-x-0 bottom-0 mx-auto z-10 bg-gradient-to-tl from-[#ffcd56] to-[#07638d] text-white shadow">
        <div id="tabs" className="flex justify-between">
          <div
            onClick={() => navigate("/")}
            className={`w-full focus:text-[#ffcc56] ${
              url[1] === "" ? "text-[#ffcc56]" : ""
            } hover:text-[#ffcc56] justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 42 42"
              className="inline-block mb-1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                ></path>
                <path
                  d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  fillOpacity="0.1"
                ></path>
                <rect
                  fill="currentColor"
                  transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) "
                  x="17"
                  y="10.3137085"
                  width="30"
                  height="2"
                  rx="1"
                ></rect>
                <rect
                  fill="currentColor"
                  transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) "
                  x="-3"
                  y="10.3137085"
                  width="30"
                  height="2"
                  rx="1"
                ></rect>
              </g>
            </svg>
            <span className="tab tab-home block text-xs">Home</span>
          </div>
          <div
            onClick={() => navigate("/vocations")}
            className={`w-full focus:text-[#ffcc56] ${
              url[1] === "vocations" ? "text-[#ffcc56]" : ""
            } hover:text-[#ffcc56] justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="inline-block mb-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M8 0a.5.5 0 0 1 .447.276L8.81 1h4.69A1.5 1.5 0 0 1 15 2.5V11h.5a.5.5 0 0 1 0 1h-2.86l.845 3.379a.5.5 0 0 1-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 0 1-.97-.242L3.36 12H.5a.5.5 0 0 1 0-1H1V2.5A1.5 1.5 0 0 1 2.5 1h4.691l.362-.724A.5.5 0 0 1 8 0ZM2 11h12V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V11Zm9.61 1H4.39l-.25 1h7.72l-.25-1Z"
              />
            </svg>
            <span className="tab tab-explore block text-xs">Vocation</span>
          </div>
          <div
            onClick={() => navigate("/classes")}
            className={`w-full focus:text-[#ffcc56] ${
              url[1] === "classes" ? "text-[#ffcc56]" : ""
            } hover:text-[#ffcc56] justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mb-1"
            >
              <path
                fill="currentColor"
                d="M1.6367 1.6367C.7322 1.6367 0 2.369 0 3.2734v17.4532c0 .9045.7322 1.6367 1.6367 1.6367h20.7266c.9045 0 1.6367-.7322 1.6367-1.6367V3.2734c0-.9045-.7322-1.6367-1.6367-1.6367H1.6367zm.545 2.1817h19.6367v16.3632h-2.7266v-1.0898h-4.9102v1.0898h-12V3.8184zM12 8.1816c-.9046 0-1.6367.7322-1.6367 1.6368 0 .9045.7321 1.6367 1.6367 1.6367.9046 0 1.6367-.7322 1.6367-1.6367 0-.9046-.7321-1.6368-1.6367-1.6368zm-4.3633 1.9102c-.6773 0-1.2285.5493-1.2285 1.2266 0 .6772.5512 1.2265 1.2285 1.2265.6773 0 1.2266-.5493 1.2266-1.2265 0-.6773-.5493-1.2266-1.2266-1.2266zm8.7266 0c-.6773 0-1.2266.5493-1.2266 1.2266 0 .6772.5493 1.2265 1.2266 1.2265.6773 0 1.2285-.5493 1.2285-1.2265 0-.6773-.5512-1.2266-1.2285-1.2266zM12 12.5449c-1.179 0-2.4128.4012-3.1484 1.0059-.384-.1198-.8043-.1875-1.2149-.1875-1.3136 0-2.7285.695-2.7285 1.5586v.8965h14.1836v-.8965c0-.8637-1.4149-1.5586-2.7285-1.5586-.4106 0-.831.0677-1.2149.1875-.7356-.6047-1.9694-1.0059-3.1484-1.0059Z"
              />
            </svg>
            <span className="tab tab-whishlist block text-xs">Project</span>
          </div>
          <div
            onClick={() => navigate('/masters')}
            className={`w-full focus:text-[#ffcc56] ${
              url[1] === "masters" ? "text-[#ffcc56]" : ""
            } hover:text-[#ffcc56] justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              className="inline-block mb-1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path fill="none" d="M0 0h24v24H0z" />{" "}
                <path
                  fill="currentColor"
                  d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z"
                />
              </g>
            </svg>
            <span className="tab tab-account block text-xs">Master</span>
          </div>
        </div>
      </section>
    </div>
  );
}
