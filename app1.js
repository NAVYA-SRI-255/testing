const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hour = new Date().getHours();
    if (hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing NOVA...");
    speak("Hi, my name is NOVA. How may I assist you today?");
    wishMe();
    recognition.start();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; 
recognition.interimResults = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

recognition.onend = () => setTimeout(() => recognition.start(), 1000);

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hi') || message.includes('hello')) {
        speak("Hello, How May I Assist You?");
    } else if (message.includes("how are you")) {
        speak("I am just a program, but I'm functioning as expected. How can I assist you?");
    } else if (message.includes("open google")) {
        openWebsite("https://google.com", "Opening Google...");
    } else if (message.includes("open instagram")) {
        openWebsite("https://instagram.com", "Opening Instagram...");
    } else if (message.includes("open chatgpt")) {
        openWebsite("https://chat.openai.com", "Opening ChatGPT...");
    } else if (message.includes("whats today weather report")) {
        openWebsite("https://www.google.com/search?q=weather", "Fetching the latest weather updates...");
    } else if (message.includes("say me the news")) {
        openWebsite("https://news.google.com", "Here are the latest news headlines...");
    } else if (message.includes("open youtube")) {
        openWebsite("https://youtube.com", "Opening YouTube...");
    } else if (message.includes("open linkedin")) {
        openWebsite("https://linkedin.com", "Opening LinkedIn...");
    } else if (message.includes("open github")) {
        openWebsite("https://github.com", "Opening GitHub...");
    } else if (message.includes("open gmail")) {
        openWebsite("https://mail.google.com", "Opening Gmail...");
    } else if (message.includes("open internshala")) {
        openWebsite("https://internshala.com", "Opening Internshala...");
    } else if (message.includes("book a cab") || message.includes("book a bike") || message.includes("book an auto")) {
        openWebsite("https://www.olacabs.com", "Redirecting to Ola for your booking...");
    } else if (message.includes("book rapido")) {
        openWebsite("https://www.rapido.bike", "Redirecting to Rapido for your booking...");
    } else if (message.includes("order pizza")) {
        openWebsite("https://www.zomato.com", "Ordering pizza on Zomato...");
    } else if (message.includes("order food")) {
        openWebsite("https://www.swiggy.com", "Ordering food on Swiggy...");
    } else if (message.includes("order from amazon")) {
        openWebsite("https://www.amazon.com", "Opening Amazon for shopping...");
    } else if (message.includes("order from flipkart")) {
        openWebsite("https://www.flipkart.com", "Opening Flipkart for shopping...");
    } else if (message.includes("order groceries")) {
        openWebsite("https://www.blinkit.com", "Opening Blinkit for grocery shopping...");
    } else if (message.includes("say me the time now")) {
        speak("The current time is " + new Date().toLocaleTimeString());
    } else if (message.includes("what is the date today")) {
        speak("Today's date is " + new Date().toLocaleDateString());
    } else if (message.includes("calculate")) {
        performCalculation(message.replace("calculate", "").trim());
    } else if (message.includes("bye")) {
        speak("Goodbye! Have a great day ahead!");
    } else {
        openWebsite(`https://www.google.com/search?q=${message.replace(" ", "+")}`, `Here’s what I found on Google regarding ${message}`);
    }
}

function openWebsite(url, message) {
    window.open(url, "_blank");
    speak(message);
}

function performCalculation(expression) {
    try {
        let formattedExpression = expression.replace("plus", "+")
            .replace("minus", "-")
            .replace("into", "*")
            .replace("multiplied by", "*")
            .replace("times", "*")
            .replace("divided by", "/")
            .replace("by", "/")
            .replace("power", "**")
            .replace("square root of", "Math.sqrt");

        let result = eval(formattedExpression);
        speak("The result is " + result);
    } catch (error) {
        speak("Sorry, I couldn't calculate that.");
    }
}
