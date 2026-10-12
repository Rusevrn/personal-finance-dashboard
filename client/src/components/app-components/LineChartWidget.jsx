import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import DashWidget from './widgets/DashWidget';

const LineChartWidget = ({ size }) => {

    const data = [
        { month: 'Jan', before: 1440, after: 840 },
        { month: 'Feb', before: 1360, after: 780 },
        { month: 'Mar', before: 1520, after: 820 },
        { month: 'Apr', before: 1400, after: 700 },
        { month: 'May', before: 1280, after: 640 },
    ];

    return (
        <DashWidget size={size} type='spending'>
            <div className="h-full w-full">
                <LineChart data={data} style={{ width: '100%', height: '100%' }}>
                    <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" />

                    <XAxis dataKey="month" />
                    <YAxis yAxisId="before" tickFormatter={(value) => `€${value}`} />

                    <Line
                        yAxisId="before"
                        type="monotone"
                        dataKey="before"
                        name="Before ZZAP"
                        stroke="#9ca3af"
                    />

                    <Line
                        yAxisId="before"
                        type="monotone"
                        dataKey="after"
                        name="After ZZAP"
                        stroke="#8b5cf6"
                    />

                    <Tooltip contentStyle={{
                        backgroundColor: '#1f2028',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                    }} />

                    <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af', }} />
                </LineChart>
            </div>
        </DashWidget>
    );
};

export default LineChartWidget;