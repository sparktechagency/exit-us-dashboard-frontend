import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoCheckmarkOutline, IoClose } from 'react-icons/io5';
import AddOfferModal from './OfferModal';
import Modal from '../../../modal/Modal';
import {
    useCreateSubscriptionMutation,
    useEditSubscriptionMutation,
} from '../../../redux/apiSlice/subcriptions/subscriptions';
import toast from 'react-hot-toast';

const packageOptions = ['Premium Plan', 'Standard Plan'];
const types = ['monthly', 'yearly'];

interface SubscribeData {
    _id: string;
    name: string;
    price: number;
    features: string[];
    recurring?: string;
    paymentId?: string;
    referenceId?: string;
    // add more fields as needed
}

interface SubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: SubscribeData;
}

export default function SubscribeModal({ data, isOpen, onClose }: SubscribeModalProps) {
    const [createSubscription] = useCreateSubscriptionMutation();
    const [editSubscription] = useEditSubscriptionMutation();

    const [offer, setOffer] = useState('');
    const [packageName, setPackageName] = useState({
        title: data?.name || '',
        type: data?.recurring || '',
    });
    const [openModal, setOpenModal] = useState(false);
    const [offers, setOffers] = useState(Array.isArray(data?.features) ? [...data.features] : []);
    const [allCategories, setAllCategories] = useState({
        price: data?.price || '',
        paymentId: data?.paymentId || '',
        referenceId: data?.referenceId || '',
    });

    // Update offer text by index
    const updateOffer = (index: number, value: string) => {
        const newOffers = [...offers];
        newOffers[index] = value;
        setOffers(newOffers);
    };

    // Remove offer by index
    const removeOffer = (index: number) => {
        setOffers(offers.filter((_, i) => i !== index));
    };

    const handleAddOffer = (newOffer: string) => {
        setOffers((prev) => [...prev, newOffer]);
    };

    // Submit handler (you can customize)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (data?._id) {
                const response = await editSubscription({
                    id: data._id,
                    data: { name: packageName.title, price: Number(allCategories.price), features: offers },
                }).unwrap();

                if (response.success) {
                    toast.success('Subscription updated successfully!');
                    onClose();
                } else {
                    toast.error('Failed to update subscription.');
                }
            } else {
                const response = await createSubscription({
                    name: packageName.title,
                    price: Number(allCategories.price),
                    features: offers,
                    paymentId: allCategories.paymentId,
                    referenceId: allCategories.referenceId,
                    recurring: packageName.type,
                }).unwrap();

                if (response.success) {
                    toast.success('Subscription created successfully!');
                    onClose();
                } else {
                    toast.error('Failed to create subscription.');
                }
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="bg-[#212526] text-white rounded-lg w-[500px] p-6 relative">
                    <div>
                        <button
                            onClick={onClose}
                            className="absolute  right-4 text-gray-400 hover:text-white text-xl font-bold"
                            aria-label="Close modal"
                        >
                            <IoClose size={32} />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6">{data ? 'Edit Modal' : 'Add Subscribe'}</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Package Name Select */}
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="packageName">
                                Package Name
                            </label>
                            <select
                                id="packageName"
                                value={packageName.title}
                                onChange={(e) => setPackageName((prev) => ({ ...prev, title: e.target.value }))}
                                className="w-full bg-[#212526]  border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Package Name
                                </option>
                                {packageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Input */}
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="price">
                                Price
                            </label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                value={allCategories.price}
                                onChange={(e) => setAllCategories((prev) => ({ ...prev, price: e.target.value }))}
                                className="w-full bg-[#212526]  border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="monthly">
                                Recurring
                            </label>
                            <select
                                id="monthly"
                                value={packageName.type}
                                onChange={(e) => setPackageName((prev) => ({ ...prev, type: e.target.value }))}
                                className="w-full bg-[#212526]  border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Package Type
                                </option>
                                {types.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="paymentId">
                                payment ID
                            </label>
                            <input
                                id="paymentId"
                                type="text"
                                placeholder="Enter paymentId"
                                value={allCategories.paymentId}
                                onChange={(e) => setAllCategories((prev) => ({ ...prev, paymentId: e.target.value }))}
                                className="w-full bg-[#212526]  border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="referenceId">
                                Reference ID
                            </label>
                            <input
                                id="referenceId"
                                type="text"
                                placeholder="Enter referenceId"
                                value={allCategories.referenceId}
                                onChange={(e) => setAllCategories((prev) => ({ ...prev, referenceId: e.target.value }))}
                                className="w-full bg-[#212526]  border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        {/* Package Offers */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block  text-sm font-medium">Package Offers</label>
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    className="mt-2 border rounded-full  font-bold text-xl  flex items-center"
                                    aria-label="Add offer"
                                >
                                    <BiPlus size={22} />
                                </button>
                            </div>
                            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-700 rounded-md">
                                {offers?.map((offer, i) => (
                                    <div key={i} className="flex items-center justify-between  rounded-md py-1 px-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-500">
                                                <IoCheckmarkOutline />
                                            </span>
                                            <input
                                                type="text"
                                                value={offer}
                                                onChange={(e) => updateOffer(i, e.target.value)}
                                                className="bg-transparent border-none text-white focus:outline-none w-full"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeOffer(i)}
                                            className="text-gray-400 hover:text-red-500 font-bold text-xl"
                                            aria-label={`Remove offer ${offer}`}
                                        >
                                            <BiMinus />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 rounded-md py-2 font-semibold transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>

            {/* offer modal */}
            {openModal && (
                <AddOfferModal
                    offer={offer}
                    setOffer={setOffer}
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    onAddOffer={handleAddOffer}
                />
            )}
        </>
    );
}
