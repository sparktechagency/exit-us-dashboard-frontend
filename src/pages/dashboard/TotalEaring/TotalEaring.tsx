import { ConfigProvider, Spin, Table } from 'antd';

import { RiDeleteBin5Line } from 'react-icons/ri';

import { useState } from 'react';
import DeleteModal from '../../../modal/DeleteModal';
import useData from '../../../hooks/useData';
import Button from '../../../components/shared/Button';

export default function UpcommingReservation() {
    const { data, loading } = useData('/data/totalEaring.json');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const tableTheme = {
        components: {
            Table: {
                borderColor: '#E7E7E7',
                headerColor: '#1E1E1E',
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
                            pagination={{ pageSize: 10 }}
                            className="cursor-pointer"
                        >
                            {/* Define columns here */}

                            <Table.Column
                                title={<div className="ml-6">BookedId</div>}
                                dataIndex="bookedId"
                                key="bookedId"
                                render={(bookedId) => <p className="ml-7">{bookedId}</p>}
                            />
                            <Table.Column title="Booked Date" dataIndex="bookedDate" key="bookedDate" />
                            <Table.Column
                                title="User Name"
                                dataIndex="userName"
                                key="userName"
                                render={(userName) => userName || 'N/A'}
                            />
                            <Table.Column
                                title="Car Model"
                                dataIndex="carModel"
                                key="carModel"
                                render={(carModel) => carModel || 'N/A'}
                            />
                            <Table.Column title="Plan" dataIndex="plan" key="plan" />
                            <Table.Column
                                title="Start Date"
                                dataIndex="startDate"
                                key="startDate"
                                render={(startDate) =>
                                    startDate ? (
                                        <span className="bg-[#8FD3FF] border border-stoke rounded-md p-1">
                                            {startDate}
                                        </span>
                                    ) : (
                                        'No'
                                    )
                                }
                            />

                            <Table.Column
                                title="End Date"
                                dataIndex="endDate"
                                key="endDate"
                                render={(endDate) =>
                                    endDate ? (
                                        <span className="bg-[#8FD3FF] border border-stoke rounded-md p-1">
                                            {endDate}
                                        </span>
                                    ) : (
                                        'No'
                                    )
                                }
                            />
                            <Table.Column
                                title={<div className="mr-16">Due Day</div>}
                                dataIndex="dueDay"
                                key="dueDay"
                                align="center"
                                render={(dueDay) => (
                                    <div className="w-[122px]">
                                        <span className="text-[12px]">{dueDay}</span>
                                    </div>
                                )}
                            />
                            <Table.Column
                                title={<div className="mr-14">Payment</div>}
                                dataIndex="payment"
                                key="payment"
                                align="center"
                                render={(payment) => (
                                    <div className="w-[122px] font-semibold flex items-center gap-1">
                                        <span className="text-[12px]">{payment}</span>
                                        <span className="bg-[#00369A] text-white text-[14px] rounded-sm px-2 py-1">
                                            Paid
                                        </span>
                                    </div>
                                )}
                            />
                            <Table.Column
                                title={<div className="mr-12">Status</div>}
                                dataIndex="status"
                                key="status"
                                align="center"
                                render={(status) => (
                                    <div className="w-[122px]">
                                        <Button className="py-1 rounded-xl">{status}</Button>
                                    </div>
                                )}
                            />
                            <Table.Column
                                title={<div className="mr-10">Action</div>}
                                dataIndex="action"
                                key="action"
                                align="center"
                                render={() => (
                                    <div className="w-full lg:w-[80%]">
                                        <div className="flex lg:flex-row flex-col items-center justify-center gap-2 lg:gap-5 py-2 rounded-md   px-2 lg:px-0">
                                            <span
                                                className={`text-nowrap font-semibold  py-1 px-2 rounded-md border border-black`}
                                                onClick={() => setIsDeleteModalOpen(true)}
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
            {isDeleteModalOpen && (
                <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
            )}
        </>
    );
}
