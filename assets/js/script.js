var startBtn = document.getElementById("startBtn");
var introContainer = document.getElementById("intro-container");
var questionContainer = document.getElementById("question-container");
var timerEl = document.getElementById("timer");
var answerChoiceEl = document.getElementById("answer-choice");


const questions = [
    {
        question: "What keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "variable"],
        answer: "var"
    },
    {
        question: "What HTML tag is used to create a hyperlink?",
        choices: ["<link>", "<url>", "<a>", "href"],
        answer: "<link>"

    },
    {
        question: "How can you include an external CSS file in an HTML document?",
        choices: ["<style>", "<link>", "<css>", "<script>"],
        answer: "<link>"
    },
    {
        question: "Which HTML tag is used to define a list of items, such as a bulleted or numbered list?",
        choices: ["<list>", "<ul>", "<li>", "<ol>"],
        answer: "<ul>"
    }
]


var currentQuestionIndex = 0;
var timeLeft = 60;

function startTimer() {
    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            //Handle when the timer reaches 0 
            alert(`Time is up!`);
        } else {
            // update the timer element with the remaining time 
            timerEl.textContent = `Time: ${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
}

function startQuiz () {
    //hide intro container and show the question container 
    introContainer.classList.add('hide');
    questionContainer.classList.remove('hide');

    //start timer
    startTimer();

    // display first question 
    displayQuestion();
}

// display a question 

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    answerChoiceEl.innerHTML = "";

    // Display the question text
    const questionText = document.createElement("div");
    questionText.textContent = currentQuestion.question;
    answerChoiceEl.appendChild(questionText);

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const choice = currentQuestion.choices[i];

        //Create a button for each answer choice
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choiceBtn");
        answerChoiceEl.appendChild(choiceButton);

        // add event listener to handle users answer 
        choiceButton.addEventListener(`click`, function() {
            //check if the selected answer is correct
            if (choice === currentQuestion.answer) {
                //handle correct answer (you can update the score here)
                console.log(`Correct!`);
            } else {
                // handle incorrect answer (you can update the score here)
                console.log (`Incorrect!`);
            }

            // move to the next question
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                //quiz is over
                console.log(`Quiz is over!`);
            }
        });

    }
}

// Add event listener to start quiz button 
startBtn.addEventListener(`click`, startQuiz);

