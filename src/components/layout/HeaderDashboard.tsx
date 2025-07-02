import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/apiSlice/settings/settings';
import { imageUrl } from '../../redux/baseApi/api';
import Loading from '../shared/Loading';

const pathLink = [
    { label: 'Dashboard', path: '/' },
    { label: 'User Management', path: '/user-management' },
    { label: 'Donate', path: '/donate' },
    { label: 'Events', path: '/events' },
    { label: 'Top Communities', path: '/top-communities' },
    { label: 'Change Password', path: '/change-password' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms Condition', path: '/terms-condition' },
    { label: 'Profile', path: '/profile' },
    { label: 'Edit Profile', path: '/edit-profile' },
];

export default function Header() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery(undefined);
    const profileData = data?.data;
    const location = useLocation();
    const currentPath = location.pathname;
    const currentPathName = pathLink.find((item) => item.path === currentPath);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="flex justify-between py-9 px-5">
            <div className="flex items-center gap-2 px-4">
                <div className="text-xl">{currentPathName ? currentPathName.label : ''}</div>
            </div>

            <div className="flex items-center justify-center  gap-5 px-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
                    <img
                        className="rounded-full w-10 h-10 border-2 border-[#8AC2FF]"
                        src={
                            profileData?.image?.startsWith('http')
                                ? profileData?.image
                                : `${imageUrl}${profileData?.image}`
                        }
                        alt="pic"
                    />
                    <div>{profileData?.name}</div>
                </div>
            </div>
        </div>
    );
}
