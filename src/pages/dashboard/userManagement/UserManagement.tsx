import { Select, Table } from 'antd';
const data = [
    {
        key: '00001',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00002',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00003',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00004',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00005',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',
        status: 'Block',
    },
    {
        key: '00001',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00002',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00003',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00004',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',

        status: 'Block',
    },
    {
        key: '00005',
        userName: 'Beatrice Pedrali',
        email: 'abg@gmail.com',
        phone: '+698744',
        image: 'https://i.ibb.co.com/HpL1HMKZ/image-2.png',
        status: 'Block',
    },
];

export default function UserManagement() {
    // Column definitions
    const columns = [
        {
            title: <span className="title">User Name</span>,
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: <span className="title">Email</span>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: <span className="title">Image</span>,
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="" className="w-10 h-10 rounded-full" />,
        },
        {
            title: <span className="title">phone</span>,
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: <span className="title">Status</span>,
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Select defaultValue={status} className="w-24">
                    <Select.Option value="Block">Block</Select.Option>
                    <Select.Option value="Unblock">Unblock</Select.Option>
                </Select>
            ),
        },
    ];
    return (
        <div className="">
            <div className="mt-4">
                <Table
                    columns={columns}
                    pagination={{ pageSize: 7 }}
                    dataSource={data}
                    // rowClassName="hover:bg-gray-100"
                />
            </div>
        </div>
    );
}
