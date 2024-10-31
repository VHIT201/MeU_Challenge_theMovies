import React from 'react';
import { StackWeekend } from './StackWeekend';

const RankingBoard = () => {
    return (
        <div
            className="p-8 mx-auto rounded-lg bg-white bg-opacity-5"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
        >
            <table className="w-full text-white">
                <thead>
                    <tr className="text-xl font-semibold">
                        <th className="text-lg text-gray-500">#</th>
                        <th>Films</th>
                        <th>WEEKS IN TOP 10</th>
                        <th>HOURS VIEWED</th>
                        <th>VIEWS</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }, (_, index) => (
                        <tr key={index} className="text-lg font-medium">
                            <td className="text-gray-500">{index + 1}</td>
                            <td>Incoming</td>
                            <td className="flex justify-center">
                                <StackWeekend stackNumber={1} />
                            </td>
                            <td>25,600,000</td>
                            <td className="text-xl font-bold">16,900,000</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { RankingBoard };
