/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from 'react-router-dom';
import { type MovieOrShow } from '@/types/movies';
import { CustomizedBox } from '@/components/MovieCard/MovieCardStyles';

import {
  CardActionArea,
  Typography,
  CardMedia,
  CardContent
} from '@mui/material';

const MovieCard = ({ data }: { data: MovieOrShow }): JSX.Element => {
  return (
    <CustomizedBox>
      <CardActionArea>
        <Link to={`/movie/${data.imdbID}`}>
          <CardMedia
            sx={{ height: '300px' }}
            image={data.Poster}
            title={data.Title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="text.primary"
            >
              {data.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.Year}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </CustomizedBox>
  );
};

export default MovieCard;
