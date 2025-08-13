document.addEventListener("DOMContentLoaded", () => {
    const startQuizBtn = document.getElementById("start-btn");
    const toggleBtn = document.getElementById("theme-toggle");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide"
    }
    ];
    let currentQuestionIndex = 0;
    let score = 0;

    toggleBtn.addEventListener("click", () => {
        if (localStorage.getItem.theme === "dark") {
            toggleBtn.body.classList.toggle = "dark";
            toggleBtn.body.classList.toggle = "light";
        } else{
            toggleBtn.body.classList.add = "dark";
        }
    })

    startQuizBtn.addEventListener("click", startQuiz);

    function startQuiz() {
        startQuizBtn.classList.add("hidden");
        resultContainer.classList.add("hidden")
        questionContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        // choicesList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach(choices => {
            const li = document.createElement("li");
            li.textContent = choices;
            li.addEventListener("click", () => selectAnswer(choices));
            choicesList.appendChild(li)
        })        
    }

    function selectAnswer(choices) {
        
    }

})