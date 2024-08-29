import axios from "axios";
import { useEffect, useState } from "react";
import "./News.css";

function News() {
  const [articles, setArticles] = useState([]); // Renamed from articales to articles
  const [error, setError] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState(5); // Number of articles to show initially
  const [allArticles, setAllArticles] = useState([]); // To store all fetched articles

  useEffect(() => {
    const fetchNews = async () => {
      const URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6ede8d886aee478a8ea7aee1c95ff46a';

      try {
        const response = await axios.get(URL);
        const fetchedArticles = response.data.articles; // Set the state with the articles
        setAllArticles(fetchedArticles);
        setArticles(fetchedArticles.slice(0, visibleArticles)); // Display the initial set of articles
      } catch (error) {
        console.error('Error fetching news:', error);
        setError(error.message); // Set the error state if something goes wrong
      }
    };

    fetchNews();
  }, []);

  const handleLoadMore = () => {
    setVisibleArticles(prevVisible => Math.min(prevVisible + 5, allArticles.length)); // Show 5 more articles
  };

  useEffect(() => {
    setArticles(allArticles.slice(0, visibleArticles)); // Update displayed articles when `visibleArticles` changes
  }, [visibleArticles, allArticles]);

  return (
    <div className="news-container">
      <div className="headline"><h1>Latest News</h1></div>
      <ul className="news-list">
        {articles.map((article, index) => (
          <li key={index} className="news-item">
            <div className="author">{article.author || 'Unknown'}</div>
            <div>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Click: {article.title}
              </a>
            </div>
            <p>Source: {article.source.name} | Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      {visibleArticles < allArticles.length && (
        <button onClick={handleLoadMore}>
          More...
        </button>
      )}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default News;
