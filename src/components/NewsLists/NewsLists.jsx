import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import cover_img from "../../assets/coverImg.png";
import "./NewsLists.css";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import { SlCalender } from "react-icons/sl";


function NewsLists() {

  const APIKEY = "ebef28dae74b41a89687ecfa9799caa1";

  const [selectTopic, setSelectTopic] = useState("india");
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  // Fetch News
  const fetchNews = async (topic) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&apiKey=${APIKEY}`
      );

      setNews(response.data.articles);
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchNews(selectTopic);
  }, [selectTopic]);

  const truncateText = (text, maxLength) => {
    return text && text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };

  // Show More
  const showMoreItem = () => {
    setVisibleCount((count) => count + 15);
  };

  // Search
  const searchNews = (searchTerm) => {
    setSelectTopic(searchTerm);
  };

  return (
    <>
      <Navbar
        getGetSelectTopic={setSelectTopic}
        searchNews={searchNews}
      />

      <div className="news-container">

        <div className="news-header">
          {selectTopic === "india" ? (
            <h1>
              Trending <span>News</span>
            </h1>
          ) : (
            <h1>
              {selectTopic} <span>News</span>
            </h1>
          )}
        </div>

        <div className="news-grid">

          {news.length > 0 ? (
            news.slice(0, visibleCount).map((data, id) => {

              const dateTime = data.publishedAt;
              const sliceDate = dateTime
                ? dateTime.slice(0, 10)
                : "Unknown date";

              const truncatedTitle = truncateText(data.title, 50);
              const truncatedDescription = truncateText(
                data.description,
                100
              );

              return (
                <div key={id} className="news-card">

                  <img
                    className="news-image"
                    src={
                      data.urlToImage === null
                        ? cover_img
                        : data.urlToImage
                    }
                    alt={data.title}
                  />

                  <div className="news-date">
                    <SlCalender />
                    <span>{sliceDate}</span>
                  </div>

                  <h2 className="news-title">
                    {truncatedTitle}
                  </h2>

                  <p className="news-description">
                    {truncatedDescription}
                  </p>

                  {data.author && (
                    <p className="news-author">
                      Author :
                      <span>{data.author}</span>
                    </p>
                  )}

                  <div className="read-more">
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                    <FaCircleArrowRight />
                  </div>

                </div>
              );
            })
          ) : (
            <div className="loader-box">
              <Loader/>
            </div>
          )}

        </div>

        {visibleCount < news.length && (
          <div className="view-more-box">

            <button
              className="view-more-btn"
              onClick={showMoreItem}
            >
              View More <FaAngleDown />
            </button>

          </div>
        )}
      </div>
    </>
  );
}

export default NewsLists;