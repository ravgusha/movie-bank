import { createAction } from "@reduxjs/toolkit";

export const setCurrentMovieAction = createAction('SET_CURRENT_MOVIE');

export const setAgeLimitAction = createAction('SET_AGE_LIMIT');

export const setLanguageAction = createAction('SET_LANGUAGE');

export const setCurrentPageAction = createAction('SET_CURRENT_PAGE');

export const setMoviesPerPageAction = createAction('SET_MOVIES_PER_PAGE');

export const setTotalResultsAction = ('SET_TOTAL_RESULTS');

export const fetchMoviesAction = createAction('FETCH_MOVIES');

export const cancelFetchMoviesAction = createAction('CANCEL_FETCH_MOVIES');

export const addMoviesAction = createAction('ADD_MOVIES');

export const addSearchTermAction = createAction('ADD_SEARCH_TERM');