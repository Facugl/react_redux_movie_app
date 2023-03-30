import MovieCard from '@/components/MovieCard/MovieCard';
import Slider from 'react-slick';
import { Settings } from '@/utils/settings';
import { useAppSelector } from '@/hooks/redux';
import { getAllMovies, getAllShows } from '@/redux/slices/movies';
import { Box, Typography, Container } from '@mui/material';

const MovieListing: React.FC = () => {
  const movies = useAppSelector(getAllMovies);
  const shows = useAppSelector(getAllShows);

  let renderMovies: JSX.Element | JSX.Element[] | string = '';
  let renderShows: JSX.Element | JSX.Element[] | string = '';

  renderMovies =
    movies.Response === 'True' ? (
      movies.Search?.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3> {movies.Response} </h3>
      </div>
    );

  renderShows =
    shows.Response === 'True' ? (
      shows.Search?.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="shows-error">
        <h3> {shows.Response} </h3>
      </div>
    );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 10 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="400">
          Movies
        </Typography>
        <Slider {...Settings}>{renderMovies}</Slider>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="400">
          Shows
        </Typography>
        <Slider {...Settings}>{renderShows}</Slider>
      </Box>
    </Container>
  );
};

export default MovieListing;
