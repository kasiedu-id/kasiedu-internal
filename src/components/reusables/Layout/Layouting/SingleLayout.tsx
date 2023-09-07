import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SingleLayout({side}) {
    const location = useLocation();
    const [url, setUrl] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       let url = location.pathname.split('/')
       setUrl(url);
    }, [location.pathname])

    return (
        <div className="text-white px-4">
            <div onClick={() => navigate(`${side.href}`)} className={`${url[1] === side?.href?.replace('/', "") ? "bg-[rgba(106,106,106,0.8)]" : "bg-[rgba(174,174,174,0.56)]"} hover:bg-[rgba(101,101,101,0.85)] my-2 rounded flex items-center p-3`}>
                {side.icon}
                <p className="text-xl font-semibold">{side.title}</p>
            </div>
        </div>
    )
}

export default SingleLayout;