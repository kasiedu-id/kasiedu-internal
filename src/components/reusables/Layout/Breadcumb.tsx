import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function BreadCumb() {
    const location = useLocation();
    const [url, setUrl] = useState([]);

    useEffect(() => {
        setUrl(location.pathname === '/' ? [""] : location.pathname.split('/'))
    }, [location.pathname])
    
    return(
        <div className="flex p-4">
            {
                url.map((data, index) => {
                    return (
                        <div className="flex">
                            <p className={`text-sm cursor-pointer ${index === 0 ? '' : 'pl-1'} capitalize italic ${url.length === index + 1 ? "text-[#ADB0BA]" : "text-[#24252B]"}`}>{data === "" ? 'Dashboard' : data}</p>
                            {
                                url.length === index + 1 ? null : <p style={{paddingLeft: '5px', color: "#07638d"}}>/</p>
                            }
                        </div>
                    )
                })
            }
         </div>
    )
}
  
export default BreadCumb;