import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });
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
        setAuthorQuotes(res.data.results);
        if (res.data.results.length === 0) {
          setError(`No quotes found for "${author}".`);
        }
        // Clear the single quote state to prevent showing random quote after search
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
    setAuthorQuotes([]); // Clear authorQuotes array
    if (author.trim() === "") {
      getOneQuote();
    } else {
      setQuote({ content: "", author: "" }); // Reset to empty to trigger random quote fetch
    }
  };

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search Author Name"
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleGenerateClick} disabled={loading}>
        Generate
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : authorQuotes.length > 0 ? (
        <div>
          {authorQuotes.map((q) => (
            <div key={q._id}>
              <div>{q.content}</div>
              <p>{q.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div>{quote.content}</div>
          <p>{quote.author}</p>
        </div>
      )}
    </div>
  );
}
