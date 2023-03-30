import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import StarIcon from '@mui/icons-material/Star';
import MovieIcon from '@mui/icons-material/Movie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow
} from '@/redux/slices/movies';
import { Box, Grid, Typography, Stack, CardMedia } from '@mui/material';
import { StyledTitle } from '@/components/MovieDetail/MovieDetailStyles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const MovieDetail: React.FC = () => {
  const data = useAppSelector(getSelectedMovieOrShow);
  const {
    movies: { status }
  } = useAppSelector((state) => state);

  const { imdbID } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID as string)).catch((error) => {
      console.error(error);
    });

    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <Box sx={{ flexGrow: 1, mt: 9 }}>
      {status === 'error' ? (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            An error has occurred 😕 —{' '}
            <strong>Can&apos;t load pizzas. Please try again later.</strong>
          </Alert>
        </>
      ) : (
        <Box>
          {status === 'loading' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
              <Grid item xs={12} sm={12} md={8} sx={{ mt: 2 }}>
                <Typography variant="h4">{data.Title}</Typography>
                <CardMedia
                  component="img"
                  image={data.Poster}
                  alt={data.Title}
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2, flexDirection: { xs: 'column', md: 'row' } }}
                >
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    IMDB Rating <StarIcon sx={{ color: '#ff9e00', m: 0.5 }} /> :
                    {data.imdbRating}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    IMDB Votes <ThumbUpIcon sx={{ color: '#d4439f', m: 0.5 }} />
                    : {data.imdbVotes}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Runtime <MovieIcon sx={{ color: '#71a8f4', m: 0.5 }} /> :
                    {data.Runtime}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Year <CalendarMonthIcon sx={{ color: '#db1212', m: 0.5 }} />
                    : {data.Year}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, lineHeight: '1.8rem' }}
                >
                  {data.Plot}
                </Typography>
                <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                  <Box>
                    <StyledTitle>Director</StyledTitle>
                    <Typography>{data.Director}</Typography>
                  </Box>
                  <Box>
                    <StyledTitle>Stars</StyledTitle>
                    <Typography>{data.Actors}</Typography>
                  </Box>
                  <Box>
                    <StyledTitle>Generes</StyledTitle>
                    <Typography>{data.Genre}</Typography>
                  </Box>
                  <Box>
                    <StyledTitle>Languages</StyledTitle>
                    <Typography>{data.Language}</Typography>
                  </Box>
                  <Box>
                    <StyledTitle>Awards</StyledTitle>
                    <Typography>{data.Awards}</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CardMedia
                  component="img"
                  image={data.Poster}
                  alt={data.Title}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MovieDetail;
