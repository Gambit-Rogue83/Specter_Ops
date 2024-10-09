let currentTurn = 1; // Track the current turn number
let playerPosition = null; // Track player's current position (starting is null)
const maxTurns = 40; // Total number of turns
const maxMovement = 4; // Maximum movement distance
let objectivesClaimed = 0; // Track how many objectives have been claimed
let activeObjectives = []; // Store active objective coordinates
let impassableSpaces = [
    'A2', 'A4', 'A9', 'A14', 'A17', 'A21', 'A22', 'A27', 'A28', 'B6', 'B11', 'B12', 'B19', 'B25', 'B30', 'B32', 'C1', 'C3',
    'C4', 'C6', 'C9', 'C14', 'C17', 'C21', 'C22', 'C25', 'C26', 'C28', 'C32', 'D3', 'D9', 'D10', 'D12', 'D19', 'D30', 'E1',
    'E5', 'E6', 'E14', 'E17', 'E21', 'E22', 'E25', 'E27', 'E29', 'E30', 'E32', 'F3', 'F9', 'F11', 'F13', 'F14', 'F19', 'F22',
    'F25', 'G1', 'G5', 'G6', 'G14', 'G17', 'G19', 'G20', 'G27', 'G29', 'G31', 'G32', 'H3', 'H6', 'H9', 'H10', 'H12', 'H22',
    'H25', 'I1', 'I3', 'I4', 'I9', 'I14', 'I17', 'I18', 'I20', 'I22', 'I25', 'I27', 'I28', 'I30', 'I32', 'J6', 'J11', 'J12',
    'J14', 'K1', 'K2', 'K4', 'K9', 'K11', 'K12', 'L6', 'L14', 'L17', 'L18', 'L20', 'L23', 'L24', 'L26', 'L27', 'L29', 'L30',
    'L32', 'M2', 'M3', 'M5', 'M6', 'M9', 'M11', 'M13', 'M14', 'M27', 'N17', 'N19', 'N20', 'N23', 'N25', 'N29', 'N31', 'O20',
    'O25', 'O26', 'O28', 'O29', 'P2', 'P3', 'P5', 'P7', 'P9', 'P11', 'P14', 'P16', 'P18', 'P23', 'P31', 'P32', 'Q2', 'Q11',
    'Q14', 'Q16', 'Q20', 'Q25', 'Q27', 'Q29', 'R4', 'R6', 'R7', 'R9', 'R18', 'R23', 'R31', 'S1', 'S2', 'S6', 'S11', 'S14',
    'S15', 'S16', 'S20', 'S23', 'S24', 'S26', 'S27', 'S29', 'T1', 'T4', 'T8', 'T10', 'T11', 'T16', 'T18', 'T27', 'T29',
    'T31', 'T32', 'U1', 'U2', 'U6', 'U8', 'U14', 'U20', 'U23', 'U25', 'V1', 'V2', 'V4', 'V6', 'V10', 'V11', 'V16', 'V18',
    'V23', 'V27', 'V28', 'V30', 'V32', 'W1', 'W4', 'W8', 'W14', 'W20', 'W25'
];
let exitSpaces = ["H1", "N1", "A3", "W3"];

// Initialize the grid with impassable spaces and objectives
function initializeBoard() {
    // Add impassable spaces
    impassableSpaces.forEach(space => {
        let cell = document.querySelector(`.grid-cell[data-coord="${space}"]`);
        if (cell) {
            cell.classList.add("impassable");
        }
    });

    // Randomly select objectives
    activeObjectives = [
        randomSelect(["B19", "C17", "D19", "C14", "F11", "H12"]),
        randomSelect(["B30", "C28", "E27", "G27", "G29", "I30"]),
        randomSelect(["N31", "Q25", "Q29", "R31", "U25", "V30"]),
        randomSelect(["P18", "R18", "T18", "V18", "V16", "U14"])
    ];

    // Add objectives to the grid
    activeObjectives.forEach(obj => {
        let cell = document.querySelector(`.grid-cell[data-coord="${obj}"]`);
        if (cell) {
            cell.classList.add("objective");
            cell.setAttribute("onclick", `handleObjectiveClick('${obj}')`);
        }
    });

    // Initialize exit spaces
    exitSpaces.forEach(space => {
        let cell = document.querySelector(`.grid-cell[data-coord="${space}"]`);
        if (cell) {
            cell.classList.add("exit");
        }
    });
}

// Randomly select an objective from a group
function randomSelect(group) {
    const index = Math.floor(Math.random() * group.length);
    return group[index];
}

// Handle player clicking on a grid space
function handleMoveClick(coord) {
    let cell = document.querySelector(`.grid-cell[data-coord="${coord}"]`);
    if (currentTurn > maxTurns) {
        document.getElementById('game-status').textContent = "Game Over!";
        return; // Game Over after maxTurns
    }

    if (cell.classList.contains("impassable")) {
        alert("You cannot move to this space.");
        return; // Cannot move to impassable spaces
    }

    if (cell.classList.contains("objective")) {
        handleObjectiveClick(coord); // Allow clicking on objective spaces
        return; // Cannot move to objective spaces directly
    }

    // Validate movement logic and move the player
    const distance = calculateDistance(playerPosition, coord);
    if (distance <= maxMovement) {
        movePlayerTo(coord);
    } else {
        alert(`You can only move ${maxMovement} spaces!`);
    }
}

function handleObjectiveClick(coord) {
    const distance = calculateDistance(playerPosition, coord);
    const isBluejay = false; // Set true if Bluejay
    if (distance === 1 || (isBluejay && distance <= 2)) {
        claimObjective(coord);
    } else {
        alert("You must be adjacent to claim this objective!");
    }
}

function claimObjective(coord) {
    let cell = document.querySelector(`.grid-cell[data-coord="${coord}"]`);
    cell.classList.remove("objective");
    cell.classList.add("impassable"); // After claiming, it becomes impassable
    objectivesClaimed += 1;

    if (objectivesClaimed === 3) {
        activateExitSpaces();
    }
}

function activateExitSpaces() {
    exitSpaces.forEach(space => {
        let cell = document.querySelector(`.grid-cell[data-coord="${space}"]`);
        if (cell) {
            cell.classList.add("exit-active");
            cell.setAttribute("onclick", "checkWinCondition()");
        }
    });
}

function checkWinCondition() {
    if (objectivesClaimed === 3) {
        alert("YOU WIN!");
        document.getElementById('game-status').textContent = "YOU WIN!";
    }
}

// Calculate distance based on the largest of horizontal or vertical moves
function calculateDistance(pos1, pos2) {
    if (!pos1) return 0; // First move can go anywhere
    const x1 = pos1.charCodeAt(0) - 65; // Convert letter to index
    const y1 = parseInt(pos1.substring(1));
    const x2 = pos2.charCodeAt(0) - 65;
    const y2 = parseInt(pos2.substring(1));
    return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)); // Max distance
}

function movePlayerTo(newPosition) {
    // Update the player's position
    playerPosition = newPosition;

    // Update the movement log with the new position
    const locElement = document.getElementById(`loc-${currentTurn}`);
    if (locElement) {
        locElement.textContent = newPosition
    }


    // Update the player's mini-icon position
    updatePlayerIcon(newPosition);

    // Hunter A.I. logic (placeholder for now)
    handleHunterAI(newPosition);

    // Proceed to the next turn
    currentTurn += 1;
}

function updatePlayerIcon(newPosition) {
    // Find cell for new position
    const newCell = document.querySelector(`.grid-cell[data-coord="${newPosition}"]`);
    const playerIcon = document.querySelector('#character-icon'); // Make sure it's using ID selector
    if (newCell && playerIcon) {
        newCell.appendChild(playerIcon);
    }
}

function handleHunterAI(playerPosition) {
    // Implement your hunter A.I. response here based on the player's position
    console.log(`Hunters react to the player's new position at ${playerPosition}`);
}

function activateEquipment(itemName) {
    console.log(`Activating ${itemName}`);
    // Find the corresponding agent and item, and activate it
    // Assuming `agent` is the current agent object
    agent.activateItem(itemName);

    // Update the inventory display if the item uses are consumed
    updateInventory();
}

function updateInventory() {
    // Use this to update the HTML to reflect the remaining uses
    const inventoryElements = document.querySelectorAll('.equipment-card');
    inventoryElements.forEach(element => {
        const itemName = element.getAttribute('onclick').match(/'([^']+)'/)[1];
        const item = agent.inventory.find(i => i.name === itemName);
        if (item.uses === 0) {
            element.classList.add('disabled');
        }
    });
}

function magnifyCard(card) {
    card.classList.add('magnify');
}

// Call initializeBoard when the game starts
initializeBoard();



//
//STREET (VERTICAL)
//N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, N11, N12, N13, N14, N15
//O1, O2, O3, O4, O5, O6, O7, O8, O9, O10, O11, O12, O13, O14, O15
//J16, J17, J18, J19, J20, J21, J22, J23, J24, J25, J26, J27, J28, J29, J30, J31, J32
//K16, K17, K18, K19, K20, K21, K22, K23, K24, K25, K26, K27, K28, K29, K30, K31, K32
//(HORIZONTAL)
//A7, B7, C7, D7, E7, F7, G7, H7, I7, J7, K7, L7, M7, N7
//A8, B8, C8, D8, E8, F8, G8, H8, I8, J8, K8, L8, M8, N8
//O12, P12, Q12, R12, S12, T12, U12, V12, W12
//O13, P13, Q13, R13, S13, T13, U13, V13, W13
//A15, B15, C15, D15, E15, F15, G15, H15, I15, J15, K15, L15, M15
//A16, B16, C16, D16, E16, F16, G16, H16, I16, J16, K16, L16, M16
//K21, L21, M21, N21, O21, P21, Q21, R21, S21, T21, U21, V21, W21
//K22, L22, M22, N22, O22, P22, Q22, R22, S22, T22, U22, V22, W22
//A23, B23, C23, D23, E23, F23, G23, H23, I23, J23
//A24, B24, C24, D24, E24, F24, G24, H24, I24, J24


