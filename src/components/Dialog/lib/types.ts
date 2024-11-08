import { ComponentProps } from '@/types';
import React from 'react';

export interface DialogProps {
    children: React.ReactNode;
}

export interface DialogContextProps {
    isDisplayContent: boolean;
    setIsDisplayContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DialogContentProps extends ComponentProps {
    children: React.ReactNode;
}
