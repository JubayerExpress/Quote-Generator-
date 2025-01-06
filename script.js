const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const categorySelect = document.getElementById('category-select');
const saveQuoteBtn = document.getElementById('save-quote');
const showFavoritesBtn = document.getElementById('show-favorites');
const favoritesList = document.getElementById('favorites');
const searchInput = document.getElementById('author-search');
const searchBtn = document.getElementById('search-button');
const searchResultsDiv = document.getElementById('search-results');
const readAloudBtn = document.getElementById('read-aloud');
const shareQuoteBtn = document.getElementById('share-quote');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const quotes = {
    inspirational: [
        { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    ],
    funny: [
        { text: "I'm on a whiskey diet. I've lost three days already.", author: "Tommy Cooper" },
        { text: "If at first you don’t succeed, then skydiving definitely isn’t for you.", author: "Steven Wright" },
    ],
    love: [
        { text: "Love is when you meet someone who tells you something new about yourself.", author: "Andre Breton" },
        { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    ],
    success: [
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    ]
};

// Save current quote to favorites
function saveFavorite() {
    const currentQuote = {
        text: quoteText.textContent,
        author: authorText.textContent
    };
    favorites.push(currentQuote);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Quote saved!');
}

// Show saved favorites
function showFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent = `${quote.text} ${quote.author}`;
        favoritesList.appendChild(li);
    });
    document.getElementById('favorites-list').style.display = 'block';
}

// Search for quotes by author
function searchByAuthor() {
    const searchTerm = searchInput.value.toLowerCase();
    const results = [];

    Object.keys(quotes).forEach(category => {
        quotes[category].forEach(quote => {
            if (quote.author.toLowerCase().includes(searchTerm)) {
                results.push(quote);
            }
        });
    });

    searchResultsDiv.innerHTML = '';
    if (results.length === 0) {
        searchResultsDiv.textContent = 'No quotes found for this author.';
    } else {
        results.forEach(quote => {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
            searchResultsDiv.appendChild(resultDiv);
        });
    }
}

// Change background based on category
function changeBackground(category) {
    const body = document.body;
    switch (category) {
        case 'inspirational':
            body.style.backgroundColor = '#f39c12';
            break;
        case 'funny':
            body.style.backgroundColor = '#27ae60';
            break;
        case 'love':
            body.style.backgroundColor = '#e74c3c';
            break;
        case 'success':
            body.style.backgroundColor = '#2980b9';
            break;
        default:
            body.style.backgroundColor = '#f4f4f4';
    }
}

// Fetch a new quote
function getNewQuote() {
    const category = categorySelect.value;
    const selectedQuotes = quotes[category];
    const randomQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

    quoteText.textContent = `"${randomQuote.text}"`;
    authorText.textContent = `- ${randomQuote.author}`;
    changeBackground(category);
}

// Daily quote function
function showDailyQuote() {
    const lastQuoteDate = localStorage.getItem('lastQuoteDate');
    const today = new Date().toDateString();

    if (lastQuoteDate !== today) {
        getNewQuote();
        localStorage.setItem('lastQuoteDate', today);
    }
}

// Read the quote aloud using the Web Speech API
function readQuoteAloud() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const speech = new SpeechSynthesisUtterance(`${quote} by ${author}`);
    speechSynthesis.speak(speech);
}

// Share quote as image using html2canvas
shareQuoteBtn.addEventListener('click', () => {
    html2canvas(document.querySelector('.quote-box')).then(canvas => {
        const img = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = img;
        link.download = 'quote.png';
        link.click();
    });
});

newQuoteBtn.addEventListener('click', getNewQuote);
saveQuoteBtn.addEventListener('click', saveFavorite);
showFavoritesBtn.addEventListener('click', showFavorites);
searchBtn.addEventListener('click', searchByAuthor);
readAloudBtn.addEventListener('click', readQuoteAloud);
window.onload = showDailyQuote;
