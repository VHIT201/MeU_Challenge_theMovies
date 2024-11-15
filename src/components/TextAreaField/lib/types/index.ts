// Core
import { VariantProps } from 'class-variance-authority';

// Internal
import { textAreaFieldVariants } from '../constants';

export interface TextAreaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textAreaFieldVariants> {
    label: string;
    error?: string;
}
