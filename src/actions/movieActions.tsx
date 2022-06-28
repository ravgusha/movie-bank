import { createAction } from "@reduxjs/toolkit";
import { ApiCard } from "../components/CardList/CardList";

export const setCurrentMovieAction = createAction<ApiCard | null>('SET_CURRENT_MOVIE');

export const setAgeLimitAction = createAction<boolean>('SET_AGE_LIMIT');

export const setLanguageAction = createAction<string>('SET_LANGUAGE');

export const setCurrentPageAction = createAction<number>('SET_CURRENT_PAGE');

export const setMoviesPerPageAction = createAction<string>('SET_MOVIES_PER_PAGE');

export const setTotalResultsAction = createAction<number>('SET_TOTAL_RESULTS');

export const fetchMoviesAction = createAction('FETCH_MOVIES');

export const cancelFetchMoviesAction = createAction('CANCEL_FETCH_MOVIES');

export const addMoviesAction = createAction<ApiCard[]>('ADD_MOVIES');

export const addSearchTermAction = createAction<string>('ADD_SEARCH_TERM');