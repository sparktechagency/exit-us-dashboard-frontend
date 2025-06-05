import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { useGetProfileQuery } from '../redux/apiSlice/settings/settings';

export default function PrivateRoutes({ children }: { children: React.ReactNode }) {
    const { data: profile, isLoading, isFetching, isError } = useGetProfileQuery(undefined);
    const location = useLocation();

    if (isFetching || isLoading) {
        return <Loading />;
    }

    if (!profile?.data || isError) {
        return <Navigate to="/login" state={{ form: location }} />;
    }

    if (profile?.data?.role === 'SUPER_ADMIN') {
        return children;
    }

    return <Navigate to="/login" />;
}
