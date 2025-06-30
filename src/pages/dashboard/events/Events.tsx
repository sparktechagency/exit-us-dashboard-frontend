import { ConfigProvider, Spin, Table } from 'antd';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDeleteEventsMutation, useGetEventsQuery } from '../../../redux/apiSlice/events/events';
import Swal from 'sweetalert2';

export default function Events() {
    const { data, isLoading } = useGetEventsQuery(undefined);
    const [deleteEvents] = useDeleteEventsMutation();
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',
                fontWeightStrong: 700,
                scrollX,
            },
        },
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want be evetns delete this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEvents(id);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                });
            }
        });
    };

    return (
        <>
            {/* Table */}
            <div className="rounded-lg mx-auto overflow-x-auto">
                {/* Loader */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spin size="large" />
                        <p className="ml-3 text-lg">Loading Orders...</p>
                    </div>
                ) : (
                    <ConfigProvider theme={tableTheme}>
                        <Table
                            bordered={false}
                            dataSource={data?.data}
                            pagination={{ pageSize: 10 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-6">BookedId</div>}
                                dataIndex="_id"
                                key="_id"
                                render={(_id) => <p className="ml-7">#{_id.slice(4, 8)}</p>}
                            />
                            <Table.Column
                                title="Booked Date"
                                dataIndex="date"
                                key="date"
                                render={(date) => date.slice(0, 10)}
                            />
                            <Table.Column
                                title={<span className="ml-7">Title</span>}
                                dataIndex="title"
                                key="title"
                                render={(title) => title || 'N/A'}
                            />
                            <Table.Column
                                title="Location"
                                dataIndex="location"
                                key="location"
                                render={(location) => location || 'N/A'}
                            />

                            <Table.Column
                                title={<div className="mr-10">Action</div>}
                                dataIndex="action"
                                key="action"
                                align="center"
                                render={(_, record) => (
                                    <div className="w-full lg:w-[80%]">
                                        <div className="flex lg:flex-row flex-col items-center justify-center gap-2 lg:gap-5 py-2 rounded-md   px-2 lg:px-0">
                                            <span
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md border border-stoke`}
                                                onClick={() => handleDelete(record?._id)}
                                            >
                                                <RiDeleteBin5Line size={24} className="text-[#FE3838]" />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                        </Table>
                    </ConfigProvider>
                )}
            </div>

            {/* delete modal */}
            {/* {isDeleteModalOpen && (
                <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
            )} */}
        </>
    );
}
