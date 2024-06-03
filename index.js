
document.addEventListener('DOMContentLoaded', function () {

function loadChar() {
    fetchCharacters('http://localhost:3000/characters')
        .then(function (characters) {
            showCharacterBar(characters);
        })
        .catch(function (error) {
            console.error('Error loading:', error);
        });
}

function fetchCharacters() {
    return fetch('http://localhost:3000/characters')
        .then(function (response) {
            return response.json();
        });
}

function showCharacterBar(characters) {
    const characterBar = document.getElementById('character-bar');
    characterBar.innerHTML = '';
    characters.forEach(function (character) {
        const characterSpan = createCharacterSpan(character);
        characterBar.appendChild(characterSpan);
    });
}

function createCharacterSpan(character) {
    const div = document.createElement('span');
    div.textContent = character.name;
    div.addEventListener('click', function () {
        displayCharacterDetails(character);
    });
    return div;
}

function displayCharacterDetails(character) {
    const detailedInfo = document.getElementById('detailed-info');
    detailedInfo.innerHTML = `
        <p id="name">${character.name}</p>
        <img
            id="image"
            src="${character.image}"
            alt="${character.name}"
        />
        <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
        <form id="votes-form">
            <input type="number" placeholder="Enter Votes" id="votes" name="votes" />
            <input type="submit" value="Add Votes" />
        </form>
        <button id="reset-btn">Reset Votes</button>
    `;

    const votesForm = document.getElementById('votes-form');
    votesForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        submitVotes(character);
    });

    // const resetButton = document.getElementById('reset-btn');
    // resetButton.addEventListener('reset', function () {
    //     // Implement logic to reset votes
    //    resetVotes(votes)
    // });
}

function submitVotes(character) {
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value);
    if (!isNaN(votes)) {
        updateCharacterVotes(character.id, votes)
            .then(function (updatedCharacter) {
                document.getElementById('vote-count').textContent = updatedCharacter.votes;
                console.log('Votes submitted:', votes);
            })
            .catch(function (error) {
                console.error('Error submitting votes:', error);
            });
    }
}

function updateCharacterVotes(characterId, votes) {
    return fetch(`http://localhost:3000/characters/${characterId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ votes: votes }),
    })
    
}
loadChar();
});


