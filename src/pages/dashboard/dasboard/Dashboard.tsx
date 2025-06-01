import Loading from '../../../components/shared/Loading';
import { useGetDashboardQuery } from '../../../redux/apiSlice/dashboard/dashboard';
import Chart from './Chart';
import EventStates from './EventStates';

export default function Dashboard() {
    const { data, isLoading } = useGetDashboardQuery(undefined);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className=" ">
            <div className="col-span-4">
                <EventStates data={data} />
            </div>
            <div className="col-span-8">
                <Chart data={data} />
            </div>
        </div>
    );
}
