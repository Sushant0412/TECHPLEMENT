import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const getOneQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "UA31UHAU/g08pyyIr/RkKA==MtQNgUEwQ07Qhdjn" },
      });
      setQuote(res.data[0]); // Assuming data is an array of quotes, set the first one
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
        const res = await axios.post("http://localhost:5000/quotes/author", {
          author,
        });
        setAuthorQuotes(res.data);
        if (res.data.length === 0) {
          setError(`No quotes found for "${author}".`);
        }
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
      <button onClick={getOneQuote} disabled={loading}>
        Generate
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : authorQuotes.length > 0 ? (
        <div>
          {authorQuotes.map((q, index) => (
            <div key={index}>
              <div>{q.quote}</div>
              <p>{q.author}</p>
            </div>
          ))}
        </div>
      ) : author.trim() !== "" ? (
        <p>No quotes found for "{author}"</p>
      ) : (
        <div>
          <div>{quote.quote}</div>
          <p>{quote.author}</p>
        </div>
      )}
    </div>
  );
}
