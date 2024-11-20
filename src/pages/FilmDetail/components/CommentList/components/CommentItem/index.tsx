import React, { useState, useRef, useEffect } from 'react';
import { CommentItemProps } from './lib/types';
import Config from '@/configuration';
import { StarIcon } from '@/components';

const CommentItem: React.FC<CommentItemProps> = ({ author, authorDetail, content, createdAt }) => {
    const [isClamped, setIsClamped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
            const maxHeight = lineHeight * 4;
            if (contentRef.current.scrollHeight > maxHeight) {
                setIsClamped(true);
            }
        }
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-full flex gap-4 p-3 text-left dark:text-white rounded-2xl bg-[#e6e6e6] dark:bg-[#1a1a1a] shadow-sm transition-all duration-150">
            <div>
                <img
                    className="w-10 h-10 rounded-full"
                    src={`${Config.avatarPath}/${authorDetail.avatarPath}`}
                    alt={`${author}'s avatar`}
                />
            </div>
            <div className="flex-1 space-y-4">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium">{author}</h3>
                        <div className="flex items-center space-x-2">
                            <StarIcon className="text-red-500" width="20px" height="20px" />
                            <p className="dark:text-white font-semibold">{authorDetail.rating}</p>
                        </div>
                    </div>
                    <span className="text-gray-400">{createdAt}</span>
                </div>
                <div
                    ref={contentRef}
                    className={`mt-8 text-md text-wrap overflow-hidden transition-all duration-100 ${
                        isClamped && !isExpanded ? 'line-clamp-4 h-[100px]' : 'w-auto'
                    }`}
                >
                    {content}
                </div>
                {isClamped && (
                    <button onClick={toggleExpand} className="text-blue-500 mt-2">
                        {isExpanded ? 'Collapse' : 'See more'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
