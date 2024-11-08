import React, { useContext } from 'react';
import { PopoverContentProps } from '../lib/types';
import { cn } from '@/utils';
import { PopoverContext } from '..';

const PopoverContent: React.FC<PopoverContentProps> = ({ position, className, children }) => {
    const context = useContext(PopoverContext);

    if (!context) {
        throw new Error('PopoverContent must be used within a Popover');
    }

    const { setIsDisplayContent } = context;

    return (
        <div
            // onClick={() => setIsDisplayContent(false)}
            className={cn(
                'absolute z-10',
                {
                    'bottom-[calc(110%)] left-0': position === 'top',
                    'top-0 right-0': position === 'right',
                    'top-[calc(110%)] right-0': position === 'bottom',
                    'top-0 left-0': position === 'left',
                },
                className,
            )}
        >
            {children}
        </div>
    );
};

export default PopoverContent;
