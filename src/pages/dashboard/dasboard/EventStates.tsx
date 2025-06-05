import { FaArrowUp } from 'react-icons/fa6';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { RiCalendarScheduleLine } from 'react-icons/ri';

interface EventStatesProps {
    data: {
        data?: any;
    };
}

const EventStates = ({ data }: EventStatesProps) => {
    const cardData = data?.data?.data;

    const items = [
        {
            name: 'Total Event',
            count: cardData?.totalEvents || 0,
            icon: <IoCalendarClearOutline color="#EF4136" size={28} />,
            textColor: '#FBB040',
        },
        {
            name: 'Total Meetup',
            count: cardData?.totalMeetups || 0,
            icon: <RiCalendarScheduleLine color="#EF4136" size={28} />,
            bgColor: '#FDF6EC',
        },
        {
            name: 'Total User',
            count: cardData?.totalUsers || 0,
            icon: <IoCalendarClearOutline color="#EF4136" size={28} />,
            textColor: '#FBB040',
        },
        {
            name: 'Total Donation',
            count: cardData?.totalDonations || 0,
            icon: <RiCalendarScheduleLine color="#EF4136" size={28} />,
            bgColor: '#FDF6EC',
        },
    ];

    return (
        <div>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                {items.map((item, index) => (
                    <div key={index} className="bg-[#181c1d] rounded-md p-4  w-full shadow-sm border border-[#ffbc58]">
                        <div className="flex items-center gap-3 ">
                            <div
                                className={`bg-[#dac7ad] w-[54px] h-[54px] rounded-full flex items-center justify-center`}
                            >
                                {item?.icon}
                            </div>
                            <div className=" flex flex-col gap-1 ">
                                <p className="text-[20px]  font-medium">{item.name}</p>

                                <p className="text-2xl font-bold ">{item.count}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center justify-end pt-1">
                            <div className={`bg-[#e6b47b] w-5 h-5 rounded-full flex items-center justify-center`}>
                                <FaArrowUp size={12} className="font-bold text-black" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventStates;
