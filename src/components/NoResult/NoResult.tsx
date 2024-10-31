import React from 'react';

const NoResults: React.FC = () => {
    return (
        <div className="flex items-center justify-center text-center h-[50vh]">
            <p className="text-xl md:text-2xl text-white text-opacity-50">No result</p>
        </div>
    );
};

export { NoResults };
