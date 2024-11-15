import React, { useEffect, useState } from 'react';

// App
import { cn } from '@/utils';
import { TextAreaFieldProps } from './lib/types';
import { textAreaFieldVariants } from './lib/constants';

// Component
const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
    ({ label, error, variant, sizeInput, className, ...field }, ref) => {
        const [textFieldValue, setTextFieldValue] = useState('');
        const [isFocused, setIsFocused] = useState(false);

        const handleChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextFieldValue(event.target.value);

            if (field.onChange) {
                field.onChange(event);
            }
        };

        const handleFocused = () => {
            setIsFocused(true);
        };

        const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
            if (textFieldValue === '') setIsFocused(false);
            if (field.onBlur) {
                field.onBlur(event);
            }
        };

        useEffect(() => {
            if (textFieldValue) setIsFocused(true);
        }, [textFieldValue]);

        // Template
        return (
            <div>
                <div className={cn(textAreaFieldVariants({ sizeInput, className }), 'box-content relative')}>
                    <label
                        className={cn(
                            'absolute top-1/2 font-normal transition-all duration-300 z-10',
                            isFocused
                                ? 'text-blue-400 translate-x-[5px] -translate-y-[40px]'
                                : 'translate-x-[5px] -translate-y-1/2',
                            error && 'text-red-500',
                        )}
                    >
                        {label}
                    </label>
                    <div className="absolute inset-0">
                        <textarea
                            {...field}
                            ref={ref}
                            className="w-full h-full px-4 border-none outline-none"
                            value={textFieldValue}
                            onChange={handleChanged}
                            onFocus={handleFocused}
                            onBlur={handleBlur}
                            rows={10}
                        />
                        <fieldset
                            className={cn(
                                'absolute inset-0 px-2 rounded-md pointer-events-none',
                                isFocused ? 'border-blue-500 border' : 'border border-gray-400',
                                variant === 'standard' && textAreaFieldVariants({ variant }),
                                error && 'border-red-500 border',
                            )}
                        >
                            <legend className={cn('text-lg h-2 invisible', isFocused ? 'px-2' : 'w-0')}>{label}</legend>
                        </fieldset>
                    </div>
                </div>
                {error && <p className="my-2 px-2 text-md text-red-main">{error}</p>}
            </div>
        );
    },
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
