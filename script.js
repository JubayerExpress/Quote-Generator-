const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const categorySelect = document.getElementById('category');
const themeToggleBtn = document.getElementById('theme-toggle');

// Quotes categorized
const quotes = {
    random: [
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "Get busy living or get busy dying.", author: "Stephen King" }
    ],
    inspirational: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" }
    ],
    funny: [
        { text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde" },
        { text: "I'm not arguing, I'm just telling you why you're wrong.", author: "Anonymous" }
    ],
    love: [
        { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare" },
        { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" }
    ],
    success: [
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
    ]
};

// Function to fetch and display a new quote
function getNewQuote() {
    const category = categorySelect.value;
    const selectedQuotes = quotes[category];
    const randomQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
    
    quoteText.textContent = `"${randomQuote.text}"`;
    authorText.textContent = `- ${randomQuote.author}`;
}

// Dark/Light Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getNewQuote);
themeToggleBtn.addEventListener('click', toggleTheme);

// Display a random quote on initial load
window.onload = getNewQuote;
