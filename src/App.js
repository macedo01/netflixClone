import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

const Teste = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando um filme aleatorio do array da lista de originais
      let originals = list.filter((i) => i.slug === "originals");
      let randomChoose = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      );
      let choose = originals[0].items.results[randomChoose];
      let chooseInfo = await Tmdb.getMovieInfo(choose.id, "tv");
      setFeaturedData(chooseInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};

export default Teste;
