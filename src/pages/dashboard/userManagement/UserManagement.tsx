import { Select, Table } from 'antd';
import { useGetUsersQuery, useUpdateUserMutation } from '../../../redux/apiSlice/users/users';
import { imageUrl } from '../../../redux/baseApi/api';
import toast from 'react-hot-toast';

export default function UserManagement() {
    const { data, isLoading, isFetching, refetch } = useGetUsersQuery(undefined);
    const [updateUser] = useUpdateUserMutation();

    const handleStatus = async (id: string, status: string) => {
        try {
            await updateUser({ id, status });
            refetch();
            toast.success('Status updated');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const columns = [
        {
            title: <span className="title">User Name</span>,
            dataIndex: 'name',
            key: 'name',
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
            render: (image: string) => (
                <img
                    src={image.startsWith('http') ? image : `${imageUrl}${image}`}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        {
            title: <span className="title">phone</span>,
            dataIndex: 'phone',
            key: 'phone',
            render: (phone: string) => <div className="">{phone}</div>,
        },

        {
            title: <span className="title flex justify-center mr-4">Status</span>,
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: { _id: string }) => (
                <div className="flex justify-center items-center">
                    <Select
                        onChange={(newStatus) => handleStatus(record?._id, newStatus)}
                        defaultValue={status == 'delete' ? 'Deactive' : 'Active'}
                        className="w-24"
                    >
                        <Select.Option value="Block">Active </Select.Option>
                        <Select.Option value="Unblock">Deactive</Select.Option>
                    </Select>
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="mt-4">
                <Table
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    dataSource={data?.data}
                    loading={isLoading || isFetching}
                    rowKey="_id"
                />
            </div>
        </div>
    );
}
