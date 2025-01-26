const combotApiUrl = "https://combot.org/c/-1002308209034/a"; // Replace with the actual Combot API URL

/**
 * Fetch the leaderboard and return the top 10 engaged members excluding the first.
 * @returns {Promise<Object[]>} Array of top members (excluding the first).
 */
export async function getTopMembers() {
  try {
    const response = await fetch(combotApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.result && data.result.length > 1) {
      // Exclude the first member and take the next 10 members
      return data.result.slice(1, 11);
    } else {
      throw new Error("No leaderboard data available or not enough members.");
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
}
