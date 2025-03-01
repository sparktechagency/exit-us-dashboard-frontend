import Chart from './Chart';
import EventStates from './EventStates';

export default function Dashboard() {
    return (
        <div className=" ">
            <div className="col-span-4">
                <EventStates />
            </div>
            <div className="col-span-8">
                <Chart />
            </div>
        </div>
    );
}
