import { ApiCard } from "../components/CardList/CardList"

export const setCurrentMovieAction = (movie: ApiCard | null = null) => {
    return {
        type: 'SET_CURRENT_MOVIE',
        payload: movie
    }
}

export const setAgeLimitAction = (boolean: boolean) => {
    return {
        type: 'SET_AGE_LIMIT',
        payload: boolean
    }
}

export const setLanguageAction = (language: string) => {
    return {
        type: 'SET_LANGUAGE',
        payload: language
    }
}

export const setCurrentPageAction = (page: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: page
    }
}

export const setMoviesPerPageAction = (num: string) => {
    return {
        type: 'SET_MOVIES_PER_PAGE',
        payload: num
    }
}

export const setTotalResultsAction = (num: number) => {
    return {
        type: 'SET_TOTAL_RESULTS',
        payload: num
    }
}

export const fetchMoviesAction = () => {
    return {
        type: 'FETCH_MOVIES'
    }
}

export const cancelFetchMoviesAction = () => {
    return {
        type: 'CANCEL_FETCH_MOVIES'
    }
}

export const addMoviesAction = (movies: ApiCard[]) => {
    return {
        type: 'ADD_MOVIES',
        payload: movies
    }
}

export const addSearchTermAction = (term: string) => {
    return {
        type: 'ADD_SEARCH_TERM',
        payload: term
    }
}