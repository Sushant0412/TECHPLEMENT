export const fetchOneQuote = async () => {
  try {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "UA31UHAU/g08pyyIr/RkKA==MtQNgUEwQ07Qhdjn" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return data[0]; // Assuming data is an array of quotes, return the first one
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
