import { ConfigProvider, Menu } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import logo from '../../assets/logo.svg';
import { LuLayoutDashboard } from 'react-icons/lu';
import Booking from '../../../public/sidebar-icon/booking.svg';
import Total from '../../../public/sidebar-icon/total.svg';
import Terms from '../../../public/sidebar-icon/temrs.svg';
import Policy from '../../../public/sidebar-icon/policy.svg';
import { FaRegUser } from 'react-icons/fa6';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { RiUserCommunityLine } from 'react-icons/ri';
import { AiOutlineContainer, AiTwotoneContainer } from 'react-icons/ai';
import { MdOutlineVerifiedUser } from 'react-icons/md';

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState<string>('/');
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        {
            key: '/',
            icon: <LuLayoutDashboard size={24} />,
            label: (
                <Link to="/" className="">
                    Dashboard
                </Link>
            ),
        },
        {
            key: '/users',
            icon: <FaRegUser size={24} />,
            label: <Link to="/users">Users Management</Link>,
        },
        {
            key: '/donate',
            icon: <BiSolidDonateHeart size={24} />,
            label: <Link to="/donate">Donate</Link>,
        },
        {
            key: '/events',
            icon: <MdOutlineVerifiedUser size={24} />,
            label: <Link to="/events">Events</Link>,
        },

        {
            key: '/top-communities',
            icon: <RiUserCommunityLine size={24} />,
            label: <Link to="/top-communities">Top Communities</Link>,
        },

        {
            key: 'edit-profile',
            icon: <IoSettingsOutline size={24} />,
            label: (
                <Link to="/edit-profile" className="text-white hover:text-white">
                    Settings
                </Link>
            ),
        },
        {
            key: '/terms-condition',
            icon: <AiOutlineContainer size={24} />,
            label: (
                <Link to="/terms-condition" className="text-white hover:text-white">
                    Terms And Condition
                </Link>
            ),
        },
        {
            key: '/privacy',
            icon: <AiTwotoneContainer size={24} />,
            label: (
                <Link to="/policy" className="text-white hover:text-white">
                    Privacy Policy
                </Link>
            ),
        },

        {
            key: '/logout',
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Logout</p>,
        },
    ];

    const handleOpenChange = (keys: string[] = []) => {
        setOpenKeys(keys);
    };

    return (
        <div className="mt-5 ">
            <Link to={'/'} className="flex justify-center items-center mb-5 my-[22px] mx-">
                <div>
                    <img src={logo} alt="" className="h-[73px] mx-6 border-b border-white" />
                    <h1 className="font-medium text-[18px] mt-4 text-center">Exodus Dashboard</h1>
                </div>
            </Link>
            <hr className=" !border-bottom border-[#ffbc58] mb-5" />

            <ConfigProvider
                theme={{
                    token: {
                        colorText: '#fffff',
                    },
                    components: {
                        Menu: {
                            itemBorderRadius: '0px' as any,
                            itemHeight: 60,
                        },
                    },
                }}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    onSelect={({ key }) => setSelectedKey(key)}
                    items={menuItems}
                />
            </ConfigProvider>
        </div>
    );
};

export default Sidebar;
