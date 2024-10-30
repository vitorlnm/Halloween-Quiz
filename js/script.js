const questions = [
    { question: "What is the most common symbol of Halloween?", options: ["Pumpkin", "Cat", "Owl", "Scarecrow"], answer: "Pumpkin" },
    { question: "Which country originated Halloween?", options: ["Ireland", "United States", "Mexico", "England"], answer: "Ireland" },
    { question: "What is the name of the pumpkin lantern?", options: ["Jack's Lantern", "Jack Frost", "Magic Pumpkin", "Scary Skull"], answer: "Jack's Lantern" },
    { question: "What is Dracula's nickname?", options: ["Prince of Shadows", "Lord of Darkness", "Count", "Prince of Darkness"], answer: "Prince of Darkness" },
    { question: "What color is associated with Halloween?", options: ["Purple", "Red", "Orange", "Blue"], answer: "Orange" },
    { question: "What animal is associated with witches?", options: ["Black Cat", "Dog", "Crow", "Bat"], answer: "Black Cat" },
    { question: "On what date is Halloween celebrated?", options: ["October 25", "October 30", "October 31", "November 1"], answer: "October 31" },
    { question: "What plant is associated with Halloween?", options: ["Sunflower", "Pumpkin", "Rose", "Cactus"], answer: "Pumpkin" },
    { question: "What candy is most given on Halloween?", options: ["Gum", "Chocolate", "Caramel", "Lollipop"], answer: "Chocolate" },
    { question: "Which country is the movie Halloween from?", options: ["Canada", "United States", "England", "France"], answer: "United States" },
    { question: "Which famous monster is green?", options: ["Frankenstein", "Dracula", "Werewolf", "Ghost"], answer: "Frankenstein" },
    { question: "What is the eye color of a zombie?", options: ["Red", "Green", "White", "Blue"], answer: "White" },
    { question: "What animal represents death?", options: ["Owl", "Bat", "Black Cat", "Crow"], answer: "Crow" },
    { question: "What candy is yellow, orange, and white?", options: ["Lollipop", "Candy Corn", "Chocolate", "Gum"], answer: "Candy Corn" },
    { question: "Which classic witch movie is associated with Halloween?", options: ["The Shining", "The Witches of Eastwick", "Hocus Pocus", "Psycho"], answer: "Hocus Pocus" },
    { question: "What does 'Trick or Treat' mean?", options: ["Get money", "Ask for food", "Ask for candy", "Make friends"], answer: "Ask for candy" },
    { question: "What fruit is associated with Halloween?", options: ["Pumpkin", "Apple", "Banana", "Grape"], answer: "Pumpkin" },
    { question: "When is Halloween?", options: ["December 25", "October 31", "November 1", "November 2"], answer: "October 31" },
    { question: "Which ghost is known for screaming?", options: ["Bathroom Ghost", "Caipora", "Headless Mule", "The Lady in White"], answer: "The Lady in White" },
    { question: "Which country celebrates the Day of the Dead in November?", options: ["Mexico", "Spain", "Brazil", "United States"], answer: "Mexico" },
];

let currentQuestion = 0;
let score = 0;
let myChart;

function loadQuestion() {
    const quizDiv = document.getElementById("quiz");

    if (quizDiv) {
        quizDiv.innerHTML = `
            <div class="question">
                <h2>${questions[currentQuestion].question}</h2>
                <ul class="options">
                    ${questions[currentQuestion].options.map((option) =>
                        `<li><button class="option-button" data-option="${option}">${option}</button></li>`
                    ).join("")}
                </ul>
            </div>
            <p id="warning" style="color: red; display: none;">You need to select an answer to continue!</p>
        `;

        document.querySelectorAll(".option-button").forEach(button => {
            button.addEventListener("click", function () {
                checkAnswer(this.getAttribute("data-option"));
            });
        });
    } else {
        console.error("Element with id 'quiz' not found in HTML.");
    }
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("play-again").style.display = "inline-block";

    const ctx = document.getElementById('myChart').getContext('2d');
    const incorrect = questions.length - score;

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [score, incorrect],
                backgroundColor: ['#4CAF50', '#FF6347']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                }
            }
        }
    });

    document.getElementById("score-text").innerText = score > 15 ? "You won! 🎉" : "You lost! Try again...";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("play-again").style.display = "none";
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

loadQuestion();
