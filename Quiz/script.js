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
        { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", choices: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the largest ocean on Earth?", choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
        { question: "Who wrote the play 'Romeo and Juliet'?", choices: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"], answer: "William Shakespeare" },
        { question: "Which gas do plants absorb from the atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    // ---- THEME SETUP ----
    const THEME_KEY = "theme";

    function applyTheme(theme) {
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");
        localStorage.setItem(THEME_KEY, theme);
    }

    // On first load: saved theme or light by default
    applyTheme(localStorage.getItem(THEME_KEY) || "light");

    // Toggle button
    toggleBtn.addEventListener("click", () => {
        const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(next);
    });

    // ---- QUIZ LOGIC ----
    startQuizBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener("click", () => {
        score = 0;
        currentQuestionIndex = 0;
        resultContainer.classList.add("hidden");
        startQuizBtn.classList.remove("hidden");
    });

    function startQuiz() {
        startQuizBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        score = 0;
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = ""; // clear old choices

        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.classList.add("choice");
            li.addEventListener("click", () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(selectedLi, choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;

        // Prevent multiple clicks
        Array.from(choicesList.children).forEach(li => li.classList.add("disabled"));

        if (choice === correctAnswer) {
            score++;
            selectedLi.classList.add("correct");
        } else {
            selectedLi.classList.add("incorrect");
        }

        nextBtn.classList.remove("hidden");
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
});
