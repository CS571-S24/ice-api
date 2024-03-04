// GPT-4 for randomness & generation

import fs from 'fs'

// Function to generate a random number within a given range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate the password
function generatePassword() {
    const adjectives = ["easy", "quick", "clean", "sharp", "light"];
    const nouns = ["button", "icon", "menu", "form", "card", "font"];

    const adjective = adjectives[getRandomNumber(0, adjectives.length - 1)];
    const noun = nouns[getRandomNumber(0, nouns.length - 1)];
    const number = getRandomNumber(10, 99); // Generate a number between 100 and 999
    return `${adjective}${noun}${number}`;
}

// Function to generate the username
function generateUsername() {
    const adjectives = ["diligent", "curious", "motivated", "resourceful", "persistent", "creative", "enthusiastic", "insightful"];
    const nouns = ["blugold", "phoenix", "eagle", "badger", "panther", "titan", "ranger", "pioneer", "falcon", "pointer", "warhawk"];

    const adjective = adjectives[getRandomNumber(0, adjectives.length - 1)];
    const noun = nouns[getRandomNumber(0, nouns.length - 1)];
    const number = getRandomNumber(1000, 9999); // Generate a number between 1000 and 9999
    return `${adjective}_${noun}${number}`;
}

function genCombos() {
    return fs.readFileSync('emails.secret')
        .toString()
        .split(/\r?\n/g)
        .map(e => {
            return {
                email: e.trim(),
                username: generateUsername(),
                password: generatePassword()
            }
        });
}

function isAllUnique(cbs) {
    return [...new Set(cbs.map(c => c.username))].length === cbs.length;
}

let combos = genCombos();

while(!isAllUnique(combos)) {
    combos = genCombos();
}

fs.writeFileSync(
    'passwords.emailable.secret',
    "email,username,password\n" + combos
        .map(c => `${c.email},${c.username},${c.password}`)
        .join('\n')
);

fs.writeFileSync(
    'passwords.secret',
    JSON.stringify([...combos.map(c => {
        return {
            username: c.username,
            password: c.password
        }
    }), {
        username: "bucky",
        password: "badger"
    }], null, 2)
);
