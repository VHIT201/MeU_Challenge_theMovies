import { ComponentProps } from "@/types";

export interface ButtonProps extends ComponentProps {
    text?: string;
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    ghost?: boolean;
    loading?: boolean;
    to?: string;
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}