import { type AxiosResponse, type AxiosError } from 'axios';
import axios from '@/utils/axios';
import { type RootState } from '@/redux/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Status,
  type MovieOrShow,
  type MovieResponse,
  type MoviesState
} from '@/types/movies';

const APIKey: string = import.meta.env.VITE_API_KEY;

const selectMovieOrShow = {
  Title: '',
  imdbRating: '',
  imdbVotes: '',
  imdbID: '',
  Runtime: '',
  Year: '',
  Plot: '',
  Director: '',
  Actors: '',
  Genre: '',
  Language: '',
  Awards: '',
  Poster: ''
};

export const fetchAsyncMovies = createAsyncThunk<MovieResponse, string>(
  'movies/fetchAsyncMovies',
  async (term) => {
    try {
      const response: AxiosResponse = await axios.get(
        `?apiKey=${APIKey}&s=${term}&type=movie`
      );
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const fetchAsyncShows = createAsyncThunk<MovieResponse, string>(
  'movies/fetchAsyncShows',
  async (term) => {
    try {
      const response: AxiosResponse = await axios.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk<
  MovieOrShow,
  string
>('movies/fetchAsyncMovieOrShowDetail', async (id) => {
  try {
    const response: AxiosResponse = await axios.get(
      `?apiKey=${APIKey}&i=${id}&Plot=full`
    );
    return response.data;
  } catch (error) {
    return error as AxiosError;
  }
});

const initialState: MoviesState = {
  movies: { Search: [], totalResults: '', Response: '' },
  shows: { Search: [], totalResults: '', Response: '' },
  selectMovieOrShow,
  status: Status.LOADING
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = selectMovieOrShow;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.selectMovieOrShow = payload;
      });
  }
});

export const { removeSelectedMovieOrShow } = moviesSlice.actions;

export const getAllMovies = (state: RootState): MovieResponse =>
  state.movies.movies;
export const getAllShows = (state: RootState): MovieResponse =>
  state.movies.shows;
export const getSelectedMovieOrShow = (state: RootState): MovieOrShow =>
  state.movies.selectMovieOrShow;

export default moviesSlice.reducer;
