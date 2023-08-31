// Selecionar os elementos apenas uma vez
const alturaInput = document.querySelector('#altura');
const pesoInput = document.querySelector('#peso');
const form = document.querySelector('.form');
const loadBtn = document.querySelector('#loadBtn');
const resultContainer = document.querySelector('#result');

// Calcular o padding top do formulário
const paddingTop = (form.parentElement.clientHeight - form.clientHeight) / 2;
form.style.paddingTop = `${paddingTop}px`;

// Verificar se os campos têm dados válidos
function checkData() {
    return pesoInput.value.length >= 2 && alturaInput.value.length >= 1;
}

// Alterar a cor de fundo do botão de acordo com os dados válidos
function updateButtonColor() {
    loadBtn.style.background = checkData() ? '#2ecc71' : '#000';
}

// Exibir o resultado do cálculo de IMC
function showResult(imc) {
    form.reset();
    resultContainer.innerHTML = setInner(imc);
    resultContainer.style.display = 'block';
    loadBtn.style.background = '#000';
}

// Adicionar evento de clique ao botão
loadBtn.addEventListener('click', e => {
    e.preventDefault();

    if (!checkData()) {
        return;
    }

    const imc = calcImc(pesoInput.value, alturaInput.value);
    showResult(imc);

    setTimeout(() => {
        resultContainer.style.display = 'none';
    }, 5500);
});

// Função para calcular o IMC
function calcImc(peso, altura) {
    const b = parseFloat(`${altura[0]}.${altura.substr(1)}`);
    const imc = parseInt(peso / (b * b));

    if (imc < 17) {
        return 1;
    } else if (imc >= 17 && imc < 18.5) {
        return 2;
    } else if (imc >= 18.5 && imc < 25) {
        return 3;
    } else if (imc >= 25 && imc < 30) {
        return 4;
    } else if (imc >= 30 && imc < 35) {
        return 5;
    } else if (imc >= 35 && imc < 40) {
        return 6;
    } else {
        return 7;
    }
}

// Função para definir a mensagem do resultado
function setInner(imc) {
    switch (imc) {
        case 1:
            return 'Muito abaixo do peso';
        case 2:
            return 'Abaixo do peso';
        case 3:
            return 'Peso normal';
        case 4:
            return 'Acima do peso';
        case 5:
            return 'Obesidade I';
        case 6:
            return 'Obesidade II (severa)';
        case 7:
            return 'Obesidade III (mórbida)';
        default:
            return 'Não encontrei seu IMC na tabela. Você inseriu corretamente seus dados?';
    }
}
