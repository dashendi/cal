document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", setupColorSelection);

    const finishGameBtn = document.getElementById("finishGameBtn");
    finishGameBtn.addEventListener("click", finishGame);
});

let numPlayers;
let chosenColors = [];

function setupColorSelection() {
    numPlayers = parseInt(document.getElementById("players").value);
    if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
        alert("Please enter a valid number of players (1-6).");
        return;
    }

    const colorOptionsTable = document.getElementById("colorOptions");
    colorOptionsTable.innerHTML = ""; // Clear previous color options if any

    // Create table headers
    const headerRow = document.createElement("tr");
    const playerHeader = document.createElement("th");
    playerHeader.textContent = "Player";
    headerRow.appendChild(playerHeader);
    const colorHeader = document.createElement("th");
    colorHeader.textContent = "Available Colors";
    headerRow.appendChild(colorHeader);
    colorOptionsTable.appendChild(headerRow);

    // Create table rows for each player
    for (let i = 1; i <= numPlayers; i++) {
        const playerRow = document.createElement("tr");

        const playerNameCell = document.createElement("td");
        playerNameCell.textContent = `Player ${i}`;
        playerRow.appendChild(playerNameCell);

        const colorSelectCell = document.createElement("td");
        const colorSelect = document.createElement("select");
        colorSelect.setAttribute("id", `player${i}Color`);
        const availableColors = getAvailableColors();
        availableColors.forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            colorSelect.appendChild(option);
        });
        colorSelectCell.appendChild(colorSelect);
        playerRow.appendChild(colorSelectCell);

        colorOptionsTable.appendChild(playerRow);
    }

    document.getElementById("colorInputs").style.display = "block";
}

function getAvailableColors() {
    const colors = ["black", "white", "blue", "yellow", "pink", "green"];
    return colors.filter(color => !chosenColors.includes(color));
}

document.getElementById("colorSubmitBtn").addEventListener("click", function() {
    for (let i = 1; i <= numPlayers; i++) {
        const colorSelect = document.getElementById(`player${i}Color`);
        const color = colorSelect.value;
        chosenColors.push(color);
    }
    createScoreboard();
});

function createScoreboard() {
    const scoreboardDiv = document.getElementById("scoreboard");
    scoreboardDiv.innerHTML = ""; // Clear previous scoreboard if any

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table headers
    const headers = ["Players", "Score", "Total Points"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows for each player
    for (let i = 1; i <= numPlayers; i++) {
        const playerRow = document.createElement("tr");
        const playerName = document.createElement("td");
        playerName.textContent = `Player ${i}`;
        playerName.classList.add(`player-${i}`); // Add class for color change
        playerRow.appendChild(playerName);

        const playerScore = document.createElement("td");
        const scoreInput = document.createElement("input");
        scoreInput.type = "text"; // Allow mathematical expressions
        scoreInput.className = "score-input";
        scoreInput.addEventListener("input", updateTotalPoints);
        playerScore.appendChild(scoreInput);
        playerRow.appendChild(playerScore);

        const totalPoints = document.createElement("td");
        totalPoints.textContent = "0";
        playerRow.appendChild(totalPoints);

        tbody.appendChild(playerRow);
    }

    table.appendChild(tbody);
    scoreboardDiv.appendChild(table);

    // Change player number color based on chosen colors
    chosenColors.forEach((color, index) => {
        const playerNumberCells = document.querySelectorAll(`.player-${index + 1}`);
        playerNumberCells.forEach(cell => {
            cell.style.color = color;
        });
    });

    // Update color options to remove chosen colors
    updateColorOptions();
}

function updateColorOptions() {
    const colorSelects = document.querySelectorAll("select");
    colorSelects.forEach(select => {
        const options = select.querySelectorAll("option");
        options.forEach(option => {
            if (chosenColors.includes(option.value)) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });
}

function updateTotalPoints(event) {
    const input = event.target;
    const playerRow = input.parentElement.parentElement;
    const scoreCells = playerRow.getElementsByTagName("td");
    const totalPointsCell = scoreCells[2];

    const expression = input.value;
    let totalPoints;
    try {
        totalPoints = eval(expression);
        if (isNaN(totalPoints)) {
            totalPoints = 0; // Set total points to 0 if expression is invalid
        }
    } catch (error) {
        totalPoints = 0; // Set total points to 0 if there is an error in evaluation
    }

    totalPointsCell.textContent = totalPoints;
}

function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerName = player.querySelector("td:first-child").textContent;
        const totalPoints = parseInt(player.querySelector("td:last-child").textContent);

        if (totalPoints > maxPoints) {
            maxPoints = totalPoints;
            maxPlayer = playerName;
        }
    });

    const finishMessage = document.createElement("p");
    finishMessage.textContent = `Congratulations to ${maxPlayer} for being the player with the most total points!`;

    const balloonImage = document.createElement("img");
    balloonImage.src = "https://www.pngkit.com/png/full/225-2253191_balloon-gold-golden-balloons-transparent-background.png";
    balloonImage.alt = "balloon";
    balloonImage.style.width = "100px";
    balloonImage.style.height = "100px";

    scoreboardDiv.appendChild(finishMessage);
    scoreboardDiv.appendChild(balloonImage);
}
function setupColorSelection() {
    numPlayers = parseInt(document.getElementById("players").value);
    if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
        alert("Please enter a valid number of players (1-6).");
        return;
    }

    const colorOptionsTable = document.getElementById("colorOptions");
    colorOptionsTable.innerHTML = ""; // Clear previous color options if any

    // Create table headers
    const headerRow = document.createElement("tr");
    const playerHeader = document.createElement("th");
    playerHeader.textContent = "Player";
    headerRow.appendChild(playerHeader);
    const colorHeader = document.createElement("th");
    colorHeader.textContent = "Available Colors";
    headerRow.appendChild(colorHeader);
    colorOptionsTable.appendChild(headerRow);

    // Create table rows for each player
    for (let i = 1; i <= numPlayers; i++) {
        const playerRow = document.createElement("tr");

        const playerNameCell = document.createElement("td");
        playerNameCell.textContent = `Player ${i}`;
        playerRow.appendChild(playerNameCell);

        const colorSelectCell = document.createElement("td");
        const colorSelect = document.createElement("select");
        colorSelect.setAttribute("id", `player${i}Color`);
        const availableColors = getAvailableColors();
        availableColors.forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            colorSelect.appendChild(option);
        });
        colorSelect.addEventListener("change", function() {
            const selectedColor = this.value;
            const allSelects = document.querySelectorAll("select");
            allSelects.forEach(select => {
                if (select !== this) {
                    const options = select.querySelectorAll("option");
                    options.forEach(option => {
                        if (option.value === selectedColor) {
                            option.remove();
                        }
                    });
                }
            });
        });
        colorSelectCell.appendChild(colorSelect);
        playerRow.appendChild(colorSelectCell);

        colorOptionsTable.appendChild(playerRow);
    }

    document.getElementById("colorInputs").style.display = "block";
}
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');
    container.classList.add('show'); // Add 'show' class to trigger opacity transition
});
document.getElementById("colorSubmitBtn").addEventListener("click", function() {
    // Your existing code for creating the scoreboard goes here...

    // Create the "keda khalsna" button
    const kedaKhalsnaBtn = document.createElement("button");
    kedaKhalsnaBtn.textContent = "Keda Khalsna";
    kedaKhalsnaBtn.id = "kedaKhalsnaBtn";
    kedaKhalsnaBtn.addEventListener("click", finishGame);

    // Append the button to the scoreboard container
    const scoreboardContainer = document.getElementById("scoreboard-container");
    scoreboardContainer.appendChild(kedaKhalsnaBtn);
});

function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerName = player.querySelector("td:first-child").textContent;
        const totalPoints = parseInt(player.querySelector("td:last-child").textContent);

        if (totalPoints > maxPoints) {
            maxPoints = totalPoints;
            maxPlayer = playerName;
        }
    });

    alert(`Congratulations to ${maxPlayer} for having the highest total score of ${maxPoints} points!`);
}
function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    if (players.length === 0) {
        alert("No players available to finish the game.");
        return;
    }

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerNameCell = player.querySelector("td:first-child");
        const totalPointsCell = player.querySelector("td:last-child");

        if (playerNameCell && totalPointsCell) {
            const playerName = playerNameCell.textContent;
            const totalPoints = parseInt(totalPointsCell.textContent);

            if (!isNaN(totalPoints) && totalPoints > maxPoints) {
                maxPoints = totalPoints;
                maxPlayer = playerName;
            }
        }
    });

    if (maxPlayer !== null) {
        alert(`Congratulations to ${maxPlayer} for having the highest total score of ${maxPoints} points!`);
    } else {
        alert("No valid players found to finish the game.");
    }
}
function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    if (players.length === 0) {
        alert("No players found. Please add players and try again.");
        return;
    }

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerName = player.querySelector("td:first-child").textContent;
        const totalPoints = parseInt(player.querySelector("td:last-child").textContent);

        if (totalPoints > maxPoints) {
            maxPoints = totalPoints;
            maxPlayer = playerName;
        }
    });

    // Create a cheerful congratulatory message with confetti animation
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.innerHTML = `<p>Congratulations to ${maxPlayer}!</p><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/party-popper_1f389.png" alt="party-popper">`;

    // Append the confetti message to the scoreboard container
    const scoreboardContainer = document.getElementById("scoreboard-container");
    scoreboardContainer.appendChild(confetti);

    // Remove the confetti message after 5 seconds
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}
function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    if (players.length === 0) {
        alert("No players found. Please add players and try again.");
        return;
    }

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerName = player.querySelector("td:first-child");
        const totalPoints = player.querySelector("td:last-child");

        if (playerName && totalPoints) {
            const playerNameText = playerName.textContent;
            const totalPointsValue = parseInt(totalPoints.textContent);

            if (!isNaN(totalPointsValue) && totalPointsValue > maxPoints) {
                maxPoints = totalPointsValue;
                maxPlayer = playerNameText;
            }
        }
    });

    if (maxPlayer !== null) {
        // Create a cheerful congratulatory message with confetti animation
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.innerHTML = `<p>Congratulations to ${maxPlayer}!</p><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/party-popper_1f389.png" alt="party-popper">`;

        // Append the confetti message to the scoreboard container
        const scoreboardContainer = document.getElementById("scoreboard-container");
        scoreboardContainer.appendChild(confetti);

        // Remove the confetti message after 5 seconds
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    } else {
        alert("No players found with valid scores.");
    }
}
function createScoreboard() {
    const scoreboardDiv = document.getElementById("scoreboard");
    scoreboardDiv.innerHTML = ""; // Clear previous scoreboard if any

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table headers
    const headers = ["Players", "Score", "Total Points", "Reached Ebn El-Sherka Point"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows for each player
    for (let i = 1; i <= numPlayers; i++) {
        const playerRow = document.createElement("tr");

        // Player name cell
        const playerName = document.createElement("td");
        playerName.textContent = `Player ${i}`;
        playerRow.appendChild(playerName);

        // Score input cell
        const playerScore = document.createElement("td");
        const scoreInput = document.createElement("input");
        scoreInput.type = "text"; // Allow mathematical expressions
        scoreInput.className = "score-input";
        scoreInput.addEventListener("input", updateTotalPoints);
        playerScore.appendChild(scoreInput);
        playerRow.appendChild(playerScore);

        // Total points cell
        const totalPoints = document.createElement("td");
        totalPoints.textContent = "0";
        playerRow.appendChild(totalPoints);

        // Checkbox for "Reached Ebn El-Sherka Point"
        const ebnElSherkaCheckboxCell = document.createElement("td");
        const ebnElSherkaCheckbox = document.createElement("input");
        ebnElSherkaCheckbox.type = "checkbox";
        ebnElSherkaCheckboxCell.appendChild(ebnElSherkaCheckbox);
        playerRow.appendChild(ebnElSherkaCheckboxCell);

        tbody.appendChild(playerRow);
    }

    table.appendChild(tbody);
    scoreboardDiv.appendChild(table);

    // Change player number color based on chosen colors
    chosenColors.forEach((color, index) => {
        const playerNumberCells = document.querySelectorAll(`.player-${index + 1}`);
        playerNumberCells.forEach(cell => {
            cell.style.color = color;
        });
    });

    // Update color options to remove chosen colors
    updateColorOptions();
}
function createScoreboard() {
    const scoreboardDiv = document.getElementById("scoreboard");
    scoreboardDiv.innerHTML = ""; // Clear previous scoreboard if any

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table headers
    const headers = ["Players", "Score", "Total Points", "Reached Ebn El-Sherka Point"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows for each player
    for (let i = 1; i <= numPlayers; i++) {
        const playerRow = document.createElement("tr");

        // Player name cell
        const playerName = document.createElement("td");
        playerName.textContent = `Player ${i}`;
        playerName.classList.add(`player-${i}`); // Add class for color change
        playerRow.appendChild(playerName);

        // Score input cell
        const playerScore = document.createElement("td");
        const scoreInput = document.createElement("input");
        scoreInput.type = "text"; // Allow mathematical expressions
        scoreInput.className = "score-input";
        scoreInput.addEventListener("input", updateTotalPoints);
        playerScore.appendChild(scoreInput);
        playerRow.appendChild(playerScore);

        // Total points cell
        const totalPoints = document.createElement("td");
        totalPoints.textContent = "0";
        playerRow.appendChild(totalPoints);

        // Checkbox for "Reached Ebn El-Sherka Point"
        const ebnElSherkaCheckboxCell = document.createElement("td");
        const ebnElSherkaCheckbox = document.createElement("input");
        ebnElSherkaCheckbox.type = "checkbox";
        ebnElSherkaCheckboxCell.appendChild(ebnElSherkaCheckbox);
        playerRow.appendChild(ebnElSherkaCheckboxCell);

        tbody.appendChild(playerRow);
    }

    table.appendChild(tbody);
    scoreboardDiv.appendChild(table);

    // Change player number color based on chosen colors
    chosenColors.forEach((color, index) => {
        const playerNumberCells = document.querySelectorAll(`.player-${index + 1}`);
        playerNumberCells.forEach(cell => {
            cell.style.color = color;
        });
    });

    // Update color options to remove chosen colors
    updateColorOptions();

    // Append the button to the scoreboard container
    const scoreboardContainer = document.getElementById("scoreboard-container");
    scoreboardContainer.appendChild(kedaKhalsnaBtn);
}
function finishGame() {
    const scoreboardDiv = document.getElementById("scoreboard");
    const players = scoreboardDiv.querySelectorAll("tr");

    let maxPoints = -Infinity;
    let maxPlayer = null;

    players.forEach(player => {
        const playerName = player.querySelector("td:first-child").textContent;
        const totalPoints = parseInt(player.querySelector("td:nth-child(3)").textContent);

        if (totalPoints > maxPoints) {
            maxPoints = totalPoints;
            maxPlayer = playerName;
        }
    });

    const finishMessage = document.createElement("p");
    finishMessage.textContent = `Congratulations to ${maxPlayer} for being the player with the most total points!`;

    const ebnElSherkaCheckbox = document.querySelector(`#scoreboard input[type="checkbox"]:checked`);
    if (ebnElSherkaCheckbox) {
        ebnElSherkaCheckbox.checked = false; // Uncheck previously checked checkbox
    }
    const maxPlayerRow = [...players].find(player => player.querySelector("td:first-child").textContent === maxPlayer);
    if (maxPlayerRow) {
        const ebnElSherkaCheckbox = maxPlayerRow.querySelector("td:last-child input[type='checkbox']");
        ebnElSherkaCheckbox.checked = true; // Check checkbox for the player with the highest score
    }

    alert(finishMessage.textContent);
}
function showFinishButton() {
    const finishGameBtn = document.createElement("button");
    finishGameBtn.textContent = "Keda Khalsna";
    finishGameBtn.id = "finishGameBtn";
    finishGameBtn.addEventListener("click", finishGame);

    const scoreboardContainer = document.getElementById("scoreboard-container");
    scoreboardContainer.appendChild(finishGameBtn);
}
function finishGame() {
    // Find the player with the highest total points and has checked the checkbox
    const players = document.querySelectorAll("#scoreboard tbody tr");
    let maxPoints = -Infinity;
    let maxPlayer = null;
    players.forEach(player => {
        const playerName = player.querySelector("td:first-child").textContent;
        const totalPoints = parseInt(player.querySelector("td:nth-child(3)").textContent);
        const checkbox = player.querySelector("td:nth-child(4) input[type='checkbox']");
        if (checkbox.checked && totalPoints > maxPoints) {
            maxPoints = totalPoints;
            maxPlayer = playerName;
        }
    });

    // If a player is found with the highest total points and has checked the checkbox, display the congratulatory message
    if (maxPlayer) {
        alert(`Congratulations to ${maxPlayer} for reaching the highest total points of ${maxPoints} points and reaching Ebn El-Sherka point!`);
    } else {
        // If no valid player is found, display a message indicating no winner
        alert("No player has reached the Ebn El-Sherka point.");
    }

    // Remove the "Keda Khalsna" button
    const finishGameBtn = document.getElementById("finishGameBtn");
    if (finishGameBtn) {
        finishGameBtn.remove();
    }
}
// After creating the scoreboard table
document.getElementById("scoreboard-container").style.display = "block";
document.getElementById("finishGameBtn").style.display = "block";
// After creating the scoreboard table
document.getElementById("scoreboard-container").style.display = "block";

// Create the "Keda Khalsna" button
const finishGameBtn = document.createElement("button");
finishGameBtn.id = "finishGameBtn";
finishGameBtn.textContent = "Keda Khalsna";
finishGameBtn.style.display = "none"; // Initially hide the button

// Append the button to the container
const container = document.querySelector('.container');
container.appendChild(finishGameBtn);

// Show the button
finishGameBtn.style.display = "block";
// After creating the scoreboard table
document.getElementById("scoreboard-container").style.display = "block";