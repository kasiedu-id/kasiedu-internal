import { lazy } from "react";
import Loadable from "../../components/Loadings/Loadable";

const MainLayout = Loadable(lazy(() => import('../../components/Layouts/MainLayout')));

// Auths
const SignInPage = Loadable(lazy(() => import('../../screens/auths/SignIn')));
const HomePage = Loadable(lazy(() => import('../../screens/mains/dashboard/Home')));

// Support
const MentorPage = Loadable(lazy(() => import('../../screens/mains/setting/mentor')));
const MentorFormPage = Loadable(lazy(() => import('../../screens/mains/setting/mentor/form')));

// Institute
const InstituteFormPage = Loadable(lazy(() => import('../../screens/mains/institute/form')));
const InstitutePage = Loadable(lazy(() => import('../../screens/mains/institute')));

// Course
const CourseFormPage = Loadable(lazy(() => import('../../screens/mains/course/form')));
const CoursePage = Loadable(lazy(() => import('../../screens/mains/course')));

// Event
const EventFormPage = Loadable(lazy(() => import('../../screens/mains/event/form')));
const EventPage = Loadable(lazy(() => import('../../screens/mains/event/')));


// User
const UserFormPage = Loadable(lazy(() => import('../../screens/mains/user/form')));
const UserPage = Loadable(lazy(() => import('../../screens/mains/user/')));


const appRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <HomePage /> },
        ],
    },
    {
        path: '/institutes',
        element: <MainLayout />,
        children: [
            { path: 'form', element: <InstituteFormPage /> },
            { path: 'list', element: <InstitutePage /> },
        ],
    },
    {
        path: '/users',
        element: <MainLayout />,
        children: [
            { path: 'form', element: <UserFormPage /> },
            { path: 'list', element: <UserPage /> },
        ],
    },
    {
        path: '/courses',
        element: <MainLayout />,
        children: [
            { path: 'list', element: <CoursePage /> },
            { path: 'form', element: <CourseFormPage /> },
        ],
    },
    {
        path: '/mentors',
        element: <MainLayout />,
        children: [
            { path: 'list', element: <MentorPage /> },
            { path: 'form', element: <MentorFormPage /> },
        ],
    },
    {
        path: '/events',
        element: <MainLayout />,
        children: [
            { path: 'list', element: <EventPage /> },
            { path: 'form', element: <EventFormPage /> },
        ],
    },
    {
        path: 'auths',
        children: [
            { path: 'sign-in', element: <SignInPage /> },
        ],
    }
];

export default appRoutes;