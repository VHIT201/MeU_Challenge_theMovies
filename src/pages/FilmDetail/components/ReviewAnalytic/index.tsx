import React, { useMemo } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ReviewAnalyticProps } from './lib/types';

const ReviewAnalytic: React.FC<ReviewAnalyticProps> = ({ data }) => {
    const analyticData = useMemo(() => {
        const countMap = data.reduce<{ [key: number]: number }>((acc, { rating }) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, {});

        const result = Object.keys(countMap).map((key) => ({
            name: Number(key) + ' Star',
            star: countMap[Number(key)],
        }));

        return result;
    }, [data]);

    return (
        <div className="container px-16 md:px-32">
            <h1 className="mb-8 text-left text-4xl text-white font-semibold">Analytic Review :</h1>
            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={analyticData}>
                        <XAxis dataKey="name" className="text-white" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="star" barSize={50} fill="rgb(229, 9, 20)" />
                        <Line type="monotone" dataKey="star" stroke="#fff" strokeWidth={2} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReviewAnalytic;
