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

// Course
const CourseFormPage = Loadable(lazy(() => import('../../screens/mains/course/form')));
const CoursePage = Loadable(lazy(() => import('../../screens/mains/course')));

// Event
const EventFormPage = Loadable(lazy(() => import('../../screens/mains/event/form')));
const EventPage = Loadable(lazy(() => import('../../screens/mains/event/')));


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