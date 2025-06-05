'use client';

import { ConfigProvider, Spin, Table } from 'antd';
import { useState } from 'react';
import DeleteModal from '../../../modal/DeleteModal';
import { useGetAllDonatesQuery } from '../../../redux/apiSlice/donate/donateApi';

export default function Donate() {
    const { data, isLoading } = useGetAllDonatesQuery(undefined);
    const donateData = data?.data;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',

                fontWeightStrong: 700,
                scrollX,
            },
        },
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
                            dataSource={donateData || []}
                            pagination={{ pageSize: 7 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-8">Sl</div>}
                                key="sl"
                                render={(_, __, index) => <div className="w-[122px] ">{index + 1}</div>}
                            />

                            <Table.Column
                                title={<div className="ml-8">Email</div>}
                                dataIndex="email"
                                key="email"
                                render={(item) => {
                                    return (
                                        <div className="">
                                            <span className="py-1 rounded-xl">{item}</span>
                                        </div>
                                    );
                                }}
                            />

                            <Table.Column
                                title={<div className="ml-8">Amount</div>}
                                dataIndex="amount"
                                key="amount"
                                render={(item) => (
                                    <div className="w-[122px] ">
                                        <span className="py-1 rounded-xl">{item}</span>
                                    </div>
                                )}
                            />

                            <Table.Column
                                title={<div className="ml-8">Date</div>}
                                dataIndex="createdAt"
                                key="createdAt"
                                render={(item) => (
                                    <div className="w-[122px] ">
                                        <span className="py-1 rounded-xl">{new Date(item).toLocaleDateString()}</span>
                                    </div>
                                )}
                            />
                        </Table>
                    </ConfigProvider>
                )}
            </div>

            {/* delete modal */}
            {isDeleteModalOpen && (
                <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
            )}
        </>
    );
}
