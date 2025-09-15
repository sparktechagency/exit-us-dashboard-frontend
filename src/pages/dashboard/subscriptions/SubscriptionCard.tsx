import { IoIosCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import SubscribeModal from './SubscribeModal';
import {
    useDeleteSubscriptionMutation,
    useGetAllSubscriptionQuery,
} from '../../../redux/apiSlice/subcriptions/subscriptions';
import { RiDeleteBinLine } from 'react-icons/ri';
import Swal from 'sweetalert2';

interface SubscribeData {
    _id: string;
    name: string;
    price: number;
    features: string[];
}

export default function SubscriptionCard() {
    const { data } = useGetAllSubscriptionQuery(undefined);
    const [deleteSubscription] = useDeleteSubscriptionMutation();
    const getData = data?.data;
    const [edit, setEdit] = useState<SubscribeData | null>(null);

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
                deleteSubscription(id);

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
            {/* <h1 className="text-[#B8B8B8E5] mb-5 text-xl">Premium Plan</h1> */}
            <div className="grid grid-cols-4 gap-6">
                {getData?.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-[#212526] rounded-lg shadow-lg px-5 pt-4 w-80 border border-[#FFB953] p-3"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-center bg-gradient-to-r from-[#FEFED6] to-[#FCAC43] bg-clip-text text-transparent">
                                {item?.name}
                            </h2>
                            <button onClick={() => setEdit(item)}>
                                <FiEdit size={22} />
                            </button>
                            <button onClick={() => handleDelete(item?._id)}>
                                <RiDeleteBinLine className="text-red-500" size={22} />
                            </button>
                        </div>
                        <div className="text-center mt-8">
                            <span className="text-2xl font-medium text-[#FEFEFE]">{item?.price} USD</span>
                            <p className="text-sm text-gray-400">/ Per {item?.recurring}</p>
                        </div>
                        <div className="mt-6 space-y-3 text-[#B8B8B8]">
                            {item?.features.map((contentItem: any, index: number) => (
                                <div key={index} className="flex items-center">
                                    <span className="bg-green-500 h-4 w-4 mr-2 rounded-full">
                                        <IoIosCheckmark className="text-black" />
                                    </span>
                                    <p className="text-sm">{contentItem}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* modal show */}
            {edit && <SubscribeModal data={edit} isOpen={!!edit} onClose={() => setEdit(null)} />}
        </>
    );
}
