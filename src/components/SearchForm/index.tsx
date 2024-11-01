import React, { useRef } from 'react';
import { SearchFormProps } from './lib/Type';
import { useSearchParams } from 'react-router-dom';

const SearchForm: React.FC<SearchFormProps> = ({ initialKeyword = '', onSubmit }) => {
    const [searchParams] = useSearchParams();

    const searchInputRef = useRef<HTMLInputElement>(null);
    const defaultSearchValue = searchParams.get('query') ?? '';

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(searchInputRef.current?.value ?? '');
    };

    return (
        <form
            className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit"
            onSubmit={handleFormSubmit}
        >
            <input
                key={defaultSearchValue}
                ref={searchInputRef}
                type="text"
                placeholder="Enter keyword"
                name="keyword"
                defaultValue={defaultSearchValue}
                className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
            />
            <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">
                Search
            </button>
        </form>
    );
};

export { SearchForm };
