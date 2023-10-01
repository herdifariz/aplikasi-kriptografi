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

function encryptSuper() {
    const shiftSuper = parseInt(document.getElementById("shiftSuper").value);
    const railSuper = parseInt(document.getElementById("railSuper").value);
    const keySuper = parseInt(document.getElementById("keySuper").value);
    const inputSuper = document.getElementById("inputSuper").value;
    const outputSuper = document.getElementById("outputSuper");
    // console.log(document.getElementById("inputSuper").value);

    outputSuper.innerText = superEncrypt(
        inputSuper,
        shiftSuper,
        railSuper,
        keySuper
    );
}

function decryptSuper() {
    const shiftSuper = parseInt(document.getElementById("shiftSuper").value);
    const railSuper = parseInt(document.getElementById("railSuper").value);
    const keySuper = parseInt(document.getElementById("keySuper").value);
    const inputSuper = document.getElementById("inputSuper").value;
    const outputSuper = document.getElementById("outputSuper");

    outputSuper.innerText = superDecrypt(
        inputSuper,
        shiftSuper,
        railSuper,
        keySuper
    );
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

function scytaleEncrypt(plaintext, key) {
    if (key <= 0 || key > plaintext.length) {
        console.error("Invalid key");
        return "";
    }

    plaintext = plaintext.split(" ").join("");

    let tabel = new Array(Math.ceil(plaintext.length / key))
        .fill(null)
        .map(() => new Array(key).fill(0));

    let textLengthCounter = 0;

    for (let i = 0; i < Math.ceil(plaintext.length / key); i++) {
        for (let j = 0; j < key; j++) {
            if (textLengthCounter === plaintext.length) {
                tabel[i][j] = "Z";
            } else {
                tabel[i][j] = plaintext.charAt(textLengthCounter);
                textLengthCounter++;
            }
        }
    }

    textLengthCounter = 0;
    let ciphertext = "";

    for (let i = 0; i < key; i++) {
        for (let j = 0; j < Math.ceil(plaintext.length / key); j++) {
            if (tabel[j][i] === 0) {
                continue;
            }
            ciphertext += tabel[j][i];
        }
    }

    return ciphertext;
}

function scytaleDecrypt(cipherText, key) {
    // Validasi key agar tidak melebihi panjang teks
    if (key <= 0 || key > cipherText.length) {
        console.error("Invalid key");
        return "";
    }

    cipherText = cipherText.split(" ").join("");

    let tabel = new Array(Math.ceil(cipherText.length / key))
        .fill(null)
        .map(() => new Array(key));

    let textLengthCounter = 0;

    for (let i = 0; i < key; i++) {
        for (let j = 0; j < Math.ceil(cipherText.length / key); j++) {
            tabel[j][i] = cipherText.charAt(textLengthCounter);
            textLengthCounter++;
            if (textLengthCounter >= cipherText.length) {
                break;
            }
        }
    }

    textLengthCounter = 0;
    let plainText = "";

    for (let i = 0; i < Math.ceil(cipherText.length / key); i++) {
        for (let j = 0; j < key; j++) {
            plainText += tabel[i][j];
            textLengthCounter++;
        }
    }

    let plain = "";
    for (let i = 0; i < plainText.length; i++) {
        if (plainText[i] !== "Z") {
            plain += plainText[i];
        }
    }

    return plain;
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
    // create the matrix to cipher plain text key = rows , length(text) = columns
    // filling the rail matrix to distinguish filled spaces from blank ones
    let rail = new Array(key)
        .fill(null)
        .map(() => new Array(cipher.length).fill("\n"));

    // to find the direction
    let dir_down = null;
    let row = 0,
        col = 0;

    // mark the places with '*'
    for (let i = 0; i < cipher.length; i++) {
        if (row === 0) {
            dir_down = true;
        }
        if (row === key - 1) {
            dir_down = false;
        }

        // place the marker
        rail[row][col] = "*";
        col++;

        // console.log("After placing markers:", rail);

        // find the next row using direction flag
        if (dir_down) {
            row++;
        } else {
            row--;
        }
    }

    // now we can construct the fill the rail matrix
    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < cipher.length; j++) {
            if (rail[i][j] === "*" && index < cipher.length) {
                rail[i][j] = cipher[index];
                index++;
            }
        }
    }

    // now read the matrix in zig-zag manner to construct the resultant text
    let result = [];
    (row = 0), (col = 0);
    for (let i = 0; i < cipher.length; i++) {
        // check the direction of flow
        if (row === 0) {
            dir_down = true;
        }
        if (row === key - 1) {
            dir_down = false;
        }

        // place the marker
        if (rail[row][col] !== "*") {
            result.push(rail[row][col]);
            col++;
        }

        // find the next row using direction flag
        if (dir_down) {
            row++;
        } else {
            row--;
        }
    }

    return result.join("");
}

function superEncrypt(plaintext, shift, rail, key) {
    plaintext = plaintext.split(" ").join("");

    return railFenceEncrypt(
        scytaleEncrypt(caesarCipher(plaintext, shift), key),
        rail
    );
}

function superDecrypt(ciphertext, shift, rail, key) {
    ciphertext = ciphertext.split(" ").join("");

    // let a = railFenceDecrypt(ciphertext, rail);
    // console.log(a);
    // let b = scytaleDecrypt(a, key);
    // console.log(b);
    // let c = caesarCipher(b, -shift);
    // console.log(c);
    // return c;
    return caesarCipher(
        scytaleDecrypt(railFenceDecrypt(ciphertext, rail), key),
        -shift
    );
}
