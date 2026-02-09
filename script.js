// Your quiz questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// 1. Initialize or Retrieve User Answers
let userAnswers = [];
const storedAnswers = sessionStorage.getItem("progress");

if (storedAnswers) {
  userAnswers = JSON.parse(storedAnswers);
} else {
  // Initialize with 'null' or empty to represent no selection
  userAnswers = new Array(questions.length).fill(null);
}

// 2. Render the Quiz
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear existing content

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-container";
    
    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;
      
      // Check if this choice was previously saved
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // 3. Event Listener for Selection
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// 4. Calculate Score on Submit
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  
  // Display score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of 5.`;
  
  // Persist final score in localStorage
  localStorage.setItem("score", score);
}

// Initialize the quiz
renderQuestions();

// Attach submit event
document.getElementById("submit").addEventListener("click", calculateScore);