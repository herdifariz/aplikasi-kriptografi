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
    const key = parseInt(document.getElementById("rails").value);
    const inputRail = document.getElementById("inputRail").value;
    const outputRail = document.getElementById("outputRail");

    outputRail.innerText = railFenceEncrypt(inputRail, key);
}

function decryptRail() {
    const key = parseInt(document.getElementById("rails").value);
    const inputRail = document.getElementById("inputRail").value;
    const outputRail = document.getElementById("outputRail");

    outputRail.innerText = railFenceDecrypt(inputRail, key);
}

function encryptVigenere() {
    const keyword = document.getElementById("keyword").value;
    const inputVigenere = document.getElementById("inputVigenere").value;
    const outputVigenere = document.getElementById("outputVigenere");

    key = generateKeyVigenere(inputVigenere, keyword);
    console.log(inputVigenere);
    console.log(key);
    outputVigenere.innerText = vigenereEncrypt(inputVigenere, key);
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

function generateKeyVigenere(str, key) {
    if (str.length == key.length) return key;
    else {
        let newKey = "";
        keyIndex = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                newKey += " ";
            } else {
                newKey += key[keyIndex];
                if (keyIndex === key.length - 1) {
                    keyIndex = 0;
                } else {
                    keyIndex++;
                }
            }
        }

        return newKey;
    }
}

function vigenereEncrypt(str, key) {
    let cipher_text = "";
    str.toLowerCase();

    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            cipher_text += " ";
        } else {
            cipher_text += String.fromCharCode(
                ((str.charCodeAt(i) - 64 + key.charCodeAt(i)) % 26) + 97
            );
        }
    }
    return cipher_text;
}
