// Ensure that only the character modal is displayed on page load
window.onload = function() {
    document.getElementById('characterModal').style.display = 'block'; // Show character modal
    document.getElementById('opponentModal').style.display = 'none';   // Hide opponent modal
    document.getElementById('equipmentModal').style.display = 'none';  // Hide equipment modal
};

// Show opponent modal
function showOpponentModal() {
    document.getElementById('characterModal').style.display = 'none';
    document.getElementById('opponentModal').style.display = 'block';
}

// Show equipment modal
function showEquipmentModal() {
    document.getElementById('opponentModal').style.display = 'none';
    document.getElementById('equipmentModal').style.display = 'block';
}

const uniqueEquipmentMap = {
    "Cobra": "blade",
    "Spider": "tangle",
    "Orangutan": "fists",
    "Bluejay": "decoy"
};

const genericEquipment = ['surge', 'surge2', 'stealth', 'stealth2', 'smoke', 'smoke2', 'flash', 'flash2']

let selectedCharacter = '';
let selectedOpponents = [];
let selectedEquipment = [];

// Maximum allowed selections
const maxOpponents = 3;
const maxEquipment = 5;

// Function to select a character
function selectCharacter(character, element) {
    // Remove 'selected' class from all character images
    const images = document.querySelectorAll('.character-img');
    images.forEach(img => img.classList.remove('selected'));

    // Add 'selected' class to the clicked image
    element.classList.add('selected');

    // Store the selected character and enable the "Next" button
    selectedCharacter = character;
    document.getElementById('selectedCharacter').value = character;
    document.getElementById('characterNext').disabled = false;

    //Enable agent's unique equipment, and disable others
    const uniqueEquipment = uniqueEquipmentMap[character];
    Object.keys(uniqueEquipmentMap).forEach(char => {
    const uniqueId = 'equip' + char;
    const uniqueElement = document.getElementById(uniqueId);

    if (char === character) {
        uniqueElement.classList.remove('disabled');
        uniqueElement.onclick = () => selectEquipment(uniqueEquipment, uniqueElement);

    } else {
        uniqueElement.classList.add('disabled');
        uniqueElement.onclick = null;
    }
    });
}

// Function to select opponents (up to 3)
function selectOpponent(opponent, element) {
    if (selectedOpponents.includes(opponent)) {
        // Deselect opponent if clicked again
        selectedOpponents = selectedOpponents.filter(op => op !== opponent);
        element.classList.remove('selected');
    } else {
        if (selectedOpponents.length < maxOpponents) {
            // Select the opponent
            selectedOpponents.push(opponent);
            element.classList.add('selected');
        }
    }

    // Enable "Next" button only if 3 opponents are selected
    document.getElementById('selectedOpponent').value = selectedOpponents.join(',');
    const opponentNextButton = document.getElementById('opponentNext');
    opponentNextButton.disabled = selectedOpponents.length !== maxOpponents;
}

// Function to select equipment (up to 5)
function selectEquipment(equipment, element) {
    if (selectedEquipment.includes(equipment)) {
        // Deselect equipment if clicked again
        selectedEquipment = selectedEquipment.filter(eq => eq !== equipment);
        element.classList.remove('selected');
    } else {
        if (selectedEquipment.length < maxEquipment) {
            // Select the equipment
            selectedEquipment.push(equipment);
            element.classList.add('selected');
        }
    }

    // Enable "Start Game" button only if 5 equipment items are selected
    document.getElementById('selectedEquipment').value = selectedEquipment.join(',');
    const equipmentNextButton = document.getElementById('equipmentNext');
    equipmentNextButton.disabled = selectedEquipment.length !== maxEquipment;
}

