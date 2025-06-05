import { ConfigProvider, Spin, Table } from 'antd';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import DetailsModal from '../../../modal/DetailsModal';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { useDeleteMeetupsMutation, useGetMeetupsQuery } from '../../../redux/apiSlice/allMeetups/allMeetups';
import { imageUrl } from '../../../redux/baseApi/api';

export default function AllMeetups() {
    const { data, isLoading, refetch } = useGetMeetupsQuery(undefined);
    const [deleteMeetups] = useDeleteMeetupsMutation();
    const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);

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
                deleteMeetups(id);
                refetch();
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
                            pagination={{ pageSize: 7 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title="User Name"
                                dataIndex="name"
                                key="name"
                                render={(_, record) => record?.user?.name || 'N/A'}
                            />

                            <Table.Column
                                title="Country Name"
                                dataIndex="location"
                                key="location"
                                render={(countryName) => countryName || 'N/A'}
                            />
                            <Table.Column
                                title="Image"
                                key="image"
                                render={(_, record) => {
                                    return (
                                        <img
                                            src={
                                                record?.user.image.startsWith('http')
                                                    ? record.user.image
                                                    : `${imageUrl}${record.user.image}`
                                            }
                                            alt="user image"
                                            style={{ width: 50, height: 50, borderRadius: '50%' }}
                                        />
                                    );
                                }}
                            />

                            <Table.Column
                                title={<div className="">Details</div>}
                                dataIndex="action"
                                key="action"
                                render={() => (
                                    <div className="ml-3">
                                        <span onClick={() => setDetailsModalOpen(true)}>
                                            <IoEyeOutline size={24} className="" />
                                        </span>
                                    </div>
                                )}
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
            {detailsModalOpen && <DetailsModal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} />}
        </>
    );
}
