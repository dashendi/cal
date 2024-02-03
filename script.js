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