import axios from "axios";

export const getOneQuote = async () => {
  try {
    const res = await axios.get("https://api.quotable.io/random");
    return { content: res.data.content, author: res.data.author };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch or save quote.");
  }
};

export const getQuotesByAuthor = async (author) => {
  if (author.trim() === "") {
    throw new Error("Please enter an author name.");
  }

  try {
    const encodedAuthor = encodeURIComponent(author.trim());
    const res = await axios.get(
      `https://api.quotable.io/quotes?author=${encodedAuthor}`
    );
    if (res.data.results.length === 0) {
      throw new Error(`No quotes found for "${author}".`);
    }
    return res.data.results.slice(0, 6);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch quotes by author.");
  }
};
