const languages = ['Python', 'JavaScript', 'Java', 'C++', 'Ruby',
    'PHP', 'Swift', 'Kotlin', 'HTML', 'CSS', 'SQL', 'Go', 'Rust',
    'TypeScript', 'C#', 'Perl', 'MATLAB', 'R', 'Dart', 'Scala',
    'Haskell', 'Lua', 'Objective-C', 'Shell', 'Groovy', 'Visual Basic',
    'Fortran', 'COBOL', 'Julia', 'Ada'];


const languagesColors = ['blue', 'yellow', 'red', 'green', 'red',
    'purple', 'orange', 'purple', 'orange', 'blue', 'blue', 'skyblue',
    'red', 'blue', 'green', 'darkblue', 'green', 'blue', 'cyan',
    'darkgreen', 'purple', 'teal', 'blue', 'gray', 'brown', 'magenta',
    'yellow', 'pink', 'lightblue', 'tan'];


document.addEventListener('DOMContentLoaded', function () {

    const introContainer = document.getElementById('introDiv');

    const gameContainer = document.getElementById('gameDiv');

    const table = document.getElementById('resultsTable');

    languages.forEach((language, index) => {
        const languageElement = document.createElement('p');

        languageElement.textContent = language;

        languageElement.style.color = 'black';

        languageElement.style.backgroundColor = languagesColors[index];

        introContainer.appendChild(languageElement); // Correctly append to introContainer 
    });

    setTimeout(function () {
        introContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        table.style.display = 'none';


    }, 4000); // Duration in milliseconds (4 seconds) 
});

let trials = 0;

let consecutiveFailures = 0;

let attemptNumber = 1;

let guessedLanguages = new Set();

document.getElementById('submit').onclick = function () {

    const langInput = document.getElementById('language').value;

    const colorInput = document.getElementById('color').value.toLowerCase();

    const resultDiv = document.getElementById('result');

    const submitButton = document.getElementById('submit');

    const resultsTable = document.getElementById('resultsTable').querySelector('tbody');

    const part1 = document.getElementById('correctSound');

    const part2 = document.getElementById('incorrectSound');


    if (guessedLanguages.has(langInput)) {
        resultDiv.textContent = "You have already guessed this programming language. Try another one!";
        resultDiv.style.backgroundColor = "red";
        part2.play();
        return;
    }
    guessedLanguages.add(langInput);

    const index = languages.indexOf(langInput);

    const correctColor = languagesColors[index];

    const row = document.createElement('tr');

    const attemptCell = document.createElement('td');

    attemptCell.textContent = attemptNumber++;

    row.appendChild(attemptCell);

    const languageCell = document.createElement('td');

    languageCell.textContent = langInput;

    if (index !== -1) {

        languageCell.style.backgroundColor = correctColor;

    }
    row.appendChild(languageCell);

    const resultCell = document.createElement('td');

    if (index !== -1 && correctColor === colorInput) {

        resultCell.textContent = '✔'; // Correct guess 

    }
    else {
        resultCell.textContent = '✖'; // Incorrect guess 
    }

    row.appendChild(resultCell);

    resultsTable.appendChild(row);

    if (trials >= 20) {
        resultDiv.textContent = "Game over! You've reached the maximum number of trials.";
        submitButton.disabled = true;
        endGame();
        return;
    }

    if (languages.includes(langInput)) {

        if (correctColor === colorInput) {

            resultDiv.textContent = "Correct! Good job!";
            resultDiv.style.backgroundColor = correctColor;
            resultDiv.style.color = "black";
            consecutiveFailures = 0; // Reset consecutive failures
            part1.play();
        }
        else {
            resultDiv.textContent = "Incorrect! Try again.";
            resultDiv.style.backgroundColor = "red";
            consecutiveFailures++;
            part2.play();
        }
    }
    else {
        resultDiv.textContent = "Invalid programming language!";
        resultDiv.style.backgroundColor = "red";
        consecutiveFailures++;
        part2.play();
    }

    trials++;

    document.getElementById('myForm').addEventListener('submit', function (e) {

        e.preventDefault();

        this.reset();
    }
    ); // Check for game over conditions 

    if (consecutiveFailures >= 5) {
        let score = trials - consecutiveFailures;
        console.log(score);
        resultDiv.textContent = "Game over! You've failed 5 times in a row.\n" + score + "/20";
        submitButton.disabled = true;
        endGame();
    }
    else if (trials >= 20) {
        const score = trials - consecutiveFailures;
        console.log(score);
        resultDiv.textContent = "Game Over, you've reached the maximum number of trials\n" + score + "/20";
        submitButton.disabled = true;
        endGame();

    }
};

function endGame() {
    const reslt = document.getElementById('table');
    const finalScore = trials - consecutiveFailures;
    const gameContainer = document.getElementById('gameDiv');
    const table = document.getElementById('resultsTable');
    gameContainer.style.display = 'none'; // Hide game elements 
    table.style.display = 'block';
    reslt.style.backgroundColor = "red";
    reslt.textContent = "Final Score: " + finalScore + "/20";


}