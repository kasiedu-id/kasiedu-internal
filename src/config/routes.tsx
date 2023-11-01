import { lazy } from "react";
import { Loadable } from "../components/reusables/Loading";

// Layout
const BlankLayout = Loadable(lazy(() => import('../components/reusables/Layout/BlankLayout')));
const MainLayout = Loadable(lazy(() => import('../components/layout/MainLayout')));

// Auths
const Login = Loadable(lazy(() => import('../modules/auths/signin')));

// Vocation
const VocationList = Loadable(lazy(() => import('../modules/master/vocation')));
const DetailVocation = Loadable(lazy(() => import('../modules/master/vocation/detail')));
const VocationClassList = Loadable(lazy(() => import('../modules/master/vocation/class')));
const VocationEventGallery = Loadable(lazy(() => import('../modules/master/vocation/event')));
const VocationArchive = Loadable(lazy(() => import('../modules/master/vocation/archive')));

// Master
const InternalDashboard = Loadable(lazy(() => import('../modules/master/internal')));
const BrandList = Loadable(lazy(() => import('../modules/master/internal/brand')));
const SponsorList = Loadable(lazy(() => import('../modules/master/sponsor')));
const BrandDetail = Loadable(lazy(() => import('../modules/master/internal/brand/detail')));
const CategoryList = Loadable(lazy(() => import('../modules/master/internal/category')));

// Class
const ClassList = Loadable(lazy(() => import('../modules/master/class')));
const ClassArchive = Loadable(lazy(() => import('../modules/master/class/archive')));
const ProjectList = Loadable(lazy(() => import('../modules/master/project')));
const ProjectArchive = Loadable(lazy(() => import('../modules/master/project/archive')));


// Account
const CustomerAccountPage = Loadable(lazy(() => import('../modules/master/account/customer')));
const InternalAccountPage = Loadable(lazy(() => import('../modules/master/account/internal')));
const VocationAccountPage = Loadable(lazy(() => import('../modules/master/account/vocation')));



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
        path: 'accounts',
        element: <MainLayout />,
        children: [
            { path: 'user', element: <CustomerAccountPage /> },
            { path: 'admin', element: <InternalAccountPage /> },
            { path: 'vocation', element: <VocationAccountPage /> },
        ],
    },
    {
        path: 'vocations',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <VocationList />
            },
            {
                path: 'archive',
                element: <VocationArchive />
            },
            {
                path: 'event/:id',
                element: <VocationEventGallery />
            },
            {
                path: ':id',
                element: <DetailVocation />
            },
        ]
    },
    {
        path: 'classes',
        element: <MainLayout />,
        children: [
            {
                path: 'vocation',
                children: [
                    {
                        path: ':id',
                        element: <VocationClassList />,
                    }
                ]
            },
            {
                path: '', 
                element: <ClassList />
            },
            {
                path: 'archive', 
                element: <ClassArchive />
            },
        ]
    },
    {
        path: 'sponsors',
        element: <MainLayout />,
        children: [
            {
                path: '', 
                element: <SponsorList />
            },
        ]
    },
    {
        path: 'projects',
        element: <MainLayout />,
        children: [
            {
                path: '', 
                element: <ProjectList />
            },
            {
                path: 'archive', 
                element: <ProjectArchive />
            },
        ]
    },
    {
        path: 'brands',
        element: <MainLayout />,
        children: [
            {
                path: '', 
                element: <BrandList />
            },
            {
                path: ':id', 
                element: <BrandDetail />
            },
        ]
    },
    {
        path: 'settings',
        element: <MainLayout />,
        children: [
            {
                path: '', element: <InternalDashboard />
            },
            {
                path: 'category', element: <CategoryList />
            },
        ]
    },
    {
        // path: '*', element: <Navigate to="/auths/sign-in" /> 
    },
];

export default appRoutes;