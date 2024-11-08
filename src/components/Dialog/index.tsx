import React, { createContext, useState } from 'react';
import { DialogContextProps, DialogProps } from './lib/types';
import DialogContent from './DialogContent';

export const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const Dialog: React.FC<DialogProps> = ({ children }) => {
    const [isDisplayContent, setIsDisplayContent] = useState(false);

    let triggerElement = null;
    let contentElement = null;

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type && child.type.name === 'DialogContent') {
                contentElement = child;
            } else {
                triggerElement = child;
            }
        }
    });

    return (
        <DialogContext.Provider value={{ isDisplayContent, setIsDisplayContent }}>
            <div onClick={() => setIsDisplayContent(true)}>{triggerElement}</div>
            {isDisplayContent && (
                <div className="fixed bg-black/50 z-20" style={{ height: '100vh', width: '100vw' }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{contentElement}</div>
                </div>
            )}
        </DialogContext.Provider>
    );
};

export { DialogContent };
export default Dialog;
