function encryptCaesar() {
    const shift = parseInt(document.getElementById("shift").value);
    const inputText = document.getElementById("inputText").value;
    const outputText = document.querySelector(".outputText");

    outputText.innerText = caesarCipher(inputText, shift);
}

function decryptCaesar() {
    const shift = parseInt(document.getElementById("shift").value);
    const inputText = document.getElementById("inputText").value;
    const outputText = document.querySelector(".outputText");

    outputText.innerText = caesarCipher(inputText, -shift);
}

function caesarCipher(str, shift) {
    return str.replace(/[a-zA-Z]/g, function (char) {
        const codeASCII = char.charCodeAt(0);
        const offset = char.toLowerCase() === char ? 97 : 65;
        return String.fromCharCode(
            ((codeASCII - offset + shift) % 26) + offset
        );
    });
}
