import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dasboard/Dashboard';
import UserManagement from '../pages/dashboard/userManagement/UserManagement';
import PrivacyPolicy from '../pages/dashboard/PrivacyPolicy';
import EditProfile from '../pages/dashboard/profile/EditProfile';
import ChangePassword from '../pages/dashboard/profile/ChangePassword';
import Donate from '../pages/dashboard/donate/Donate';
import TopCommunities from '../pages/dashboard/allMeetups/AllMeetups';
import Events from '../pages/dashboard/events/Events';
import Profile from '../pages/dashboard/profile/Profile';
import TermsCondition from '../pages/dashboard/TermsCondition';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoutes>
                <App />
            </PrivateRoutes>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: 'user-management', element: <UserManagement /> },
            { path: 'donate', element: <Donate /> },
            { path: 'events', element: <Events /> },
            { path: 'top-communities', element: <TopCommunities /> },
            { path: 'terms-condition', element: <TermsCondition /> },
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'profile', element: <Profile /> },
            { path: 'edit-profile', element: <EditProfile /> },
            { path: 'change-password', element: <ChangePassword /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
