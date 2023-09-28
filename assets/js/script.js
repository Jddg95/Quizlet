var startBtn = document.getElementById("startBtn");
var introContainer = document.getElementById("intro-container");
var questionContainer = document.getElementById("question-container");
var timerEl = document.getElementById("timer");
var answerChoiceEl = document.getElementById("answer-choice");

const questions = [
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    choices: ["var", "let", "const", "variable"],
    answer: "var",
  },
  {
    question: "What HTML tag is used to create a hyperlink?",
    choices: ["<link>", "<url>", "<a>", "href"],
    answer: "<link>",
  },
  {
    question: "How can you include an external CSS file in an HTML document?",
    choices: ["<style>", "<link>", "<css>", "<script>"],
    answer: "<link>",
  },
  {
    question:
      "Which HTML tag is used to define a list of items, such as a bulleted or numbered list?",
    choices: ["<list>", "<ul>", "<li>", "<ol>"],
    answer: "<ul>",
  },
];

var currentQuestionIndex = 0;
var timeLeft = 45;
var timerInterval;

function startTimer() {
   timerInterval = setInterval(function () {
    if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerInterval);
      //Handle when the timer reaches 0
      endQuiz();
    } else {
      // update the timer element with the remaining time
      timerEl.textContent = `Time: ${timeLeft} seconds`;
      timeLeft--;
    }
  }, 1000);
}
// Add event listener to start quiz button
startBtn.addEventListener(`click`, startQuiz);

function startQuiz() {
  //hide intro container and show the question container
  introContainer.classList.add("hide");
  questionContainer.classList.remove("hide");

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
    choiceButton.addEventListener(`click`, function () {
      //check if the selected answer is correct
      if (choice === currentQuestion.answer) {
        //handle correct answer (you can update the score here)
        console.log(`Correct!`);
      } else {
        // handle incorrect answer (you can update the score here)
        console.log(`Incorrect!`);

        // subtract time 
        timeLeft -= 10;

        // ensure timeLeft doesnt go negative
        if (timeLeft < 0) {
          timeLeft = 0;
        }

        // update timer display 
        timerEl.textContent = `Time: ${timeLeft} seconds`;
      }

      // move to the next question
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        //quiz is over
        endQuiz();
        console.log(`Quiz is over!`);
      }
    });
    function endQuiz() {
      // hide question container 
      questionContainer.classList.add(`hide`);
    
      //show end container 
      endContainer.classList.remove(`hide`);
    
      // stop the timer (if its still running)
      clearInterval(timerInterval);
    }    
  }
}

if (currentQuestionIndex >= questions.length) {
  endQuiz();
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (event) {
  // prevent froom submitting and refreshing the page
  event.preventDefault();

  // retriving users initials from input 
  var initialsInput = document.getElementById("initials");
  var userInitials = initialsInput.value;

  // calculate users score 
  var userScore = calculateScore();

  //store the users initials ans score in an array or object 
  var userResult = { initials: userInitials, score: userScore };

  // save users results to storage as an array 
  saveUserResults(userResult)

  //display confirmation message 
  console.log("Initials and score saved:" , userResult);
  resetQuiz();
});

function resetQuiz() {
  // clear users initials from the input field 
  initialsInput.value = "";

  //reset curent question index and timer
  currentQuestionIndex = 0;
  timeLeft = 45;

  // hide score if visible 
  highScoresContainer.classList.add("hide");
  endContainer.classList.add("hide");

  // start quiz again 
  startQuiz();
}


function calcuateScore() {

  return;
}

var viewHighscoresLink = document.getElementById("view-high-scores");
var highScoresContainer = document.getElementById("high-scores-container");
var highScoresList = document.getElementById("high-scores-list");

viewHighscoresLink.addEventListener("click", function (event) {
  displayHighScores();

  highScoresContainer.classList.remove("hide");

  if (highScores) {
    console.log("High Scores:", highScores);
  }
});

function displayHighScores() {
  highScoreList.innerHTML = "";
  // hide the main container to show high scores 
  introContainer.classList.add("hide");
  questionContainer.classList.add("hide");
  highScoresContainer.classList.remove("hide");

  // retriving high scores in desending order by score 
  var highScores = JSON.parse(localStorage.getItem("quizResults")) || [];

  //sort high scores from local storage 
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
}

// Display each high schore in the list 
highScores.forEach(function (scoreData) {
  var li = document.createElement("li");
  li.textContent = `${scoreData.initials}: ${scoreData.score}`;
  highScoreList.appendChild(li);
});

