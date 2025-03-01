import { Table, Input } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineMessage } from 'react-icons/md';

// Sample data
const influencerData = [
    {
        id: '00001',
        name: 'Christine Brooks',
        userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        status: 'Active',
        eventsHosted: 5,
        eventsParticipated: 2,
        paymentHistory: '213$ Earned',
        role: 'Creator',
        country: 'USA',
    },
    {
        id: '00002',
        name: 'Rosie Pearson',
        userImage: 'https://randomuser.me/api/portraits/women/2.jpg',
        status: 'Suspended',
        eventsHosted: 0,
        eventsParticipated: 3,
        paymentHistory: '50$ Spent',
        role: 'Viewer',
        country: 'Canada',
    },
    {
        id: '00003',
        name: 'Darrell Caldwell',
        userImage: 'https://randomuser.me/api/portraits/men/3.jpg',
        status: 'Active',
        eventsHosted: 3,
        eventsParticipated: 1,
        paymentHistory: '150$ Earned',
        role: 'Creator',
        country: 'UK',
    },
    {
        id: '00004',
        name: 'Gilbert Johnston',
        userImage: 'https://randomuser.me/api/portraits/men/4.jpg',
        status: 'Suspended',
        eventsHosted: 2,
        eventsParticipated: 0,
        paymentHistory: '0$',
        role: 'Viewer',
        country: 'Australia',
    },
    {
        id: '00005',
        name: 'Alan Cain',
        userImage: 'https://randomuser.me/api/portraits/men/5.jpg',
        status: 'Suspended',
        eventsHosted: 1,
        eventsParticipated: 1,
        paymentHistory: '50$ Earned',
        role: 'Creator',
        country: 'Germany',
    },
    {
        id: '00006',
        name: 'Alfred Murray',
        userImage: 'https://randomuser.me/api/portraits/men/6.jpg',
        status: 'Active',
        eventsHosted: 4,
        eventsParticipated: 2,
        paymentHistory: '300$ Earned',
        role: 'Creator',
        country: 'USA',
    },
    {
        id: '00007',
        name: 'Maggie Sullivan',
        userImage: 'https://randomuser.me/api/portraits/women/7.jpg',
        status: 'Suspended',
        eventsHosted: 0,
        eventsParticipated: 0,
        paymentHistory: '0$',
        role: 'Viewer',
        country: 'Ireland',
    },
    {
        id: '00008',
        name: 'Rosie Todd',
        userImage: 'https://randomuser.me/api/portraits/women/8.jpg',
        status: 'Suspended',
        eventsHosted: 2,
        eventsParticipated: 0,
        paymentHistory: '0$',
        role: 'Viewer',
        country: 'Canada',
    },

];


const Users = () => {


    const columns = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            key: 'id',
            render: (_: any, __: any, index: number) => index + 1,
        },

        {
            title: 'User ',
            dataIndex: 'userImage',
            key: 'userImage',
            render: (_: any, record: any) => (
                <div className='flex items-center gap-1'>
                    <img src={record.userImage} alt="User" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <p> {record.name}</p>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Events Hosted',
            dataIndex: 'eventsHosted',
            key: 'eventsHosted',
        },
        {
            title: 'Events Participated',
            dataIndex: 'eventsParticipated',
            key: 'eventsParticipated',
        },
        {
            title: 'Payment History',
            dataIndex: 'paymentHistory',
            key: 'paymentHistory',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Campaign Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <button
                    style={{
                        fontWeight: 500,
                        backgroundColor: "#FFF7EC",
                        padding: "4px 16px",
                        borderRadius: "10px"
                    }}
                    className={status === 'Active' ? 'text-[#00B69B]' : 'text-red-500'}
                >
                    {status}
                </button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (

                <button><MdOutlineMessage color='#EF4136' size={22} /> </button>
            ),
        },
    ];
    return (
        <div className="">
            <div className="flex justify-between items-center pb-5">

                <h1 className="text-3xl text-primaryText font-semibold ">Users</h1>


                <Input
                    style={{
                        maxWidth: 320,
                        height: 45,
                    }}
                    placeholder="Search"
                    prefix={<CiSearch size={24} color='gray' />}
                />


            </div>
            <Table columns={columns} dataSource={influencerData} rowClassName="hover:bg-gray-100" />

        </div>
    );
};

export default Users;
