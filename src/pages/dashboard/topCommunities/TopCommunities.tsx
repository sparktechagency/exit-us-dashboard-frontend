'use client';

import { ConfigProvider, Spin, Table } from 'antd';

import { useState } from 'react';
import DeleteModal from '../../../modal/DeleteModal';
import useData from '../../../hooks/useData';
import { IoEyeOutline } from 'react-icons/io5';

export default function TopCommunities() {
    const { data, loading } = useData('/data/topCommunities.json');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',
                headerColor: '#FF991C',
                fontWeightStrong: 600,
                scrollX,
            },
        },
    };

    return (
        <>
            {/* Table */}
            <div className="rounded-lg mx-auto overflow-x-auto">
                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spin size="large" />
                        <p className="ml-3 text-lg">Loading Orders...</p>
                    </div>
                ) : (
                    <ConfigProvider theme={tableTheme}>
                        <Table
                            bordered={false}
                            dataSource={data}
                            pagination={{ pageSize: 7 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title="User Name"
                                dataIndex="userName"
                                key="userName"
                                render={(userName) => userName || 'N/A'}
                            />

                            <Table.Column
                                title="Country Name"
                                dataIndex="countryName"
                                key="countryName"
                                render={(countryName) => countryName || 'N/A'}
                            />
                            <Table.Column
                                title="Image"
                                dataIndex="image"
                                key="image"
                                render={(image: string) => (
                                    <img
                                        src={image}
                                        alt="user image"
                                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                                    />
                                )}
                            />

                            <Table.Column
                                title={<div className="">Details</div>}
                                dataIndex="action"
                                key="action"
                                render={() => (
                                    <div className="">
                                        <span onClick={() => setIsDeleteModalOpen(true)}>
                                            <IoEyeOutline size={24} className="" />
                                        </span>
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
