import React from 'react';
import { LoadMoreButtonProps } from './lib/Type';
import { Spinner } from '../Spinner/Spinner';

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, isFetching, hasNextPage }) => {
    return (
        <div className="text-center mt-8">
            {isFetching ? (
                <div className="h-[20vh] flex justify-center items-center flex-row gap-5">
                    <Spinner />
                </div>
            ) : hasNextPage ? (
                <button onClick={onClick} className="btn-sm btn-default">
                    Xem thêm
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export { LoadMoreButton };
