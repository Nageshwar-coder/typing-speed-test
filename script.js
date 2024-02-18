let timerEl = document.getElementById('timer');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let quoteInputEl = document.getElementById('quoteInput');
let resultEl = document.getElementById('result');
let submitBtnEl = document.getElementById('submitBtn');
let resetBtnEl = document.getElementById('resetBtn');
let spinnerEl = document.getElementById('spinner');

let info = {
    quote: "",
    intervalId: 0,
};

function startInterval() {
    let counter = 0;
    info.intervalId = setInterval(function() {
        counter += 1;
        timerEl.textContent = counter;
    }, 1000);
}
startInterval();

function confirmSubmission() {
    let {
        quote
    } = info;
    let userInput = quoteInputEl.value;
    if (userInput === "") {
        resultEl.textContent = "You typed incorrect statement";  
    } else if (userInput === quote) {
        resultEl.textContent = "You typed in " + timerEl.textContent + " seconds";
    } else if (userInput !== quote) {
        resultEl.textContent = "You typed incorrect statement";
    }
}

function displayQuote(quote) {
    spinnerEl.classList.toggle('d-none');
    quoteDisplayEl.textContent = quote;
}

function getQuote() {
    spinnerEl.classList.toggle('d-none');
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET",
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            info.quote = jsonData.content;
            displayQuote(info.quote);
        });
}
getQuote();

submitBtnEl.addEventListener('click', function() {
    let {
        quote,
        intervalId
    } = info;
    confirmSubmission(quote);
    clearInterval(intervalId);
});
resetBtnEl.addEventListener('click', function() {
    quoteInputEl.value = "";
    quoteDisplayEl.textContent = "";
    getQuote();
    resultEl.textContent = "";
    timerEl.textContent = "0";
    startInterval();
});