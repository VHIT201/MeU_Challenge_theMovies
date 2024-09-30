import React from 'react';
import FilmItem from '../../components/FilmItem';
import useTVSeriesContainer from './TVSeriesContainer';

const TVSeriesMainView: React.FC = () => {
  const {
    tvSeries, 
    loading,
    keyword,
    setKeyword,
    handleLoadMore,
    hasNextPage,
    handleSearch,
    resetSearch,
  } = useTVSeriesContainer();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value.trim() === "") {
      resetSearch(); // Nếu từ khóa trống, hiển thị TV series phổ biến
    }
  };

  return (
    <main className='w-full flex flex-col items-center justify-start'>
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">TV Series</span>
      </div>
      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className='max-w-screen-2xl mx-auto'>
          {/* Form tìm kiếm */}
          <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Enter keyword" 
              value={keyword}
              onChange={handleKeywordChange}
              className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:w-96"
            />
            <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">Search</button>
          </form>

          {/* Kiểm tra kết quả tìm kiếm */}
          {tvSeries.length === 0 && !loading ? (
            <div className="flex items-center justify-center text-center text-white h-[50vh] ">
              <p className="text-xl md:text-2xl">No TV series found.</p>
            </div>
          ) : (
            <>
              {/* Danh sách TV series */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                {tvSeries.map((tv) => (
                  <FilmItem
                    key={tv.id}
                    id={tv.id}
                    original_title={tv.original_title}
                    original_name={tv.original_name}
                    name={tv.name}
                    media_type={tv.media_type}
                    poster_path={tv.poster_path}
                    className="w-full"
                  />
                ))}
              </div>

              {/* Nút tải thêm */}
              <div className="text-center mt-8">
                {loading ? (
                  <div className="h-[50vh] flex justify-center items-center">
                    <p>Loading data...</p>
                  </div>
                ) : !hasNextPage ? (
                  <p className="text-white text-opacity-50 text-xl md:text-2xl my-10">
                    No more TV series to load.
                  </p>
                ) : (
                  <button onClick={handleLoadMore} className="btn-sm btn-default">
                    Watch more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TVSeriesMainView;
