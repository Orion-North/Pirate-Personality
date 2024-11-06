// Pirate-Themed Questions and Roles
let questions = [
    {
        "text": "Would ye rather sail through a raging storm or navigate treacherous reefs?",
        "optionA": "Sail through a raging storm",
        "optionB": "Navigate treacherous reefs",
        "roleA": "Captain",
        "roleB": "Navigator"
    },
    {
        "text": "Would ye rather hunt for buried treasure or capture a rival ship?",
        "optionA": "Hunt for buried treasure",
        "optionB": "Capture a rival ship",
        "roleA": "Quartermaster",
        "roleB": "Gunner"
    },
    {
        "text": "Would ye rather parley with enemies or fight to the end?",
        "optionA": "Parley with enemies",
        "optionB": "Fight to the end",
        "roleA": "First Mate",
        "roleB": "Gunner"
    },
    {
        "text": "Would ye rather explore uncharted islands or map the stars?",
        "optionA": "Explore uncharted islands",
        "optionB": "Map the stars",
        "roleA": "Quartermaster",
        "roleB": "Navigator"
    },
    {
        "text": "Would ye rather lead the crew or be a trusted advisor?",
        "optionA": "Lead the crew",
        "optionB": "Be a trusted advisor",
        "roleA": "Captain",
        "roleB": "First Mate"
    },
    {
        "text": "Would ye rather sing sea shanties or tell tall tales?",
        "optionA": "Sing sea shanties",
        "optionB": "Tell tall tales",
        "roleA": "First Mate",
        "roleB": "Quartermaster"
    },
    {
        "text": "Would ye rather have a sharp sword or an accurate pistol?",
        "optionA": "Sharp sword",
        "optionB": "Accurate pistol",
        "roleA": "Gunner",
        "roleB": "Captain"
    },
    {
        "text": "Would ye rather decipher ancient maps or learn new languages?",
        "optionA": "Decipher ancient maps",
        "optionB": "Learn new languages",
        "roleA": "Navigator",
        "roleB": "Quartermaster"
    },
    {
        "text": "Would ye rather protect the ship's secrets or share stories with the crew?",
        "optionA": "Protect the ship's secrets",
        "optionB": "Share stories with the crew",
        "roleA": "Captain",
        "roleB": "First Mate"
    },
    {
        "text": "Would ye rather face a sea monster or a naval fleet?",
        "optionA": "Sea monster",
        "optionB": "Naval fleet",
        "roleA": "Gunner",
        "roleB": "Captain"
    }
];

let currentQuestionIndex = 0;
let roleScores = {
    "Captain": 0,
    "Navigator": 0,
    "Gunner": 0,
    "Quartermaster": 0,
    "First Mate": 0
};
const totalQuestions = 10; // Number of questions per game

// Role descriptions
const roleDescriptions = {
    "Captain": "Yer a natural leader, commanding respect and steering the ship through any storm.",
    "Navigator": "Ye have a keen mind and a knack for finding the best course through uncharted waters.",
    "Gunner": "Brave and bold, ye face danger head-on and defend the ship with skill.",
    "Quartermaster": "Organized and resourceful, ye keep the crew in line and the ship well-stocked.",
    "First Mate": "Loyal and dependable, ye're the Captain's right hand and the crew's confidant."
};

// Start the game
loadQuestion();

// Load the current question
function loadQuestion() {
    if (questions.length === 0) return;

    // Update progress
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.text;

    // Update options
    document.getElementById("optionA").innerHTML = `<i class="fas fa-anchor"></i> ${question.optionA}`;
    document.getElementById("optionB").innerHTML = `<i class="fas fa-skull-crossbones"></i> ${question.optionB}`;

    // Enable option buttons
    document.getElementById("optionA").disabled = false;
    document.getElementById("optionB").disabled = false;

    // Remove selection highlight
    document.getElementById("optionA").classList.remove("selected");
    document.getElementById("optionB").classList.remove("selected");

    // Disable "Next Question" button
    document.getElementById("next-button").disabled = true;
}

// Handle option selection
function chooseOption(option) {
    // Disable option buttons
    document.getElementById("optionA").disabled = true;
    document.getElementById("optionB").disabled = true;

    const question = questions[currentQuestionIndex];

    // Update role scores
    let selectedRole = option === 'A' ? question.roleA : question.roleB;
    roleScores[selectedRole]++;

    // Highlight the selected option
    if (option === 'A') {
        document.getElementById("optionA").classList.add("selected");
    } else {
        document.getElementById("optionB").classList.add("selected");
    }

    // Enable "Next Question" button
    document.getElementById("next-button").disabled = false;
}

// Load next question or show result
function nextQuestion() {
    if (currentQuestionIndex + 1 >= totalQuestions) {
        showResult();
        return;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadQuestion();
}

// Display result based on role scores
function showResult() {
    document.getElementById("question-container").style.display = 'none';
    document.getElementById("result-container").style.display = 'block';

    // Determine the role with the highest score
    let topRole = "";
    let maxScore = 0;
    for (let role in roleScores) {
        if (roleScores[role] > maxScore) {
            maxScore = roleScores[role];
            topRole = role;
        }
    }

    // Get the role description
    const resultDescription = roleDescriptions[topRole] || "Ye have a unique set of skills that make ye a valuable crew member.";

    // Display the result
    document.getElementById("result-description").innerText = `Yer pirate role is: ${topRole}!\n\n${resultDescription}`;
}

// Restart the game
function restartGame() {
    currentQuestionIndex = 0;
    roleScores = {
        "Captain": 0,
        "Navigator": 0,
        "Gunner": 0,
        "Quartermaster": 0,
        "First Mate": 0
    };
    document.getElementById("result-container").style.display = 'none';
    document.getElementById("question-container").style.display = 'block';
    loadQuestion();
}
