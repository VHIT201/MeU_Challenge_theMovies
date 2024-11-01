import React, { FC } from 'react';
import { StackWeekend } from './StackWeekend';
import { FilmType } from '@/types';
import { MediaType } from '@/services/media/lib/type';

interface RankingBoardProps {
    filmList: Array<FilmType>;
    mediaType: MediaType;
}

const RankingBoard: FC<RankingBoardProps> = ({ filmList, mediaType }) => {
    return (
        <div
            className="p-8 mx-auto rounded-lg bg-gradient-to-bl from-[#0d0d0d] via-[#333333] to-[#0d0d0d]"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
        >
            <table className="w-full text-white">
                <thead>
                    <tr className="text-xl font-semibold">
                        <th className="text-lg text-gray-500">#</th>
                        <th>FILM</th>
                        <th>SCORE AVERAGE</th>
                        <th>VOTE COUNT</th>
                        <th>POPULARITY</th>
                    </tr>
                </thead>
                <tbody>
                    {filmList.slice(0, 10).map((film, index) => (
                        <tr key={film.id} className="text-lg font-medium">
                            <td className="text-gray-500">{index + 1}</td>
                            <td>{mediaType === 'movie' ? film.title : film.name}</td>
                            <td className="flex justify-center">
                                <StackWeekend stackNumber={film.vote_average ?? 0} />
                            </td>
                            <td>{film.vote_count}</td>
                            <td className="text-xl font-bold">{film.popularity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { RankingBoard };
