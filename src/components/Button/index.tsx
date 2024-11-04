// Core
import { FC } from 'react';
import { Link } from 'react-router-dom';

// App
import { cn } from '@/utils';

// Internal
import Spinner from '../Spinner';
import { ButtonProps } from './lib/type';

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
