const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrongLetters');
const playAgainBtn = document.getElementById('playAgain');
const popup = document.getElementById('popupContainer');
const notification = document.getElementById('notificationContainer');
const finalMessage = document.getElementById('finalMessage');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// Arrays
const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
	wordEl.innerHTML = `${selectedWord
		.split('')
		.map(
			(letter) =>
				`<span class='letter'>
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>`
		)
		.join('')}`;

	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations!!! You won!';
		popup.style.display = 'flex';
	}
};

// Show Notification
const showNotification = () => {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
};

// Update Wrong Letters Element
const updateWrongLettersEl = () => {
	wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map((letter) => `<span>${letter}</span> `)}
    `;

	figureParts.forEach((part, i) => {
		const errors = wrongLetters.length;

		if (i < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately, you lost!';
		popup.style.display = 'flex';
	}
};

// Event Listner
window.addEventListener('keydown', (e) => {
	if (e.code.includes('Key')) {
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

playAgainBtn.addEventListener('click', () => {
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];
	popup.style.display = 'none';
	displayWord();
	updateWrongLettersEl();
});

displayWord();
