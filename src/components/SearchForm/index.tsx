import React, { useState, useEffect } from 'react';
import { SearchFormProps } from './lib/Type';

const SearchForm: React.FC<SearchFormProps> = ({ initialKeyword = '', onSubmit }) => {
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  return (
    <form
      className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        placeholder="Enter keyword"
        name="keyword"
        value={keyword}
        onChange={handleInputChange}
        className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
      />
      <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
