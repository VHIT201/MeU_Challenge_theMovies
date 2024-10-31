import { numberImages } from '@/assets/images/numbers';
import { Button } from '@/components';
import Config from '@/configuration';
import { FC } from 'react';

interface RankingBannerProps {
    rank: number;
    title: string;
    backDrop: string;
}

const RankingBanner: FC<RankingBannerProps> = ({ rank, title, backDrop }) => {
    return (
        <div className="flex h-[400px]">
            <div className="flex flex-col justify-between items-center px-6 pb-2 bg-gradient-to-b from-black via-[#1a1a1a] to-[#262626]">
                <img className="w-full h-48" src={numberImages[rank]} />
                <div className="flex flex-col items-center mb-4 text-xl text-white font-semibold tracking-normal">
                    <p className="mb-4">9 million views this week</p>
                    <Button type="primary" text="Watch Now" />
                </div>
            </div>
            <div
                className="flex-1 flex flex-col-reverse items-center bg-center bg-no-repeat bg-cover object-cover"
                style={{ backgroundImage: `url(${Config.backDropPath}${backDrop})` }}
            >
                <h1 className="py-4 text-4xl text-white [text-shadow:_0_4px_8px_#ff0000] font-semibold">{title}</h1>
            </div>
        </div>
    );
};

export { RankingBanner };
