// Função auxiliar para garantir que o módulo funcione com números negativos
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Atualiza o placeholder (dica) do campo chave dependendo do algoritmo escolhido
function atualizarPlaceholder() {
    const algoritmo = document.getElementById('algoritmo').value;
    const inputChave = document.getElementById('chave');
    
    if (algoritmo === 'cesar') {
        inputChave.placeholder = "Digite um número (deslocamento). Ex: 3";
        inputChave.type = "number";
    } else {
        inputChave.placeholder = "Digite uma palavra-chave. Ex: UNESA";
        inputChave.type = "text";
    }
}

// Função Principal chamada pelos botões
function processar(acao) {
    const mensagem = document.getElementById('mensagem').value;
    const chave = document.getElementById('chave').value;
    const algoritmo = document.getElementById('algoritmo').value;
    let resultado = "";

    if (!mensagem) {
        alert("Por favor, digite uma mensagem.");
        return;
    }
    if (!chave) {
        alert("Por favor, defina uma chave.");
        return;
    }

    if (algoritmo === 'cesar') {
        const deslocamento = parseInt(chave);
        if (isNaN(deslocamento)) {
            alert("Para César, a chave deve ser um número inteiro.");
            return;
        }
        resultado = cifraCesar(mensagem, deslocamento, acao);
    } else {
        // Vigenère requer chave alfabética
        if (!/^[a-zA-Z]+$/.test(chave)) {
            alert("Para Vigenère, a chave deve conter apenas letras.");
            return;
        }
        resultado = cifraVigenere(mensagem, chave, acao);
    }

    document.getElementById('resultado').value = resultado;
}

// --- Lógica da Cifra de César ---
function cifraCesar(str, shift, acao) {
    // Se for descriptografar, invertemos o sinal do deslocamento
    if (acao === 'descriptografar') shift = -shift;

    return str.split('').map(char => {
        const codigo = char.charCodeAt(0);

        // Maiúsculas (65-90)
        if (codigo >= 65 && codigo <= 90) {
            return String.fromCharCode(mod(codigo - 65 + shift, 26) + 65);
        }
        // Minúsculas (97-122)
        else if (codigo >= 97 && codigo <= 122) {
            return String.fromCharCode(mod(codigo - 97 + shift, 26) + 97);
        }
        // Outros caracteres (espaços, pontuação) não mudam
        return char;
    }).join('');
}

// --- Lógica da Cifra de Vigenère ---
function cifraVigenere(str, chave, acao) {
    let resultado = "";
    let j = 0; // Índice da chave
    chave = chave.toUpperCase(); // Padroniza chave para maiúscula

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const codigo = char.charCodeAt(0);
        
        let charCripto = char;
        let shift = chave.charCodeAt(j % chave.length) - 65; // A=0, B=1...

        if (acao === 'descriptografar') shift = -shift;

        if (codigo >= 65 && codigo <= 90) { // Maiúsculas
            charCripto = String.fromCharCode(mod(codigo - 65 + shift, 26) + 65);
            j++;
        } else if (codigo >= 97 && codigo <= 122) { // Minúsculas
            charCripto = String.fromCharCode(mod(codigo - 97 + shift, 26) + 97);
            j++;
        }
        
        resultado += charCripto;
    }
    return resultado;
}