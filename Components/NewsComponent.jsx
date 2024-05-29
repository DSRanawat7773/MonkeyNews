import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = ({ country = 'in', pageSize = 8, category = 'general', setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=efd43181d6d14d05a137b1eec02876b7&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      setProgress(30);
      let parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching news articles:", error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=efd43181d6d14d05a137b1eec02876b7&page=${page+1}&pageSize=${pageSize}`;
    setPage(page+1);  
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{margin: '81px 13px 40px 16px'}}>MonkeyNews - Top Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row my-3 mx-3">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage ? element.urlToImage : "https://i.ytimg.com/vi/lWM8rWVh9H0/maxresdefault.jpg"}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default NewsComponent;
