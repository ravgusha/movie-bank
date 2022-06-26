export const setCurrentMovieAction = (movie) => {
    return {
        type: 'SET_CURRENT_MOVIE',
        payload: movie
    }
}

export const setAgeLimitAction = (boolean) => {
    return {
        type: 'SET_AGE_LIMIT',
        payload: boolean
    }
}

export const setLanguageAction = (language) => {
    return {
        type: 'SET_LANGUAGE',
        payload: language
    }
}

export const setCurrentPageAction = (page) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: page
    }
}

export const setMoviesPerPageAction = (num) => {
    return {
        type: 'SET_MOVIES_PER_PAGE',
        payload: num
    }
}

export const setTotalResultsAction = (num) => {
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

export const addMoviesAction = (movies) => {
    return {
        type: 'ADD_MOVIES',
        payload: movies
    }
}

export const addSearchTermAction = (term) => {
    return {
        type: 'ADD_SEARCH_TERM',
        payload: term
    }
}