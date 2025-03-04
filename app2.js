const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Global variable to store the camera stream
window.currentStream = null;

// **🔹 Speak Function**
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// **🔹 Greeting Based on Time**
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

// **🔹 Initialize on Page Load**
window.addEventListener('load', () => {
    speak("Initializing NOVA...");
    speak("Hi, my name is NOVA. How may I assist you today?");
    wishMe();
    recognition.start();
});

// **🔹 Speech Recognition Setup**
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; 
recognition.interimResults = false;
recognition.lang = 'en-US';

// Process the recognized speech
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// Restart recognition if it stops unexpectedly
recognition.onend = () => setTimeout(() => recognition.start(), 1000);

// **🔹 Button to Manually Start Listening**
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// **🔹 Command Processing**
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello, How May I Assist You?");
    } else if (message.includes("how are you")) {
        speak("I am just a program, but I'm functioning as expected. How can I assist you?");
    } else if (message.includes("open google")) {
        openWebsite("https://google.com", "Opening Google...");
    } else if (message.includes("open instagram")) {
        openWebsite("https://instagram.com", "Opening Instagram...");
    } else if (message.includes("open facebook")) {
        openWebsite("https://facebook.com", "Opening Facebook...");
    } else if (message.includes("open chatgpt")) {
        openWebsite("https://chat.openai.com", "Opening ChatGPT...");
    } else if (message.includes("say me today's weather")) {
        openWebsite("https://www.google.com/search?q=weather", "Fetching the latest weather updates...");
    } else if (message.includes("what is the news today")) {
        openWebsite("https://news.google.com", "Here are the latest news headlines...");
    } else if (message.includes("say me a joke")) {
        tellJoke();
    } else if (message.includes("play music") || message.includes("play a song")) {
        playTrendingSong();
    } else if (message.includes("open spotify")) {
        openWebsite("https://open.spotify.com", "Opening Spotify...");
    } else if (message.includes("suggest me a movie")) {
        suggestMovie();
    } else if (message.includes("say me the time")) {
        speak("The current time is " + new Date().toLocaleTimeString());
    } else if (message.includes("whats today date")) {
        speak("Today's date is " + new Date().toLocaleDateString());
    } else if (message.includes("calculate")) {
        performCalculation(message.replace("calculate", "").trim());
    } else if (message.includes("open calculator")) {
        openCalculator();
    } else if (message.includes("open camera")) {
        openCamera();
    } else if (message.includes("stop camera") || message.includes("close camera")) {
        stopCamera();
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
    } else if (message.includes("bye")) {
        speak("Goodbye! Have a great day ahead!");
    } else {
        // Fallback: search the query on Google
        openWebsite(`https://www.google.com/search?q=${message.replace(" ", "+")}`, `Here’s what I found on Google regarding ${message}`);
    }
}

// **🔹 Open a Website**
function openWebsite(url, message) {
    window.open(url, "_blank");
    speak(message);
}

// **🔹 Play Trending Song**
function playTrendingSong() {
    speak("Playing the latest trending song...");
    let trendingSongs = [
        "https://youtu.be/m7gCn9u9bM4?si=pV55oi1nxI5ptcBQ",
        "https://www.youtube.com/watch?v=GWNrPJyRTcA",
        "https://www.youtube.com/watch?v=Pl2vjFggJp0"
    ];
    let song = trendingSongs[Math.floor(Math.random() * trendingSongs.length)];
    window.open(song, "_blank");
}

// **🔹 Suggest a Random Movie**
function suggestMovie() {
    let movies = [
        "Puspha 2",
        "The Dark Knight",
        "Guntur karam",
        "Avengers: Endgame",
        "The Matrix",
        "Salar",
        "Titanic"
    ];
    speak("How about watching the " + movies[Math.floor(Math.random() * movies.length)] + "?");
}

// **🔹 Tell a Random Joke**
function tellJoke() {
    let jokes = [
        "Why don’t some couples go to the gym? Because some relationships don’t work out!",
        "Why do cows have hooves instead of feet? Because they lactose!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    speak(jokes[Math.floor(Math.random() * jokes.length)]);
}

// **🔹 Perform Calculation**
function performCalculation(expression) {
    try {
        // Replace words with symbols for basic operations
        let formattedExpression = expression
            .replace(/plus/gi, "+")
            .replace(/minus/gi, "-")
            .replace(/into/gi, "*")
            .replace(/multiplied by/gi, "*")
            .replace(/times/gi, "*")
            .replace(/divided by/gi, "/")
            .replace(/power/gi, "**")
            .replace(/square root of/gi, "Math.sqrt");
        let result = eval(formattedExpression);
        speak("The result is " + result);
    } catch (error) {
        speak("Sorry, I couldn't calculate that.");
    }
}

// **🔹 Open Calculator**
function openCalculator() {
    window.open("calc:", "_blank");
    speak("Opening Calculator...");
}

// **🔹 Open Camera**
function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        window.currentStream = stream; // Store the stream globally for later stopping
        let video = document.createElement("video");
        video.id = "cameraStream"; // Assign an id to the video element
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);
        speak("Opening Camera...");
    }).catch(() => speak("Camera access denied."));
}

// **🔹 Stop Camera**
function stopCamera() {
    if (window.currentStream) {
        window.currentStream.getTracks().forEach(track => track.stop());
        let video = document.getElementById("cameraStream");
        if (video) {
            video.remove();
        }
        speak("Camera stopped.");
        window.currentStream = null;
    } else {
        speak("Camera is not active.");
    }
}
