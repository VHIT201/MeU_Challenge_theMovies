import React, { useContext } from 'react';
import { DialogContentProps } from '../lib/types';
import { DialogContext } from '..';
import { CloseIcon } from '@/components/Icon';
import { cn } from '@/utils';

const DialogContent: React.FC<DialogContentProps> = ({ className, children }) => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('PopoverContent must be used within a Popover');
    }

    const { setIsDisplayContent } = context;

    return (
        <div className={cn('px-2 py-1', className)}>
            <div className="flex flex-row-reverse py-2">
                <CloseIcon onClick={() => setIsDisplayContent(false)} />
            </div>
            <div>{children}</div>
        </div>
    );
};

export default DialogContent;
