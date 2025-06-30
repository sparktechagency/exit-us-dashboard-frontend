import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { useGetProfileQuery } from '../redux/apiSlice/settings/settings';

export default function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const { data: profile, isLoading, isFetching, isError } = useGetProfileQuery(undefined);
    const location = useLocation();

    if (isFetching || isLoading) {
        return <Loading />;
    }

    if (isError || !profile?.data) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (allowedRoles.includes(profile.data.role)) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
}
