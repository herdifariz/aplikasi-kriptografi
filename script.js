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
    let output = "";

    // Looping tiap char
    for (let i = 0; i < str.length; i++) {
        // Ambil tiap char
        let c = str[i];

        // Jika merupakan huruf
        if (/[a-z]/i.test(c)) {
            // Ambil code ASCII
            let code = str.charCodeAt(i);

            // Cek huruf kecil / besar
            const offset = c.toLowerCase() === c ? 97 : 65;

            // Ubah huruf
            c = String.fromCharCode(
                ((((code - offset + shift) % 26) + 26) % 26) + offset
            );
        }

        // Gabungkan
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
    return plainText;
    // let plain = "";
    // for (let i = 0; i < plainText.length; i++) {
    //     if (plainText[i] !== "Z") {
    //         plain += plainText[i];
    //     }
    // }

    // return plain;
}

function railFenceEncrypt(inputRail, key) {
    // hapus spasi
    let text = inputRail.split(" ").join("");

    // Buat matrix
    // key = baris , text.length = kolom
    let rail = new Array(key)
        .fill()
        .map(() => new Array(text.length).fill("\n"));

    // Isi matrix
    let dir_down = false;
    let row = 0,
        col = 0;

    for (let i = 0; i < text.length; i++) {
        // Cek arah ke atas/bawah
        // Balik arah jika mencapai baris paling atas/bawah
        if (row == 0 || row == key - 1) dir_down = !dir_down;

        // Isi matrix sesuai huruf
        rail[row][col++] = text[i];

        // Uabh ke abris selanjutnya
        dir_down ? row++ : row--;
    }

    // Pembacaan hasil matrix
    let result = "";
    for (let i = 0; i < key; i++)
        for (let j = 0; j < text.length; j++)
            if (rail[i][j] != "\n") result += rail[i][j];

    return result;
}

function railFenceDecrypt(cipher, key) {
    // Buat matriks lalu diisi semua diisi  dengan \n
    let rail = new Array(key)
        .fill(null)
        .map(() => new Array(cipher.length).fill("\n"));

    cipher = cipher.split(" ").join("");

    // untuk mengatur arah
    let dir_down = null;
    let row = 0,
        col = 0;

    // Tandai dengan *
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

        // find the next row using direction flag
        if (dir_down) {
            row++;
        } else {
            row--;
        }
    }

    // Isi matrix
    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < cipher.length; j++) {
            if (rail[i][j] === "*" && index < cipher.length) {
                rail[i][j] = cipher[index];
                index++;
            }
        }
    }

    // Baca matrix
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

    let temp = scytaleDecrypt(railFenceDecrypt(ciphertext, rail), key);
    let cip = "";
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== "Z") {
            cip += temp[i];
        }
    }

    return caesarCipher(cip, -shift);
}
