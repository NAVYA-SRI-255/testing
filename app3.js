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
    speak("Hi, my name is NOVA.");
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
    } else if (message.includes("open google")||message.includes("open google chrome")) {
        openWebsite("https://google.com", "Opening Google...");
    } else if (message.includes("open instagram")) {
        openWebsite("https://instagram.com", "Opening Instagram...");
    } else if (message.includes("open facebook")) {
        openWebsite("https://facebook.com", "Opening Facebook...");
    } else if (message.includes("open chatgpt")) {
        openWebsite("https://chat.openai.com", "Opening ChatGPT...");
    } else if (message.includes("today's weather")) {
        openWebsite("https://www.google.com/search?q=weather", "Fetching the latest weather updates...");
    }else if (message.includes("open youtube")) {
        openWebsite("https://youtube.com", "Opening YouTube...");
    } else if (message.includes("open linkedin")) {
        openWebsite("https://linkedin.com", "Opening LinkedIn...");
    } else if (message.includes("open git hub")) {
        openWebsite("https://github.com", "Opening GitHub...");
    } else if (message.includes("open gmail")) {
        openWebsite("https://mail.google.com", "Opening Gmail...");
    } else if (message.includes("open internshala")) {
        openWebsite("https://internshala.com", "Opening Internshala...");
    } else if (message.includes("movie ticket")||message.includes("book a movie ticket")) {
        openWebsite("https://bookmyshow.com", "Opening book my show for boking the movie tickets...");
    } else if (message.includes("latest news")) {
        openWebsite("https://news.google.com", "Here are the latest news headlines...");
    } else if (message.includes("book a flight") || message.includes("open flight booking")) {
        openWebsite("https://www.google.com/travel/flights", "Redirecting to Google Flights for your booking...");
    } else if (message.includes("latest stock market shares")) {
        openWebsite("https://www.google.com/finance/?sca_esv=8d768c6a0d450c4a&rlz=1C1RXQR_enIN1101IN1101&sxsrf=AHTn8zpMHkFWszWN4uQJu3vr1fpUOtxJPA:1741064352746&ei=oIjGZ8SeLYCP4-EP5fKl6QU&oq=nifty&gs_lp=Egxnd3Mtd2l6LXNlcnAiBW5pZnR5KgIIATIREAAYgAQYkQIYsQMYgwEYigUyERAAGIAEGJECGLEDGIMBGIoFMhAQABiABBixAxhDGIMBGIoFMgsQABiABBixAxiDATIQEAAYgAQYsQMYQxiDARiKBTIKEAAYgAQYQxiKBTIQEAAYgAQYsQMYQxiDARiKBTIKEAAYgAQYQxiKBTIOEAAYgAQYsQMYgwEYigUyDhAAGIAEGLEDGIMBGIoFSPowUO0EWNsjcAJ4AZABBJgBiwOgAeITqgEHMC4zLjUuMrgBAcgBAPgBAZgCCKAC9g2oAhTCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICDhAAGLADGOQCGNYE2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICDRAAGIAEGLEDGEMYigXCAgUQABiABMICBxAjGCcY6gLCAgoQLhjwBRgnGOoCwgITEAAYgAQYQxi0AhiKBRjqAtgBAcICGRAuGIAEGNEDGEMYtAIYxwEYigUY6gLYAQHCAgoQIxiABBgnGIoFwgIEECMYJ5gDFPEFM0QqmNj5-vqIBgGQBhK6BgYIARABGAmSBwkyLjAuNC4xLjGgB7hX&sclient=gws-wiz-serp&sa=X&ved=2ahUKEwi-gfei0u-LAxXwzTgGHcBoBvkQ6M8CegQILhAI", "Here are the latest market trends...");
    } else if (message.includes("play music") || message.includes("play a song")|| message.includes("play songs")) {
        playTrendingSong();
    } else if (message.includes("open spotify")) {
        openWebsite("https://open.spotify.com", "Opening Spotify...");
    } else if (message.includes("latest movies")) {
        suggestMovie();
    } else if (message.includes("say time")|| message.includes("current time")|| message.includes("what's the time now")||message.includes("time")) {
        speak("The current time is " + new Date().toLocaleTimeString());
    } else if (message.includes("whats today date")|| message.includes("today's date")|| message.includes("date")) {
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
    } else if (message.includes("open rapido")|| message.includes("book rapido")) {
        openWebsite("https://www.rapido.bike", "Redirecting to Rapido for your booking...");
    } else if (message.includes("order pizza")|| message.includes("open zomato")|| message.includes("order biryani")) {
        openWebsite("https://www.zomato.com", "Ordering  in Zomato...");
    } else if (message.includes("order food")|| message.includes("open swiggy")|| message.includes("order icecream")) {
        openWebsite("https://www.swiggy.com", "Ordering food on Swiggy...");
    } else if (message.includes("order from amazon")|| message.includes("open amazon")) {
        openWebsite("https://www.amazon.com", "Opening Amazon for shopping...");
    } else if (message.includes("open flipkart")) {
        openWebsite("https://www.flipkart.com", "Opening Flipkart for shopping...");
    } else if (message.includes("order groceries")) {
        openWebsite("https://www.blinkit.com", "Opening Blinkit for grocery shopping...");
    } else if (message.includes("bye")) {
        speak("Goodbye! Have a great day ahead!");
    }else  if (message.includes("share me a recipe")||message.includes("recipe")) {
            openWebsite("https://www.allrecipes.com", "Here are some recipes for you...");
    } else if (message.includes("show my location")||message.includes("location")) {
            openWebsite("https://www.google.com/maps", "Fetching your location...");
    } else if (message.includes("open calendar")) {
            openWebsite("https://calendar.google.com", "Opening your calendar...");
    } else if (message.includes("holidays in this month")) {
            openWebsite("https://www.timeanddate.com/holidays/", "Showing this month's holidays...");
    } else if (message.includes("book a hotel") || message.includes("hotel booking")) {
        openWebsite("https://www.booking.com", "Redirecting to Booking.com for hotel reservations...");
    } else if (message.includes("book tirumala tickets") || message.includes("tirumala darshan tickets")||message.includes("ttd tickets")) {
        openWebsite("https://tirupatibalaji.ap.gov.in", "Redirecting to the Tirumala Tirupati Devasthanams official website for ticket booking...");
    } else if (message.includes("book a train ticket")|| message.includes("open railway reservation system")||message.includes("train ticket")) {
            openWebsite("https://www.irctc.co.in", "Redirecting to IRCTC for train booking...");
    } else if (message.includes("find tourist places near me") || message.includes("tourist attractions nearby") || message.includes("nearby travel destinations")||message.includes("tourist places near me")) {
        findTouristPlaces();
    } else if (message.includes("battery percentage")) {
            navigator.getBattery().then(battery => {
                speak(`Your battery is at ${Math.round(battery.level * 100)} percent.`);
            });
    } else if (message.includes("i am bored")) {
            openWebsite("https://www.miniclip.com/games/en/", "Opening online games for you...");
    } else if (message.includes("diet to gain weight")) {
            speak("To gain weight, you can eat protein-rich foods like eggs, dairy, lean meats, nuts, and healthy carbs.");
    } else if (message.includes("diet to lose weight")) {
            speak("For weight loss, focus on high-protein, fiber-rich foods, drink plenty of water, and avoid processed foods.");
    } else if (message.includes("nearby restaurants") || message.includes("nearby shops") || message.includes("nearby movie theatres")) {
            openWebsite("https://www.google.com/maps/search/" + message.replace("nearby", ""), "Finding nearby " + message.replace("nearby", "") + "...");
    }else if (message.includes("show me nearby consultancies") || message.includes("find consultancies near me")) {
        findNearbyConsultancies();
    } else if (message.includes("book a bus ticket") || message.includes("bus ticket booking")) {
        bookBusTicket();
    }
    else {
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
        "Saalar",
        "Titanic"
    ];
    speak("How about watching the " + movies[Math.floor(Math.random() * movies.length)] + "?");
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
function findNearbyConsultancies() {
    speak("Finding consultancies near you...");
    window.open("https://www.google.com/maps/search/consultancies+near+me", "_blank");
}

// **🔹 Book a Bus Ticket**
function bookBusTicket() {
    speak("Redirecting to RedBus for bus ticket booking...");
    window.open("https://www.redbus.in", "_blank");
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
function findTouristPlaces() {
    speak("Finding tourist attractions near you...");
    window.open("https://www.google.com/maps/search/tourist+places+near+me", "_blank");
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
