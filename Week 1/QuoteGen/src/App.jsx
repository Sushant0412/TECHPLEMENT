import React, { useState } from "react";
import { getOneQuote, getQuotesByAuthor } from './backend.js';
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState({ content: "", author: "~" });
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const quotes = await getQuotesByAuthor(author);
      setAuthorQuotes(quotes);
      setAuthor("");
      setQuote({ content: "", author: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    setAuthorQuotes([]);
    setLoading(true);
    setError("");

    try {
      if (author.trim() === "") {
        const newQuote = await getOneQuote();
        setQuote(newQuote);
      } else {
        setQuote({ content: "", author: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
