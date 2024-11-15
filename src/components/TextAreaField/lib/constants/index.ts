import { cva } from 'class-variance-authority';

// Constant
export const textAreaFieldVariants = cva('h-[200px]', {
    variants: {
        variant: {
            outline: '',
            standard: 'border-b-[1px]',
        },
        sizeInput: {
            sm: 'min-h-10 px-3 py-2 text-lg',
        },
    },

    defaultVariants: {
        variant: 'outline',
        sizeInput: 'sm',
    },
});
