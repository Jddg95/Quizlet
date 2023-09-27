var startBtn = document.getElementById("startBtn");
var introContainer = document.getElementById("intro-container");
var questionContainer = document.getElementById("question-container");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("question");
var answerChoiceEl = document.getElementById("answer-choices");


var questions = [
    {
        question: "What keyword is used to declare a variable in JavaScript?"
        choices: ["var", "let", "const", "variable"],
        answer: "var"
    },
    {
        question: "What HTML tag is used to create a hyperlink?"
        choices: ["<link>", "<url>", "<a>", "href"],
        answer: "<link>"

    },
    {
        question: "How can you include an external CSS file in an HTML document?"
        choices: ["<style>", "<link>", "<css>", "<script>"],
        answer: "<link>"
    },
    {
        question: "Which HTML tag is used to define a list of items, such as a bulleted or numbered list?"
        choices: ["<list>", "<ul>", "<li>", "<ol>"],
        answer: "<ul>"
    }
]


let currentQuestrionIndex = 0;
let timerLeft = 60;

// start quiz function 
function startQuiz () {
    //hide intro container and show the question container 
    introContainer.classList.add('hide');
    questionContainer.classList.remove('hide');

    //start timer
    startTimer();

    // display first question 
    displayQuestion();
}

