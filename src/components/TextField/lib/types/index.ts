// Core
import { VariantProps } from 'class-variance-authority';

// Internal
import { textFieldVariants } from '../constants';

export interface TextFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof textFieldVariants> {
    label: string;
    error?: string;
}
