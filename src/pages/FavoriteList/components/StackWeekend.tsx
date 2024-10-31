import React, { FC } from 'react';

interface StackWeekendProps {
    stackNumber: number;
}

const StackWeekend: FC<StackWeekendProps> = ({ stackNumber }) => {
    return (
        <div className="flex items-center space-x-2">
            <p>{stackNumber}</p>
            <div className="flex space-x-[1px]">
                <div className="w-[4px] h-4 [transform:_matrix(1_,0_,-0.105104_,1_,0_,0)] bg-red-main"></div>
                <div className="w-[4px] h-4 [transform:_matrix(1_,0_,-0.105104_,1_,0_,0)] bg-red-main"></div>
            </div>
        </div>
    );
};

export { StackWeekend };
