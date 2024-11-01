import React, { FC } from 'react';

interface StackWeekendProps {
    stackNumber: number;
}

const StackWeekend: FC<StackWeekendProps> = ({ stackNumber }) => {
    const stacks = Array.from({ length: stackNumber }, (_, index) => index + 1);
    return (
        <div className="flex items-center space-x-4">
            <p>{Math.floor(stackNumber * 10) / 10}</p>
            <div className="flex space-x-[1px]">
                {stacks.map((stack) => (
                    <div
                        key={'stack' + stack}
                        className="w-[4px] h-4 [transform:_matrix(1_,0_,-0.105104_,1_,0_,0)] bg-red-main"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export { StackWeekend };
