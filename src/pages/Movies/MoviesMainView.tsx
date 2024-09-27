// MoviesMainView.tsx
import React from 'react';
import FilmItem from '../../components/FilmItem';
import useMovieContainer from './MoviesContainer';

export const MoviesMainView: React.FC = () => {
  const {
    movies, // Thay đổi từ listPopularFilm thành movies để phù hợp với logic mới
    loading,
    keyword,
    setKeyword,
    handleLoadMore,
    handleSearch,
  } = useMovieContainer();

  return (
    <main className='w-full flex flex-col items-center justify-start'>
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Movies</span>
      </div>
      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className='max-w-screen-2xl mx-auto'>
          {/* Form tìm kiếm */}
          <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Enter keyword" 
              name="keyword" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} // Cập nhật từ khóa
              className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
            />
            <button type="submit" className="btn-primary py-2 px-8 text-white rounded-full">Search</button>
          </form>

          {/* Danh sách phim */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
            {movies.map((movie) => ( // Thay đổi từ listPopularFilm thành movies
              <FilmItem
                key={movie.id} 
                id={movie.id}
                original_title={movie.original_title}
                original_name={movie.original_name}
                name={movie.name}
                media_type={movie.media_type}
                poster_path={movie.poster_path}
                className="w-full"
              />
            ))}
          </div>

          {/* Nút tải thêm */}
          <div className="text-center mt-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <button onClick={handleLoadMore} className="btn-sm btn-default">
                Watch more
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};