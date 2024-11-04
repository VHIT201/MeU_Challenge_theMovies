import { NumberTwoImage } from '@/assets/images/numbers';
import { Button } from '@/components';

const Banner = () => {
    return (
        <div className="flex">
            <div className="flex flex-col justify-between items-center px-4 pb-2 bg-gradient-to-b from-black via-[#1a1a1a] to-[#262626]">
                <img className="w-full h-48" src={NumberTwoImage} />
                <div className="flex flex-col items-center text-xl text-white font-semibold tracking-normal">
                    <p className="mb-4">9 million views this week</p>
                    <Button type="primary" text="Watch Now" />
                </div>
            </div>
            <div className="flex-1">
                <img
                    className="w-full h-full"
                    src="https://dnm.nflximg.net/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABegDMTScZAAGTWGO8ufcfCpmzXYxqbZHJdVc5M7FmWYaqMdyCYDAIOlxKUxuX2TaM0lmQpfcNoPUP8AVwxNSp_lxq37FlK4QzTBs.jpg?r=bfa"
                />
            </div>
        </div>
    );
};

export { Banner };
