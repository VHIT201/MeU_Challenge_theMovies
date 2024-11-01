// Core
import React, { ReactNode } from 'react';

// App
import { cn } from '@/utils';
import { ComponentProps } from '@/types';

// Type
interface DrawerProps extends ComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

// Component
const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, className, children }) => {
    // Template
    return (
        <div
            className={`fixed inset-0 z-50 transition-transform transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-gray-800 bg-opacity-50`}
            onClick={onClose}
        >
            <div
                className={cn(
                    className,
                    'absolute right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform',
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500">
                        ✖
                    </button>
                </div>
                <div className="overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export { Drawer };
