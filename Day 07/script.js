const apiUrl = "https://quotes15.p.rapidapi.com/quotes/random/";
const apiHeaders = {
  "X-RapidAPI-Key": "33a220eed6msh21eac07f6c77b38p17c05fjsn57b4e15e4647",
  "X-RapidAPI-Host": "quotes15.p.rapidapi.com"
};

const fallbackQuotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Whether you think you can, or you think you can't – you're right.",
    author: "Henry Ford"
  },
  {
    text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William B. Sprague"
  }
];

async function fetchQuote() {
  try {
    const response = await fetch(apiUrl, { headers: apiHeaders });
    if (!response.ok) throw new Error("Failed to fetch quote from API");
    const data = await response.json();
    displayQuote(data.content, data.originator.name);
  } catch (error) {
    console.error("Error fetching quote:", error);
    displayFallbackQuote(); 
  }
}

function displayQuote(text, author) {
  document.querySelector("blockquote").textContent = text;
  document.querySelector("span").textContent = author ? `— ${author}` : "— Unknown";
}


function displayFallbackQuote() {
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  const { text, author } = fallbackQuotes[randomIndex];
  displayQuote(text, author);
}

// share the quote on Twitter
function tweetQuote() {
  const quote = document.querySelector("blockquote").textContent;
  const author = document.querySelector("span").textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${quote} ${author}`
  )}`;
  window.open(twitterUrl, "_blank");
}


document.querySelector("#new-quote").addEventListener("click", fetchQuote);
document.querySelector("#tweet-quote").addEventListener("click", tweetQuote);

fetchQuote();
