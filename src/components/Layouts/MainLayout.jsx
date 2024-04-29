import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingModal from '../Loadings';
import { useDispatch } from 'react-redux';
import { initiate } from '../../configs/store/global/action';

export default function MainLayout() {
    const router = useNavigate();
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
    
        if(!token) {
            router('/auths/sign-in');
        } else {
            setLoading(false);
            dispatch(initiate());
        }
      }, []);

    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <Outlet />
                    </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
            </div>
            <LoadingModal open={loading} />
        </div>
    )
}
