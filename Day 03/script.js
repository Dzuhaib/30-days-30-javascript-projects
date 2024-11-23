const questions = [
    {
        question: "How do you create a new page route in a Next.js application?",
        answers: [
            { text: "By configuring the next.config.js file", correct: false},
            { text: "By adding a new route in the pages directory", correct: true},
            { text: "By using the Link component", correct: false},
            { text: "By modifying the package.json file", correct: false},
        ]
    },
    {
        question: "Which Next.js function is used to generate static pages at build time?",
        answers: [
            { text: "getStaticPaths", correct: false},
            { text: "getInitialProps", correct: false},
            { text: "getStaticProps", correct: true},
            { text: "getServerSideProps", correct: false},
            
        ]
    },
    {
        question: "Where do you place API routes in a Next.js project?",
        answers: [
            { text: "In the routes directory", correct: false},
            { text: "In the lib directory", correct: false},
            { text: "In the components directory", correct: false},
            { text: "In the api directory within the pages folder", correct: true},
            
        ]
    },
    {
        question: "Which component is used in Next.js for optimizing images?",
        answers: [
            { text: "img", correct: false},
            { text: "Image", correct: true},
            { text: "Picture", correct: false},
            { text: "OptimizedImage", correct: false},
        ]
    }

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next"
    ShowQuestion()
}

function ShowQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    }); 
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
        nextButton.style.display = "block"
    })
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();

    }else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz();