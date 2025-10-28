import { useGetDisclaimerQuery } from '../../redux/apiSlice/settings/settings';
import Loading from '../shared/Loading';

export default function Policy() {
    const { data, isLoading } = useGetDisclaimerQuery({ query: `?type=privacy` });
    const privacyData = data?.data;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className=" bg-white min-h-screen p-6 text-black">
            <div className="flex items-center justify-center gap-4 font-semibold text-[40px]">
                <h1>Privacy Policy</h1>
            </div>

            <div className="">
                <div className="mt-5 max-w-5xl mx-auto">
                    <article dangerouslySetInnerHTML={{ __html: privacyData?.content }} className="prose prose-slate" />
                </div>
            </div>
        </div>
    );
}
