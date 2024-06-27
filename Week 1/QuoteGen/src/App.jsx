import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState({ content: "", author: "~" });
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const getOneQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://api.quotable.io/random");
      setQuote({ content: res.data.content, author: res.data.author });
    } catch (err) {
      setError("Failed to fetch or save quote.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (author.trim() !== "") {
        const encodedAuthor = encodeURIComponent(author.trim());
        const res = await axios.get(
          `https://api.quotable.io/quotes?author=${encodedAuthor}`
        );
        setAuthorQuotes(res.data.results.slice(0,6));
        if (res.data.results.length === 0) {
          setError(`No quotes found for "${author}".`);
        }
        setAuthor("");
        setQuote({ content: "", author: "" });
      } else {
        setError("Please enter an author name.");
      }
    } catch (err) {
      setError("Failed to fetch quotes by author.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = () => {
    setAuthorQuotes([]);
    if (author.trim() === "") {
      getOneQuote();
    } else {
      setQuote({ content: "", author: "" });
    }
  };

  return (
    <div>
      <nav>
        <h1>Random Quote Generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
          />
          <button type="submit">🔍</button>
        </form>
      </nav>
      <div className="main">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : authorQuotes.length > 0 ? (
          <div className="authorQuotes">
            {authorQuotes.map((q) => (
              <div key={q._id} className="quoteBox">
                <div>{q.content}</div>
                <p>{q.author}</p>
              </div>
            ))}
          </div>
        ) : quote.content !== "" ? (
          <div className="oneQuote">
            <div className="oneQuoteContent">{quote.content}</div>
            <p>{quote.author}</p>
          </div>
        ) : (
          <p>Click Generate to Start</p>
        )}
        <button
          className="gen-btn"
          onClick={handleGenerateClick}
          disabled={loading}
        >
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
}
