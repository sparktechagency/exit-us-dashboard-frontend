import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoCheckmarkOutline, IoClose } from 'react-icons/io5';
import AddOfferModal from './OfferModal';
import Modal from '../../../modal/Modal';

const packageOptions = ['Premium Plan', 'Standard Plan'];

interface SubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: number | null;
}

export default function SubscribeModal({ data, isOpen, onClose }: SubscribeModalProps) {
    const [offer, setOffer] = useState('');
    console.log(offer);
    const [packageName, setPackageName] = useState('');
    const [price, setPrice] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [offers, setOffers] = useState([
        '120 day permission to use',
        'Free training tutorial',
        'Free journal',
        'Free consultations',
        '20 Community post',
    ]);

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
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log({ packageName, price, offers });
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
                                value={packageName}
                                onChange={(e) => setPackageName(e.target.value)}
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
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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
                                {offers.map((offer, i) => (
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
