import React, { useState, useEffect } from "react";
import logo from "../../assets/NEWSLETTER.png"
import "./Navbar.css"
import { TiWeatherPartlySunny } from "react-icons/ti";

function Navbar({ getGetSelectTopic, searchNews }) {

  const [activeTopic, setActiveTopic] = useState("Home");
  const [currentTime, setCurrentTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const topics = [
    "Politics",
    "Technology",
    "Health",
    "Sports",
    "Climate",
    "Business"
  ];

  const handleClickTopic = (topic) => {
    getGetSelectTopic(topic);
    setActiveTopic(topic);
  };

  // Search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchNews(searchTerm);
    }
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo-box">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for headlines"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
        </nav>
      </div>

      <div className="topic-bar">

        <ul className="topic-list">
          {topics.map((topic, id) => (
            <li
              key={id}
              onClick={() => handleClickTopic(topic)}
              className={`topic-item ${
                activeTopic === topic ? "active-topic" : ""}`}
            >
              {topic}
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default Navbar;