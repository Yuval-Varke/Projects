let players = [];
let currentPlayerIndex = 0;
let currentQuestionIndex = 0;
let questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which is the largest planet in the solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter",
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["02", "H2O", "HO2", "H3O"],
        answer: "H2O",
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        options: ["China", "Brazil", "UK", "Australia"],
        answer: "Brazil",
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        answer: "Diamond",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "George Orwell", "Mark Twain"],
        answer: "William Shakespeare",
    },
    {
        question: "Which element is the most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Nitrogen",
    },
    {
        question: "What is the speed of light in a vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "500,000 km/s"],
        answer: "300,000 km/s",
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Marie Curie"],
        answer: "Nikola Tesla",
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2",
    }
];

function addPlayer() {
    const playerName = document.getElementById("playerNameInput").value;
    if (playerName) {
        players.push({ name: playerName, score: 0 });
        document.getElementById("playerNameInput").value = '';
        updatePlayerList();
    }
}

function updatePlayerList() {
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = players.map(player => `<li>${player.name}</li>`).join('');
}

function startGame() {
    if (players.length > 0) {
        
        document.body.style.background = "#800080";  
        
        document.getElementById("playerSetup").classList.add("hidden");
        document.getElementById("gameArea").classList.remove("hidden");
        document.getElementById("scoreBoard").classList.remove("hidden");
        updateScoreboard();
        showQuestion();
    } else {
        alert("Add at least one player to start the game.");
    }
}

function showQuestion() {
    const currentPlayer = players[currentPlayerIndex];
    const currentQuestion = questions[currentQuestionIndex];

    
    document.body.style.background = "#800080";  

    document.getElementById("currentPlayer").innerText = `${currentPlayer.name}'s Turn`;
    document.getElementById("questionText").innerText = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ''; 

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const currentPlayer = players[currentPlayerIndex];

    if (selectedAnswer === currentQuestion.answer) {
        currentPlayer.score += 10; 
        document.body.style.backgroundColor = "green"; 
    } else {
        document.body.style.backgroundColor = "red"; 
    }

    updateScoreboard();

    
    setTimeout(nextQuestion, 2000); 
}

function updateScoreboard() {
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = players.map(player => `<li>${player.name}: ${player.score} points</li>`).join('');
}

function nextQuestion() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
    currentQuestionIndex++; 

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("scoreBoard").classList.add("hidden");
    document.getElementById("resultArea").classList.remove("hidden");

    const highestScore = Math.max(...players.map(player => player.score)); 
    const winners = players.filter(player => player.score === highestScore); 

    if (winners.length > 1) {
        
        const winnerNames = winners.map(winner => winner.name).join(', ');
        document.getElementById("resultText").innerText = `It's a tie between: ${winnerNames} with ${highestScore} points!`;
    } else {
        
        document.getElementById("resultText").innerText = `The winner is ${winners[0].name} with ${winners[0].score} points!`;
    }

    
    triggerConfetti();
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
