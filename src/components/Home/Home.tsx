import MovieListing from '@/components/MovieListing/MovieListing';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchAsyncMovies, fetchAsyncShows } from '@/redux/slices/movies';

const Home: React.FC = () => {
  const movieText = 'Harry';
  const showText = 'Harry';
  const dispatch = useAppDispatch();
  const {
    movies: { status }
  } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText)).catch((error) => {
      console.error(error);
    });
    dispatch(fetchAsyncShows(showText)).catch((error) => {
      console.error(error);
    });
  }, [dispatch]);

  return (
    <>
      {status === 'error' ? (
        <div>
          <h2>An error has occurred 😕</h2>
          <p>Can&apos;t load pizzas. Please try again later.</p>
        </div>
      ) : (
        <MovieListing />
      )}
    </>
  );
};

export default Home;
