import React, { createContext, useState } from 'react';
import { PopoverProps, PopoverContextProps } from './lib/types';
import PopoverContent from './PopoverContent';

export const PopoverContext = createContext<PopoverContextProps | undefined>(undefined);

const Popover: React.FC<PopoverProps> = ({ children }) => {
    const [isDisplayContent, setIsDisplayContent] = useState(false);

    let triggerElement = null;
    let contentElement = null;

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type && child.type.name === 'PopoverContent') {
                contentElement = child;
            } else {
                triggerElement = child;
            }
        }
    });

    return (
        <PopoverContext.Provider
            value={{
                isDisplayContent,
                setIsDisplayContent,
            }}
        >
            <div className="relative">
                <div onClick={() => setIsDisplayContent((prev) => !prev)}>{triggerElement}</div>
                {isDisplayContent && contentElement}
            </div>
        </PopoverContext.Provider>
    );
};

export { PopoverContent };
export default Popover;
