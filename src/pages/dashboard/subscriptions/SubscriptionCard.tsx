import { IoIosCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import SubscribeModal from './SubscribeModal';
// import SubscribeEditModal from '../../../modal/SubscribeEditModal';

const items = [
    {
        id: 1,
        content: [
            'It is a long established fact that a reader will be distracted by the readable content.',
            'It is a long established fact that a reader will be distracted by the readable content.',
            'It is a long established fact that a reader will be distracted by the readable content.',
        ],
    },
    {
        id: 2,
        content: [
            'It is a long established fact that a reader will be distracted by the readable content.',
            'It is a long established fact that a reader will be distracted by the readable content.',
            'It is a long established fact that a reader will be distracted by the readable content.',
        ],
    },
];

export default function SubscriptionCard() {
    const [edit, setEdit] = useState<number | null>(null);

    return (
        <>
            <h1 className="text-[#B8B8B8E5] mb-5 text-xl">Premium Plan</h1>
            <div className="flex space-x-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#212526] rounded-lg shadow-lg px-5 pt-4 w-80 border border-[#FFB953] p-3"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-center bg-gradient-to-r from-[#FEFED6] to-[#FCAC43] bg-clip-text text-transparent">
                                Get Standard Package
                            </h2>
                            <button onClick={() => setEdit(1)}>
                                <FiEdit size={22} />
                            </button>
                        </div>
                        <div className="text-center mt-8">
                            <span className="text-2xl font-medium text-[#FEFEFE]">100 AED</span>
                            <p className="text-sm text-gray-400">/ Per Month</p>
                        </div>
                        <div className="mt-6 space-y-3 text-[#B8B8B8]">
                            {item.content.map((contentItem, index) => (
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
