import React from 'react';
import { ComponentProps } from '@/types';

export interface PopoverProps {
    children: React.ReactNode;
}

export interface PopoverContextProps {
    isDisplayContent: boolean;
    setIsDisplayContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PopoverContentProps extends ComponentProps {
    position: 'top' | 'right' | 'bottom' | 'left';
    children: React.ReactNode;
}
