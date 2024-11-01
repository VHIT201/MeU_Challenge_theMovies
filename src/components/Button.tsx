// Core
import { FC } from 'react';
import { Link } from 'react-router-dom';

// App
import { ComponentProps } from '../types';
import { cn } from '@/utils';
import { Spinner } from './Spinner/Spinner';

// Type
interface ButtonProps extends ComponentProps {
    text?: string;
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    ghost?: boolean;
    loading?: boolean;
    to?: string;
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Component
export const Button: FC<ButtonProps> = ({
    text,
    size = 'md',
    type = 'default',
    icon,
    ghost = false,
    loading = false,
    to,
    onClick,
    className,
}) => {
    // Templates
    if (to) {
        return (
            <Link
                className={cn(
                    'flex justify-center items-center',
                    'rounded-full',
                    'transition-all duration-300',
                    'ease-in-out',
                    {
                        'btn-lg px-5 py-2': size === 'lg',
                        'btn-md px-4 py-1': size === 'md',
                        'btn-sm px-3 py-1': size === 'sm',
                        'btn-ghost': ghost,
                        'btn-primary': type === 'primary',
                    },
                    className,
                )}
                to={to}
                replace
            >
                {icon}
                {text}
            </Link>
        );
    }

    return (
        <button
            className={cn(
                'flex justify-center items-center',
                'rounded-full',
                'transition-all duration-300',
                'ease-in-out',
                {
                    'btn-lg px-5 py-2': size === 'lg',
                    'btn-md px-4 py-1': size === 'md',
                    'btn-sm px-3 py-1': size === 'sm',
                    'btn-ghost': ghost,
                    'btn-primary': type === 'primary',
                    'bg-white text-[#FF0000]': loading,
                },
                className,
            )}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? <Spinner /> : icon}
            {loading ? 'Loading . . .' : text}
        </button>
    );
};

export default Button;
