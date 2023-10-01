function encryptCaesar() {
    const shift = parseInt(document.getElementById("shift").value);
    const inputCaesar = document.getElementById("inputCaesar").value;
    const outputCaesar = document.getElementById("outputCaesar");
    outputCaesar.innerText = caesarCipher(inputCaesar, shift);
}

function decryptCaesar() {
    const shift = parseInt(document.getElementById("shift").value);
    const inputCaesar = document.getElementById("inputCaesar").value;
    const outputCaesar = document.getElementById("outputCaesar");
    outputCaesar.innerText = caesarCipher(inputCaesar, -shift);
}

function encryptRail() {
    const rail = parseInt(document.getElementById("rails").value);
    const inputRail = document.getElementById("inputRail").value;
    const outputRail = document.getElementById("outputRail");

    outputRail.innerText = railFenceEncrypt(inputRail, rail);
}

function decryptRail() {
    const rail = parseInt(document.getElementById("rails").value);
    const inputRail = document.getElementById("inputRail").value;
    const outputRail = document.getElementById("outputRail");

    outputRail.innerText = railFenceDecrypt(inputRail, rail);
}

function encryptScytale() {
    const key = document.getElementById("key").value;
    const inputScytale = document.getElementById("inputScytale").value;
    const outputScytale = document.getElementById("outputScytale");

    outputScytale.innerText = scytaleEncrypt(inputScytale, key);
}

function decryptScytale() {
    const key = document.getElementById("key").value;
    const inputScytale = document.getElementById("inputScytale").value;
    const outputScytale = document.getElementById("outputScytale");

    outputScytale.innerText = scytaleDecrypt(inputScytale, key);
}

function caesarCipher(str, shift) {
    // Make an output variable
    let output = "";

    // Go through each character
    for (let i = 0; i < str.length; i++) {
        // Get the character we'll be appending
        let c = str[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {
            // Get its code
            let code = str.charCodeAt(i);

            // Check lowercase or uppercase
            const offset = c.toLowerCase() === c ? 97 : 65;

            // Shifting
            c = String.fromCharCode(((code - offset + shift) % 26) + offset);
        }

        // Append
        output += c;
    }

    // Done
    return output;
}

function railFenceEncrypt(inputRail, key) {
    // remove space
    let text = inputRail.split(" ").join("");

    // create the matrix to cipher plain text
    // key = rows , text.length = columns
    let rail = new Array(key)
        .fill()
        .map(() => new Array(text.length).fill("\n"));

    // filling the rail matrix to distinguish filled
    // spaces from blank ones
    let dir_down = false;
    let row = 0,
        col = 0;

    for (let i = 0; i < text.length; i++) {
        // check the direction of flow
        // reverse the direction if we've just
        // filled the top or bottom rail
        if (row == 0 || row == key - 1) dir_down = !dir_down;

        // fill the corresponding alphabet
        rail[row][col++] = text[i];

        // find the next row using direction flag
        dir_down ? row++ : row--;
    }

    // now we can construct the cipher using the rail matrix
    let result = "";
    for (let i = 0; i < key; i++)
        for (let j = 0; j < text.length; j++)
            if (rail[i][j] != "\n") result += rail[i][j];

    return result;
}

function railFenceDecrypt(cipher, key) {
    // create the matrix to cipher plain text
    // key = rows , text.length = columns
    let rail = new Array(key)
        .fill()
        .map(() => new Array(cipher.length).fill("\n"));

    // filling the rail matrix to mark the places with '*'
    let dir_down = false;
    let row = 0,
        col = 0;

    for (let i = 0; i < cipher.length; i++) {
        // check the direction of flow
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;

        // place the marker
        rail[row][col++] = "*";

        // find the next row using direction flag
        dir_down ? row++ : row--;
    }

    // now we can construct the rail matrix by filling the marked places with cipher text
    let index = 0;
    for (let i = 0; i < key; i++)
        for (let j = 0; j < cipher.length; j++)
            if (rail[i][j] == "*" && index < cipher.length)
                rail[i][j] = cipher[index++];

    // now read the matrix in zig-zag manner to construct the resultant text
    let result = "";
    (row = 0), (col = 0);
    for (let i = 0; i < cipher.length; i++) {
        // check the direction of flow
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;

        // place the marker
        if (rail[row][col] != "*") result += rail[row][col++];

        // find the next row using direction flag
        dir_down ? row++ : row--;
    }

    return result;
}

function scytaleEncrypt(plaintext, diameter) {
    if (diameter <= 0 || diameter > plaintext.length) {
        console.error("Invalid diameter");
        return "";
    }

    plaintext = plaintext.split(" ").join("");

    let ciphertext = "";
    for (let col = 0; col < diameter; col++) {
        for (let row = 0; row < Math.ceil(plaintext.length / diameter); row++) {
            const index = col + row * diameter;
            if (index < plaintext.length) {
                ciphertext += plaintext[index];
            }
        }
    }

    return ciphertext;
}

function scytaleDecrypt(ciphertext, diameter) {
    // Validasi diameter agar tidak melebihi panjang teks
    if (diameter <= 0 || diameter > ciphertext.length) {
        console.error("Invalid diameter");
        return "";
    }

    ciphertext = ciphertext.split(" ").join("");

    let plaintext = "";
    for (let row = 0; row < Math.ceil(ciphertext.length / diameter); row++) {
        for (let col = 0; col < diameter; col++) {
            const index = row + col * Math.ceil(ciphertext.length / diameter);
            if (index < ciphertext.length) {
                plaintext += ciphertext[index];
            }
        }
    }

    return plaintext;
}
