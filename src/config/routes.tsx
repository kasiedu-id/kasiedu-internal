import { lazy } from "react";
import { Loadable } from "../components/reusables/Loading";
import { Navigate } from "react-router-dom";

// Layout
const BlankLayout = Loadable(lazy(() => import('../components/reusables/Layout/BlankLayout')));
const MainLayout = Loadable(lazy(() => import('../components/reusables/Layout/MainLayout')));

// Auths
const Login = Loadable(lazy(() => import('../modules/auths/signin')));

// Vocation
const VocationHomeDashboard = Loadable(lazy(() => import('../modules/master/vocation/home')));
const VocationList = Loadable(lazy(() => import('../modules/master/vocation')));
const DetailVocation = Loadable(lazy(() => import('../modules/master/vocation/detail')));

// Master
const InternalDashboard = Loadable(lazy(() => import('../modules/master/internal')));
const BrandList = Loadable(lazy(() => import('../modules/master/internal/brand')));
const BrandDetail = Loadable(lazy(() => import('../modules/master/internal/brand/detail')));
const CategoryList = Loadable(lazy(() => import('../modules/master/internal/category')));


const appRoutes = [
    {
        path: 'auths',
        element: <BlankLayout />,
        children: [
            { path: 'sign-in', element: <Login /> },
        ],
    },
    {
        path: '',
        element: <MainLayout />,
    },
    {
        path: 'vocations',
        element: <MainLayout />,
        children: [
            {
                path: '', element: <VocationHomeDashboard />
            },
            {
                path: 'list', element: <VocationList />
            },
            {
                path: ':id', element: <DetailVocation />
            },
        ]
    },
    {
        path: 'masters',
        element: <MainLayout />,
        children: [
            {
                path: '', element: <InternalDashboard />
            },
            {
                path: 'brands', element: <BrandList />,
            },
            {
                path: 'brands/:id', element: <BrandDetail />,
            },
            {
                path: 'categories', element: <CategoryList />
            },
        ]
    },
    { 
        // path: '*', element: <Navigate to="/auths/sign-in" /> 
    },
];

export default appRoutes;