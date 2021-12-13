const API_KEY = "e02353ac14cf8a9da273df4b271775bb";
const API_BASE = "https://api.themoviedb.org/3";

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários

28
35
27
10749
99
*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  //requisitando para a api as informações
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais da Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`),
      },
      {
        slug: "toprated",
        title: "Em alta",
        items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: "Action",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (tvId, type) => {
    let info = {};

    if (tvId) {
      switch (type) {
        case "tv":
          info = await basicFetch(`/tv/${tvId}?api_key=${API_KEY}`);
          break;

        case "movie":
          info = await basicFetch(`/movie/${tvId}?api_key=${API_KEY}`);
          break;
        default:
      }
    }

    return info;
  },
};
