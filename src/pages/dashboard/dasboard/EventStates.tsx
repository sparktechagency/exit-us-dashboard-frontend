import { FaArrowUp } from 'react-icons/fa6';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { RiCalendarScheduleLine } from 'react-icons/ri';
const data = [
    {
        name: 'Total Country',
        count: '80',
        icon: <IoCalendarClearOutline color="#EF4136" size={28} />,
        textColor: '#FBB040',
    },
    {
        name: 'Total Event',
        count: '120',
        icon: <RiCalendarScheduleLine color="#EF4136" size={28} />,
        bgColor: '#FDF6EC',
    },
    {
        name: 'Total User',
        count: '380',
        icon: <IoCalendarClearOutline color="#EF4136" size={28} />,
        textColor: '#FBB040',
    },
    {
        name: 'Total MeetUp',
        count: '320',
        icon: <RiCalendarScheduleLine color="#EF4136" size={28} />,
        bgColor: '#FDF6EC',
    },
    {
        name: 'Total Exprience',
        count: '200',
        icon: <RiCalendarScheduleLine color="#EF4136" size={28} />,
        bgColor: '#FDF6EC',
    },
];

const EventStates = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {data.map((item, index) => (
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
