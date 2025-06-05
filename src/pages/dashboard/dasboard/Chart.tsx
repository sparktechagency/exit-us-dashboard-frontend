import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const { Option } = Select;

type ChartProps = {
    data?: {
        data?: {
            userStatics?: { month: string; total: number }[];
        };
    };
};

export default function Chart({ data }: ChartProps) {
    const chartData = data?.data?.userStatics;

    const chart = chartData?.map((item: { month: string; total: number }) => ({
        name: item?.month,
        user: item?.total,
    }));

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
            className="p-4"
        >
            <div className=" flex items-center justify-between">
                <h1 className="text-2xl font-medium">Users Statics</h1>
                <Select defaultValue="2024" className="w-32 h-[40px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={290}>
                <LineChart data={chart} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="user"
                        stroke="#EF4136"
                        strokeWidth={2}
                        dot={{ fill: '#FBB040', stroke: '#FBB040', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
