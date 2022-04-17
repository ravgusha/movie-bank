export const apiKey = 'ec79681972e0c0a082743a6481ea4b2c';
export const fakeLocalStorage = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

export const mockResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/AfS7QTuDNIySoqcGyg9YFel3X3P.jpg',
      genre_ids: [99],
      id: 736759,
      original_language: 'en',
      original_title: 'Making The Witcher',
      overview:
        'Journey into the extraordinary world of "The Witcher" — from casting the roles to Jaskier\'s catchy song — in this behind-the-scenes look at the series. Go behind the monsters, the ballads and every bit of magic that went into bringing The Witcher\'s Continent to life.',
      popularity: 19.964,
      poster_path: '/zYnwBAUPQn5WmurROH1ravCC6Wp.jpg',
      release_date: '2020-08-26',
      title: 'Making The Witcher',
      video: false,
      vote_average: 7.7,
      vote_count: 45,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const fakeGenres = {
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};
export default apiKey;
