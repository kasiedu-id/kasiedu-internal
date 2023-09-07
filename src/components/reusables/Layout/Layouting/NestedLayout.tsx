
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NestedSide({side}) {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const [url, setUrl] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       let url = location.pathname.split('/')
       setUrl(url);

        if(url[1] === side?.href?.replace('/', "")){
            setShow(true);
        }
    }, [location.pathname])

    return (
        <div className='text-white px-4'> 
            <div className='flex items-center justify-between p-3 bg-[rgba(174,174,174,0.56)] hover:bg-[rgba(101,101,101,0.85)] my-2 rounded' onClick={() => setShow(!show)}>
                <div className='flex items-center' >
                    {side.icon}
                    <p className="text-xl font-semibold">{side.title}</p>
                </div>
                {
                    show ? <BiChevronUp /> : <BiChevronDown />
                }
            </div>
            {
                show ? <div className='pl-10'>
                    {
                        side.children.map((child) => {
                            return (
                                <div onClick={() => navigate(`${side.href}${child.href}`)} className={`${url[1] === side?.href?.replace('/', "") ? "bg-[rgba(106,106,106,0.8)]" : "bg-[rgba(174,174,174,0.56)]"} flex p-4 hover:bg-[rgba(101,101,101,0.85)] my-2 rounded items-center`}>
                                    {child.icon}
                                    <p className="text-xl">{child.title}</p>
                                </div>
                            )
                        })
                    }
                </div> : null
            }
        </div>
    )
}

export default NestedSide;